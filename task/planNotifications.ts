import { BackgroundFetchResult } from 'expo-background-fetch';
import {AllWeekDays, TimeRangeDb, TimeRangeType} from "@/components/db/TimeRangeDb";
import {TideDb} from "@/components/db/TidesDb";
import dayjs from "dayjs";
import {ParamStorage} from "@/lib/ParamStorage";
import {getHourMinute} from "@/Utils";
import useNotification from "@/lib/hooks/useNotification";
import {debounce} from "expo-dev-launcher/bundle/functions/debounce";

/**
 * Computes when to send notifications according to user preferences time ranges defined
 */
export default async function planNotifications(){
  const  {isNotificationGranted, sendScheduledNotification, cancelAllNotifications} = useNotification();
  const now = dayjs();

  // First cancels all already planed notifications
  await cancelAllNotifications();

  // Setup notifications only if parameter is enabled and notifications allowed
  if(await ParamStorage.getItem('notificationEnabled') !== "true" || !(await isNotificationGranted()))
    return BackgroundFetchResult.NoData;

  // Notifications are sent xxx minutes before the bridge operation (xxx=timeDelay parameter)
  const timeDelay = parseInt(await ParamStorage.getItem('notificationTiming') || '0');

  // User preferences
  const timeRanges = (await new TimeRangeDb().getAllActive())
    .map((tr: TimeRangeType) => ({
      ...tr,
      days:     AllWeekDays.filter((d,i) => tr.weekDays[i]),  // ['lun', 'mer',...]
      fromHour: getHourMinute(tr.startTime),  // just numbers HHMM without date considerations
      toHour:   getHourMinute(tr.endTime)
    }));

  // Tides
  const tides = (await new TideDb().getTides())
    .filter(d => d.isAfter(now))  // only future tides
    .map(d => ({
      timest: d,
      dayOfWeek : AllWeekDays[(d.day()+6)%7],  // jour de la semaine
      hourMinute: getHourMinute(d)
    }));

  // For each user defined time ranges
  timeRanges.forEach(timeRange => {
    tides
      // User-selected day of week
      .filter(t => timeRange.days.includes(t.dayOfWeek))
      // User-selected time interval
      .filter(t => timeRange.fromHour<=t.hourMinute && t.hourMinute<=timeRange.toHour)
      .forEach(t => {
        const notifAt = t.timest.subtract(timeDelay, 'minute');
        if(notifAt.isAfter(now)){
          sendScheduledNotification(
            "Pont tournant de Cherbourg",
            "Le pont va tourner à " + t.timest.format("HH") + "h" + t.timest.format("mm dddd D MMMM")
            , notifAt
          );
        }
      });
  });
  return BackgroundFetchResult.NewData;
}

/**
 * Used to ask a re-computation of all notifications after a settings change
 */
export const debouncedUpdateNotifications = debounce(planNotifications, 10000);

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import {Dayjs} from "dayjs";
import {SchedulableTriggerInputTypes} from "expo-notifications";
import { NOTIF_CHANNEL_ID } from "@/components/params";
export default function useNotification(){
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync(NOTIF_CHANNEL_ID, {
      name: NOTIF_CHANNEL_ID,
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#0d188f",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    });
  }

  /**
   * Demande si l'autorisation d'envoyer des notifications a déjà été accordée
   */
  async function isNotificationGranted() {
    const resp = await Notifications.getPermissionsAsync();
    return resp.granted;
  }

  /**
   * Demande à l'utilisateur d'accorder le droit de lui envoyer des notifications
   */
  async function askNotificationPermission(){
    const resp = await Notifications.requestPermissionsAsync();
    return resp.granted;
  }

  /**
   * Send a notification at dateNotification
   * @param title Title of the message
   * @param body The message itself
   * @param dateNotification When to present the notification (date and time)
   */
  function sendScheduledNotification(title:string, body:string, dateNotification:Dayjs){
    return Notifications.scheduleNotificationAsync({
      content: {title, body},
      trigger: {
        type: SchedulableTriggerInputTypes.DATE,
        channelId: NOTIF_CHANNEL_ID,
        date: dateNotification.toDate()
      }
    });
  }

  /**
   * Cancels all scheduled notifications
   */
  const cancelAllNotifications = Notifications.cancelAllScheduledNotificationsAsync;
  /**
   * Cancels a notification by its id
   * @param id id of the notification (id given by sendScheduledNotification)
   */
  const cancelNotification = Notifications.cancelScheduledNotificationAsync

  return {isNotificationGranted, askNotificationPermission, sendScheduledNotification, cancelNotification, cancelAllNotifications};
}
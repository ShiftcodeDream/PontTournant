import {JSX, useEffect, useState} from "react";
import {Animated, SafeAreaView, RefreshControl, View} from "react-native";
import * as Notifications from "expo-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import ScrollView = Animated.ScrollView;
import Toast from "react-native-toast-message";
import dayjs, {Dayjs} from "dayjs";

import styles, {theme} from "@/GlobalStyle";
import DayTitle from '@/components/DayTitle';
import DisplayHour from "@/components/DisplayHour";
import CustomButton from "@/components/ui/CustomButton";
import {computeTideDataFromWeb, fetchTidesFromWeb, getTides} from "@/api/Tides";
import {TideDb} from "@/components/db/TidesDb";
import {TimeRangeDb} from "@/components/db/TimeRangeDb";
import useNotification from "@/lib/hooks/useNotification";
import planNotifications, {debouncedUpdateNotifications} from "@/task/planNotifications";
import { displayNotification } from "@/Utils";
import {toastConfig} from "@/params";

export default function Index() {
  const [horaires, setHoraires] = useState(new Array<Dayjs>);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    refresh(false);
    const subscription = Notifications.addNotificationReceivedListener(displayNotification);
    return () => subscription.remove();
  }, []);

  function refresh(fromWeb = true) {
    setLoading(true);
    getTides(fromWeb).then(data => {
      setHoraires(data);
      setLoading(false);
      debouncedUpdateNotifications();
    }).catch(e=>console.error(e));
  }

  setInterval(()=>refresh(false), 5 * 60000);

  function makeList(values: Array<Dayjs>): JSX.Element[] {
    let old = 0, next=false, nextDetected=false, actif=false;
    const now = dayjs();
    let result: JSX.Element[] = [];
    values.forEach((v,i) => {
      // Date change detection
      if(old != v.get('date')) {
        result.push(
          <DayTitle day={v} key={'d' + i}/>
        );
      }
      old = v.get('date');
      // Next & active movements detection
      next=false;
      if(!nextDetected && v.isAfter(now)){
        next = true;
        nextDetected = true;
      }
      actif = (now.isAfter(v.add(-2, 'minute')) && now.isBefore(v.add(15,'minute')));
      // Finally, display time
      result.push(
        <DisplayHour heure={v} key={'h'+i} actif={actif} next={next}/>
      );
    });
    return result;
  }

  // TODO : remove
  const  {isNotificationGranted, askNotificationPermission, sendScheduledNotification} = useNotification();
  function onFetch(){
    fetchTidesFromWeb()
      .then(txt=>console.log(txt))
      .catch(e=>console.log(e));
  }
  function onApiGet(){
    fetchTidesFromWeb()
      .then(data=> console.log(computeTideDataFromWeb(data).map(d=>d.format("DD/MM/YYYY HH:mm"))));
  }
  function onRunTask(){
    getTides(true);
  }
  function onShowTides(){
    new TideDb().getAll().then(data => console.log(data));
  }
  function onShowTimeRanges(){
    new TimeRangeDb().getAll().then(data => console.log(data));
  }
  async function onSendNotif(){
    if(! (await isNotificationGranted()) && ! (await askNotificationPermission())){
      console.error("Permission des notifications refusée");
      return;
    }
    let d = dayjs()
    sendScheduledNotification(
      "Pont tournant de Cherbourg",
      "Le pont va tourner à " + d.format("HH") + "h" + d.format("mm dddd D MMMM")
      , d.add(5,'second')
    );
  }
  function onPlanNotif(){
    planNotifications();
  }
  // TODO : end remove

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <LinearGradient colors={[theme.bgfrom, theme.bgto]}>
          <ScrollView contentContainerStyle={styles.container}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
          >

            { /* TODO : remove */ }
            <View style={{width: '100%', paddingVertical: 40, flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap'}}>
              <CustomButton type="primary" label="Fetch" onPress={onFetch} />
              <CustomButton type="primary" label="API" onPress={onApiGet} />
              <CustomButton type="primary" label="Update API" onPress={onRunTask} />
              <CustomButton type="primary" label="Display tides" onPress={onShowTides} />
              <CustomButton type="primary" label="Display time ranges" onPress={onShowTimeRanges} />
              <CustomButton type="primary" label="Send notif" onPress={onSendNotif} />
              <CustomButton type="primary" label="Compute planned notif" onPress={onPlanNotif} />
            </View>
            { /* TODO : end remove */ }

            {makeList(horaires)}
            <Toast config={toastConfig}/>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

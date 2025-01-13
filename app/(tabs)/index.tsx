import {JSX, useEffect, useState} from "react";
import {Animated, SafeAreaView, RefreshControl, View} from "react-native";
import * as Notifications from "expo-notifications";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import ScrollView = Animated.ScrollView;
import Toast from "react-native-toast-message";
import dayjs, {Dayjs} from "dayjs";

import styles, {theme} from "@/GlobalStyle";
import DayTitle from '@/components/DayTitle';
import DisplayHour from "@/components/DisplayHour";
import { getTides } from "@/api/Tides";
import { debouncedUpdateNotifications } from "@/task/planNotifications";
import { displayNotification } from "@/Utils";
import {toastConfig} from "@/params";

export default function Index() {
  const [horaires, setHoraires] = useState(new Array<Dayjs>);
  const [loading, setLoading] = useState(false);
  const [liste, setListe] = useState(new Array<JSX.Element>);

  useEffect(()=> {
    refresh(false);
    const subscription = Notifications.addNotificationReceivedListener(displayNotification);
    return () => subscription.remove();
  }, []);

  /**
   * Refreshes data
   *
   * @param fromWeb if true: download data from web. If alse : update data from local database only
   * @param displayLoading wether to display the "loading" spinner
   */
  function refresh(fromWeb = true, displayLoading = true) {
    setLoading(displayLoading);
    getTides(fromWeb).then(data => {
      if((!data || data.length === 0) && !fromWeb)
        refresh(true);  // When no tide data stored in the device, tries to download from the web (first application launch)
      setHoraires(data);
      setLoading(false);
      debouncedUpdateNotifications();
    }).catch(e=>console.error(e));
  }

  setInterval(()=>refresh(false, false), 5 * 60000);
  useEffect(makeList, [horaires]);

  function makeList() {
    let old = 0, next=false, nextDetected=false, actif=false;
    const now = dayjs();
    let result: JSX.Element[] = [];
    horaires.forEach((v,i) => {
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
    setListe(result);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <LinearGradient colors={[theme.bgfrom, theme.bgto]}>
          <ScrollView contentContainerStyle={styles.container}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
          >
            {liste!==null && liste.length
              && liste
              || <View style={{height: 4000}} />
            }
            <Toast config={toastConfig}/>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

import {JSX, useEffect, useState} from "react";
import {Animated, SafeAreaView, RefreshControl, View} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import ScrollView = Animated.ScrollView;
import dayjs, {Dayjs} from "dayjs";

import styles, {theme} from "@/components/GlobalStyle";
import getMareeData from "@/components/MareeApi";
import DayTitle from '@/components/DayTitle';
import DisplayHour from "@/components/DisplayHour";
import CustomButton from "@/components/ui/CustomButton";
import {computeTideDataFromWeb, fetchTidesFromWeb} from "@/api/Maree";
import updateTides from "@/task/getTides";
import {TideDb} from "@/components/db/TidesDb";
import {TimeRangeDb} from "@/components/db/TimeRangeDb";

export default function Index() {
  useEffect(refresh, []);
  const [horaires, setHoraires] = useState(new Array<Dayjs>);
  const [loading, setLoading] = useState(false);

  function refresh() {
    setLoading(true);
    getMareeData().then(data => {
      setHoraires(data);
      setLoading(false);
    });
  }

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
    updateTides();
  }
  function onShowTides(){
    new TideDb().getAll().then(data => console.log(data));
  }
  function onShowTimeRanges(){
    new TimeRangeDb().getAll().then(data => console.log(data));
  }
  function onSendNotif(){
    console.log('TODO');
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
              <CustomButton type="primary" label="send notif" onPress={onSendNotif} />
            </View>
            { /* TODO : end remove */ }

            {makeList(horaires)}
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

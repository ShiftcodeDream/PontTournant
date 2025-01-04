import {JSX, useEffect, useState} from "react";
import {Animated, SafeAreaView, RefreshControl} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import ScrollView = Animated.ScrollView;
import dayjs, {Dayjs} from "dayjs";

import styles, {theme} from "@/components/GlobalStyle";
import getMareeData from "@/components/MareeApi";
import DayTitle from '@/components/DayTitle';
import DisplayHour from "@/components/DisplayHour";

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

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <LinearGradient colors={[theme.bgfrom, theme.bgto]}>
          <ScrollView contentContainerStyle={styles.container}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
          >
            {makeList(horaires)}
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

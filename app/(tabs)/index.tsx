import {JSX, useEffect, useState} from "react";
import {Animated, SafeAreaView, RefreshControl} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {Dayjs} from "dayjs";

import styles from "@/components/GlobalStyle";
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
    let old = 0;
    let result: JSX.Element[] = [];
    values.forEach((v,i) => {
      if(old != v.get('date'))
        result.push(
          <DayTitle day={v} key={'d'+i} />
        );
      old = v.get('date');
      result.push(
        <DisplayHour heure={v} key={'h'+i} actif={i%3==1} next={i%5==2}/>
      );
    });
    return result;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
        >
          {makeList(horaires)}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

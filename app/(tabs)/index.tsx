import {JSX, useEffect, useState} from "react";
import {StyleSheet, Animated, SafeAreaView, RefreshControl} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {Dayjs} from "dayjs";
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
        <DisplayHour heure={v} key={'h'+i} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titre: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  button: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    color: '#fff',
    padding: 5,
    marginTop: 5,
  },
});

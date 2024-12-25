import {JSX, useEffect, useState} from "react";
import {Text, View, StyleSheet, Pressable} from "react-native";
import dayjs, {Dayjs} from "dayjs";
import getMareeData from "@/components/MareeApi";
import DayTitle from '@/components/DayTitle';
import DisplayHour from "@/components/DisplayHour";

const url = 'https://www.horaire-maree.fr/maree/CHERBOURG/';

export default function Index() {
  useEffect(refresh, []);
  const [horaires, setHoraires] = useState(new Array<Dayjs>);

  function refresh() {
    getMareeData().then(setHoraires);
  }

  function makeList(values: Array<Dayjs>) {
    let old = 0;
    let result: JSX.Element[] = [];
    values.forEach(v => {
      if(old != v.get('date'))
        result.push((
          <DayTitle day={v} />
        ));
      old = v.get('date');
      result.push(
        <Text style={styles.text}>{v.format('H:mm')}</Text>
      );
    });
    return result;
  }
  return (
    <View style={styles.container}>
      {makeList(horaires)}
      <Pressable onPress={refresh}><Text style={styles.button}>Relancer</Text></Pressable>
    </View>
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

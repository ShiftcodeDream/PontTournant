import {Text, View, StyleSheet, Pressable} from "react-native";
import { Link } from 'expo-router';
import DayTitle from '@/components/DayTitle';
import DisplayHour from "@/components/DisplayHour";
import dayjs, {Dayjs} from "dayjs";
import {useEffect} from "react";

const url = 'http://localhost/marees.html';

export default function Index() {
  useEffect(refresh, []);
  function refresh(){
    fetch(url, {method: 'get'}).then(resp => {
      console.log(resp);
    }).catch(e=>console.log(e));
  }
  return (
    <View style={styles.container}>
      <DayTitle day={dayjs()} />
      <DisplayHour heure={dayjs().add(-25, 'minutes')} />
      <DisplayHour heure={dayjs()} actif/>
      <DisplayHour heure={dayjs()} />

      <DayTitle day={dayjs()} />
      <DisplayHour heure={dayjs()} />
      <DisplayHour heure={dayjs()} actif/>
      <DisplayHour heure={dayjs()} />

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

import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import DayTitle from '@/components/DayTitle';
import DisplayHour from "@/components/DisplayHour";
import dayjs, {Dayjs} from "dayjs";

export default function Index() {
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
    textDecorationLine: 'underline',
    color: '#fff',
  },
});

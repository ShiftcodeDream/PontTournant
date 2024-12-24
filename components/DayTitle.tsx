import { Text, View, StyleSheet } from "react-native";
import {Dayjs} from "dayjs";
import dayjs from "dayjs";
import 'dayjs/locale/fr';

dayjs.locale('fr');

type Props ={
  day: Dayjs
};

export default function DayTitle({day}: Props){
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        {day.format('dddd D MMMM YYYY')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {

  },
  text: {
    color: '#ffe',
    fontSize: 24,
  }
});

import { Text, View } from "react-native";
import {Dayjs} from "dayjs";
import dayjs from "dayjs";
import 'dayjs/locale/fr';

import styles from "@/GlobalStyle";
import {firstUpperCase} from "@/Utils";

dayjs.locale('fr');

type Props ={
  day: Dayjs
};

export default function DayTitle({day}: Props){
  return (
    <View>
      <Text style={styles.day}>
        {firstUpperCase(day.format('dddd D MMMM YYYY'))}
      </Text>
    </View>
  );
}

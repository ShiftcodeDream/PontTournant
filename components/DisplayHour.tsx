import {Text, View, StyleSheet} from "react-native";
import {Dayjs} from "dayjs";

type Props = {
  heure: Dayjs,
  actif?: boolean
};

export default function DisplayHour({heure, actif=false}: Props) {
  const styles = StyleSheet.create({
    view: {},
    text: {
      color: actif ? '#f00' : '#ffe',
      fontSize: 24,
    }
  });

  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        {heure.format('HH:mm')}
      </Text>
    </View>
  );
}
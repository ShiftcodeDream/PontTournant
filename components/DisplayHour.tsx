import {Text, View, StyleSheet, StyleProp, TextStyle} from "react-native";
import {Dayjs} from "dayjs";
import styles from "@/GlobalStyle";

type Props = {
  heure: Dayjs,
  next?: boolean,
  actif?: boolean
};
/**
 * Affiche un horaire de manœuvre
 *
 * @param heure Heure à afficher
 * @param next  true s'il s'agit du prochain horaire de manœuvre
 * @param actif true s'il s'agit de la manœuvre en cours
 * @constructor
 */
export default function DisplayHour({heure, next=false, actif=false}: Props) {
  const st: StyleProp<TextStyle> = StyleSheet.compose(styles.horaire,
    actif ? styles.horaireActif :
      next ? styles.horaireNext :
        {}
  );

  return (
    <View style={styles.horaireView}>
      <Text style={st}>
        {heure.format('HH:mm')}
      </Text>
    </View>
  );
}
import {Pressable, View, Text} from "react-native";
import styles from "@/GlobalStyle";

type Props = {
  label?: string,
  onPress: ()=>void
};

export default function RoundedButton({ label= '', onPress }: Props): JSX.Element {
  return (
    <View style={styles.roundedButtonContainer}>
      <Pressable style={styles.roundedButton} onPress={onPress}>
        <Text style={styles.roundedButtonText}>{label}</Text>
      </Pressable>
    </View>
  );
}

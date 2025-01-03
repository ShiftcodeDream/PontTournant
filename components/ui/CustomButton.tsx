import {Pressable, View, Text} from "react-native";
import styles, {theme} from "@/components/GlobalStyle";

type Props = {
  label?: string,
  type?: string,
  style?: any,
  onPress: ()=>void
};

export default function CustomButton({ label= '', type='primary', style={}, onPress }: Props): JSX.Element {
  let bg;
  switch(type){
    case 'danger': bg = theme.danger; break;
    case 'success': bg = theme.success; break;
    case 'secondary': bg = theme.sec; break;
    default: bg = theme.prim; break;
  }
  return (
    <View style={[styles.button, style]}>
      <Pressable style={[styles.button, {backgroundColor: bg}]} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
}

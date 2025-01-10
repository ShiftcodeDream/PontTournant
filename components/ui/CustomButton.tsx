import {Pressable, View, Text} from "react-native";
import styles, {theme} from "@/GlobalStyle";

type Props = {
  label?: string,
  type?: string,
  style?: any,
  icon?: any,
  onPress: ()=>void
};

export default function CustomButton({ label= '', type='primary', style={}, icon, onPress }: Props): JSX.Element {
  let bg;
  switch(type){
    case 'primary': bg = theme.prim; break;
    case 'danger': bg = theme.danger; break;
    case 'success': bg = theme.success; break;
    case 'secondary': bg = theme.sec; break;
    default: bg = 'transparent'; break;
  }
  return (
    <View style={[styles.button, {backgroundColor: bg, padding:5}, style]}>
        <Pressable style={[styles.button, {backgroundColor: bg, display:'flex', flexDirection:'row', justifyContent:'flex-start'}]} onPress={onPress}>
          {icon}
          {label && <Text style={styles.buttonText}>{label}</Text>}
        </Pressable>
    </View>
  );
}

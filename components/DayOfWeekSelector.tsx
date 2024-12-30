import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";

import styles, {theme} from "@/components/GlobalStyle";

type PropsType = {
  values: boolean[],
  onChange: (n: number)=>void
}
export default function(props: PropsType){
  const lstyle = StyleSheet.create({
    container: {
      width:'100%',
      padding:10,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'
    },
    button: {
      width: 44,
      height: 44,
      fontSize: 12,
      textAlign: 'center',
      padding: 0,
    },
    selButton: {
      borderWidth: 2,
      borderRadius: 22,
      borderColor: theme.success,
    }
  });

  return (
    <View style={lstyle.container}>
      {"LMMJVSD".split('').map((day,i) => (
        <Pressable
          onPress={()=>props.onChange(i)}
          // Selected or not
          style={props.values[i] ? [lstyle.button, lstyle.selButton] : lstyle.button} key={i+'p'}>
          <Text style={[styles.text,{color: props.values[i] ? theme.fg : theme.prim}]} key={i+'t'}>{day}</Text>
        </Pressable>
      ))}
    </View>
  );
}

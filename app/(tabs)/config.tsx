import {Pressable, Text, TextInput, View} from "react-native";
import styles from "@/components/GlobalStyle";
import {useEffect, useState} from "react";

export default function Index() {
  const [timing, setTiming] = useState('10');

  /*
  useEffect(()=>{
    AsyncStorage.getItem('notificationTiming').then(r => {
      if(r === null || isNaN(parseInt(r))){
        r = '10';
        AsyncStorage.setItem('notificationTiming', r);
      }
      setTiming(r);
    })
  }, []);
  */

  function changeTiming(t: string) {
    if(isNaN(parseInt(t)))
      t = '10';
    setTiming(t);
    // AsyncStorage.setItem('notificationTiming', t);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Notification avant manoeuvre</Text>
      <TextInput value={timing} onChangeText={changeTiming} keyboardType='numeric' style={styles.input}/>

      <Pressable style={styles.wideButton}><Text style={styles.buttonText}>Ajouter</Text></Pressable>
    </View>
  );
}

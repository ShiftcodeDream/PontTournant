import {Text, TextInput, View, StyleSheet, Switch} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from 'expo-sqlite/kv-store';

import {clamp} from "@/components/Utils";
import RoundedButton from "@/components/ui/RoundedButton";
import styles from "@/components/GlobalStyle";

export default function Index() {
  const [timing, setTiming] = useState('10');
  const [enableNotif, setEnableNotif] = useState(true);
  const TIME_MINI = 0;
  const TIME_MAXI = 120;
  const INCREMENT = 5;

  useEffect(()=>{
    AsyncStorage.getItem('notificationEnabled').then(r => {
      setEnableNotif(r === 'true');
    });
    AsyncStorage.getItem('notificationTiming').then(r => {
      if(r === null || isNaN(parseInt(r))){
        r = '10';
        AsyncStorage.setItem('notificationTiming', r);
      }
      setTiming(r);
    });
  }, []);

  function toggleEnableNotif(){
    setEnableNotif(v => {
      AsyncStorage.setItem('notificationEnabled', !v ? 'true' : 'false');
      return !v;
    })
  }
  function changeTiming(t: string) {
    if(t === null || t.length === 0)
      return;
    let tim = parseInt(t);
    if(isNaN(tim))
      return;
    configTiming(tim);
  }

  function configTiming(value: number){
    const tim = clamp(value, TIME_MINI, TIME_MAXI).toString();
    setTiming(tim);
    AsyncStorage.setItem('notificationTiming', tim);
  }

  function increaseTiming(){
    let tim = 0;
    if(timing !== null && timing.length !== 0 && !isNaN(tim = parseInt(timing))) {
      tim += INCREMENT;
      tim = tim - tim % INCREMENT;
      configTiming(tim);
    }else{
      configTiming(TIME_MINI);
    }
  }

  function decreaseTiming(){
    let tim = 0;
    if(timing !== null && timing.length !== 0 && !isNaN(tim = parseInt(timing))) {
      tim -= INCREMENT;
      tim = tim - tim % INCREMENT;
      configTiming(tim);
    }else{
      configTiming(TIME_MINI);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Notification</Text>
      <View style={{height: 60}}>
        <View style={lstyle.inline}>
          <Text style={{...styles.text, textAlign: 'left', paddingLeft: 20}}>Activer les notifications</Text>
          <Switch
            trackColor={{false: '#fff', true: '#fff'}}
            thumbColor={enableNotif ? '#4891fa' : '#d0efff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleEnableNotif}
            value={enableNotif}
          />
        </View>
      </View>
      {enableNotif &&
        <View style={{height: 60}}>
          <View style={lstyle.inline}>
            <Text style={styles.text}>M'alerter</Text>
            <RoundedButton label="-" onPress={decreaseTiming}/>
            <TextInput value={timing} onChangeText={changeTiming} keyboardType='numeric' style={styles.input}/>
            <RoundedButton label="+" onPress={increaseTiming}/>
            <Text style={styles.text}>minutes avant</Text>
          </View>
        </View>
      }
    </View>
  );
}

const lstyle = StyleSheet.create({
  inline: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    height: 30,
  },
});

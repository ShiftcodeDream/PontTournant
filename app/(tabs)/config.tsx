import React, {useEffect, useState} from "react";
import {Text, TextInput, View, StyleSheet, Switch} from "react-native";

import {clamp} from "@/components/Utils";
import RoundedButton from "@/components/ui/RoundedButton";
import styles, {theme} from "@/components/GlobalStyle";
import { ParamStorage } from "@/components/db/ParamStorage";
import TimeRange from "@/components/TimeRange";
import {TimeRangeDb, TimeRangeType} from "@/components/db/TimeRangeDb";
import Toast from "react-native-toast-message";

export default function Config() {
  const [timing, setTiming] = useState('10');
  const [enableNotif, setEnableNotif] = useState(true);
  const [ranges, setRanges] = useState(new Array<TimeRangeType>());
  const TIME_MINI = 0;
  const TIME_MAXI = 120;
  const INCREMENT = 5;

  const timeRangeDb = new TimeRangeDb();

  useEffect(refresh, []);

  function refresh(){
    ParamStorage.getItem('notificationEnabled').then(r => {
      setEnableNotif(r === 'true');
    });
    ParamStorage.getItem('notificationTiming').then(r => {
      if(r === null || isNaN(parseInt(r))){
        r = '10';
        ParamStorage.setItem('notificationTiming', r);
      }
      setTiming(r);
    });
    timeRangeDb.getAll().then(setRanges);
  }
  function toggleEnableNotif(){
    setEnableNotif(v => {
      ParamStorage.setItem('notificationEnabled', !v ? 'true' : 'false');
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
    ParamStorage.setItem('notificationTiming', tim);
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
      <View style={[lstyle.inline, lstyle.bordered]}>
          <Text style={styles.text}>Me notifier avant que le pont tourne</Text>
          <Switch
            trackColor={{false: '#fff', true: '#fff'}}
            thumbColor={enableNotif ? theme.link : theme.sec}
            onValueChange={toggleEnableNotif}
            value={enableNotif}
          />
      </View>
      {enableNotif && <>
        <View style={{height: 60}}>
          <View style={lstyle.inline}>
            <Text style={[styles.text, {flexGrow:2, flexWrap:'nowrap'}]}>Délai en minutes</Text>
            <View style={[lstyle.inline, {flexShrink:5, justifyContent: 'flex-end'}]}>
              <RoundedButton label="-" onPress={decreaseTiming}/>
              <TextInput value={timing} onChangeText={changeTiming} keyboardType='numeric'
                         style={[styles.input, {width: 40}]}/>
              <RoundedButton label="+" onPress={increaseTiming}/>
            </View>
          </View>
        </View>

        {ranges.map(range => (
          <TimeRange range={range} onRefreshNeeded={refresh} key={range.id}/>
        ))}
      </>}
      <Toast />
    </View>
  );
}

const lstyle = StyleSheet.create({
  inline: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bordered: {
    borderTopColor: theme.prim,
    borderTopWidth: 2,
    borderBottomColor: theme.prim,
    borderBottomWidth: 2,
  },
});

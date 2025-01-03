import React, {useEffect, useState} from "react";
import {Text, TextInput, View, StyleSheet, Switch} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {clamp} from "@/components/Utils";
import RoundedButton from "@/components/ui/RoundedButton";
import styles, {theme} from "@/components/GlobalStyle";
import { ParamStorage } from "@/components/db/ParamStorage";
import TimeRange from "@/components/TimeRange";
import {TimeRangeDb, TimeRangeType} from "@/components/db/TimeRangeDb";
import Toast, {BaseToast, ErrorToast} from "react-native-toast-message";
import CustomButton from "@/components/ui/CustomButton";
import dayjs from "dayjs";

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

  function onAdd(){
    let debut = dayjs();
    debut = debut.subtract(debut.minute() % INCREMENT, 'minute');
    let fin = debut.add(15, 'minutes');
    const day = new Array<boolean>(7).fill(false);
    let dow = (debut.day() - 1 ) % 7;
    day[dow] = true;

    const tr = {
      enabled: true, startTime:debut, endTime:fin, weekDays: day
    }
    timeRangeDb.add(tr as TimeRangeType).then(refresh);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Notification</Text>
      <View style={styles.withSeparator} />
      <View style={[lstyle.inline, styles.withSeparator]}>
          <Text style={styles.text}>Me notifier avant que le pont tourne</Text>
          <Switch
            trackColor={{false: '#fff', true: '#fff'}}
            thumbColor={enableNotif ? theme.link : theme.sec}
            onValueChange={toggleEnableNotif}
            value={enableNotif}
          />
      </View>
      {enableNotif && <>
        <View style={[styles.withSeparator, {height: 60}]}>
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
        <View style={{paddingTop: 5}}>
            <CustomButton label="Ajouter" onPress={onAdd}
                          icon={<MaterialIcons name="alarm-add" size={28} color={theme.fg}/>}/>
        </View>

        {ranges.length
          &&
          ranges.map(range => (
            <TimeRange range={range} onRefreshNeeded={refresh} key={range.id}/>
          ))
          ||
            <View style={[styles.roundedContainer, {height: 120, flexDirection:'row', justifyContent:'center', alignItems:'center'}]}>
              <Text style={[styles.text, {fontWeight:'bold'}]}>Aucune notification définie pour le moment.
                  Cliquez sur "Ajouter" pour en créer une.</Text>
            </View>
        }
      </>}

      <Toast config={toastConfig} />
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
});

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.success,
        backgroundColor: theme.sec
      }}
      text1Style={{
        fontSize: 18,
        color: theme.bg,
      }}
      text2Style={{
        fontSize: 16,
        color: theme.bg,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: theme.danger,
        backgroundColor: theme.sec
      }}
      text1Style={{
        fontSize: 18,
        color: theme.bg,
      }}
      text2Style={{
        fontSize: 16,
        color: theme.bg,
      }}
    />
  ),
};
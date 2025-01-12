import React, {useEffect, useState} from "react";
import {Text, TextInput, View, StyleSheet, Switch, SafeAreaView, ScrollView} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import dayjs from "dayjs";
import {LinearGradient} from "expo-linear-gradient";
import * as Notifications from "expo-notifications";

import {clamp, displayNotification} from "@/Utils";
import { ParamStorage } from "@/lib/ParamStorage";
import {TimeRangeDb, TimeRangeType} from "@/components/db/TimeRangeDb";
import styles, {theme} from "@/GlobalStyle";
import RoundedButton from "@/components/ui/RoundedButton";
import TimeRange from "@/components/TimeRange";
import CustomButton from "@/components/ui/CustomButton";
import {debouncedUpdateNotifications} from "@/task/planNotifications";
import useNotification from "@/lib/hooks/useNotification";
import {toastConfig} from "@/params";

export default function Config() {
  const [timing, setTiming] = useState('10');
  const [enableNotif, setEnableNotif] = useState(true);
  const [ranges, setRanges] = useState(new Array<TimeRangeType>());
  const TIME_MINI = 0;
  const TIME_MAXI = 120;
  const INCREMENT = 5;

  const {isNotificationGranted, askNotificationPermission} = useNotification();

  const timeRangeDb = new TimeRangeDb();

  useEffect(()=> {
    refresh();
    const subscription = Notifications.addNotificationReceivedListener(displayNotification);
    return () => subscription.remove();
  }, []);

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
      let newValue = !v;
      if(newValue && !isNotificationGranted() && !askNotificationPermission()){
        Toast.show({
          type: "error",
          text1: "Notifications refusées",
          text2: "Les notifications ne sont pas autorisées",
        });
        newValue = false;
      }
      ParamStorage.setItem('notificationEnabled', newValue ? 'true' : 'false');
      debouncedUpdateNotifications();
      return newValue;
    })
  }
  function changeTiming(t: string) {
    let tim: number;
    if(t === null || t.length === 0)
      tim = 0;
    else
      tim = parseInt(t);
    if(isNaN(tim))
      tim = 0
    configTiming(tim);
  }

  function configTiming(value: number){
    const tim = clamp(value, TIME_MINI, TIME_MAXI).toString();
    setTiming(tim);
    ParamStorage.setItem('notificationTiming', tim);
    debouncedUpdateNotifications();
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
    timeRangeDb.add(tr as TimeRangeType).then(()=>{
      refresh();
      debouncedUpdateNotifications();
    });
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <LinearGradient colors={[theme.bgfrom, theme.bgto]}>
          <View style={{height:'100%'}}>
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.withSeparator} />
              <View style={[lstyle.inline, styles.withSeparator]}>
                <Text style={styles.text}>Me notifier avant que le pont tourne</Text>
                <Switch
                  trackColor={{false: '#fff', true: '#fff'}}
                  thumbColor={enableNotif ? theme.titre : theme.fg}
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

                {ranges.length &&
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
            </ScrollView>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
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

import React, {useEffect, useState} from "react";
import {View, Text, Switch} from "react-native";
import Toast from 'react-native-toast-message';
import Ionicons from "@expo/vector-icons/Ionicons";
import {LinearGradient} from "expo-linear-gradient";
import dayjs from "dayjs";

import styles, {theme} from "@/GlobalStyle";
import CustomButton from "@/components/ui/CustomButton";
import TimeSelector from "@/components/ui/TimeSelector";
import DayOfWeekSelector from "@/components/DayOfWeekSelector";
import {TimeRangeDb, TimeRangeType} from "@/components/db/TimeRangeDb";

type Props = {
  range: TimeRangeType,
  onRefreshNeeded: ()=>void
}
export default function TimeRange({range, onRefreshNeeded}: Props) {
  const [enabled, setEnabled] = useState(true);
  const [start, setStart] = useState(dayjs().toDate());
  const [end, setEnd] = useState(dayjs().add(15,'minute').toDate());
  const [days, setDays] = useState(new Array<boolean>(7).fill(false).map((n,i)=>i===0));

  const timeRangeDb = new TimeRangeDb();

  useEffect(()=>{
    setStart(range.startTime.toDate());
    setEnd(range.endTime.toDate());
    setEnabled(range.enabled);
    setDays(range.weekDays);
  },[]);

  useEffect(()=>{
    const data = {
      startTime: dayjs(start),
      endTime: dayjs(end),
      enabled: enabled,
      weekDays: days
    };
    timeRangeDb.updateById(range.id, (data as TimeRangeType));
  },[start, end, enabled, days]);

  function chekcTimeCoherence(debut: Date, fin: Date): boolean{
    const d = debut.getHours()*100 + debut.getMinutes();
    const f = fin.getHours()*100 + fin.getMinutes();
    if(d < f) {
      return true;
    } else {
      Toast.show({
        type: "error",
        text1: "Plage horaire incorrecte",
        text2: "L'heure de fin est avant l'heure de début",
      });
      return false;
    }
  }
  function changeStartValue(event: Event, date: Date){
    if(chekcTimeCoherence(date, end))
      setStart(date);
  }
  function changeEndValue(event: Event, date: Date){
    if(chekcTimeCoherence(start, date))
      setEnd(date);
  }
  function toggleEnabled(){
    setEnabled(v=>!v);
  }
  function toggleDay(index: number){
    setDays(old => {
      let newd = old.map((v,i) => i===index ? !v : v);
      // ensure there is at least one day checked
      if(newd.some(d=>d))
        return newd;
      else
        return old;
    });
  }

  function onDelete(id: number){
    timeRangeDb.deleteById(id).then(onRefreshNeeded);
  }
  return (
    <View style={styles.roundedContainer}>
      <LinearGradient colors={[theme.bgmid, theme.bgto]}>
        <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10}}>
          <View style={{display: 'flex', flexDirection:'row', justifyContent:'flex-start'}}>
            <Switch
              trackColor={{false: '#fff', true: '#fff'}}
              thumbColor={enabled ? theme.titre : theme.sec}
              onValueChange={toggleEnabled}
              value={enabled}
            />
            <Text style={[styles.text,{color:enabled ? theme.fg : theme.danger}]}>
              {enabled ? 'Notification activée' : 'Notification désactivée'}
            </Text>
          </View>
          <View>
            <CustomButton type="transparent" onPress={()=>onDelete(range.id)}
                          icon={<Ionicons name="trash-outline" size={28} color={theme.fg}/>}
            />
          </View>
        </View>
      </LinearGradient>
      <View style={{display: 'flex', flexDirection:'row', justifyContent:'flex-end'}}>
        <Text style={styles.text}>Entre </Text>
        <TimeSelector value={start} onChange={changeStartValue}/>
        <Text style={styles.text}> et </Text>
        <TimeSelector value={end} onChange={changeEndValue}/>
      </View>
      <View>
        <Text style={styles.text}>Jours de la semaine :</Text>
      </View>
      <View>
        <DayOfWeekSelector values={days} onChange={toggleDay}/>
      </View>
    </View>
  );
}

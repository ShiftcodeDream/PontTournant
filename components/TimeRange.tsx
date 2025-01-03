import React, {useEffect, useState} from "react";
import {View, Text, Switch} from "react-native";
import dayjs from "dayjs";

import styles, {theme} from "@/components/GlobalStyle";
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

  function changeStartValue(event: Event, date: Date){
    setStart(date);
  }
  function changeEndValue(event: Event, date: Date){
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
    <View style={{borderWidth:2, borderColor:theme.bglight, marginTop:4, borderRadius:10, marginLeft:20, marginRight:20}}>
      <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:theme.bglight}}>
        <View style={{display: 'flex', flexDirection:'row', justifyContent:'flex-start'}}>
          <Switch
            trackColor={{false: '#fff', true: '#fff'}}
            thumbColor={enabled ? theme.success : theme.sec}
            onValueChange={toggleEnabled}
            value={enabled}
          />
          <Text style={[styles.text,{color:enabled ? theme.fg : theme.danger}]}>
            {enabled ? 'Activé' : 'Désactivé'}
          </Text>
        </View>
        <View>
          <CustomButton label="Supprimer" type="danger" onPress={()=>onDelete(range.id)}/>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection:'row', justifyContent:'flex-end'}}>
        <Text style={styles.text}> Entre </Text>
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

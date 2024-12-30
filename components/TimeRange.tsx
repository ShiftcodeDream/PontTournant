import React, {useState} from "react";
import TimeSelector from "@/components/ui/TimeSelector";
import {View, Text, Switch} from "react-native";
import styles, {theme} from "@/components/GlobalStyle";
import dayjs from "dayjs";
import DayOfWeekSelector from "@/components/DayOfWeekSelector";

export default function TimeRange() {
  const [enabled, setEnabled] = useState(true);
  const [start, setStart] = useState(dayjs().toDate());
  const [end, setEnd] = useState(dayjs().add(15,'minute').toDate());
  const [days, setDays] = useState(new Array<boolean>(7).fill(false).map((n,i)=>i===0));

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

  return (
    <View style={{borderWidth:2, borderColor:theme.bglight, marginTop:4, borderRadius:10, marginLeft:20, marginRight:20}}>
      <View style={{display: 'flex', flexDirection:'row', justifyContent:'flex-start', backgroundColor:theme.bglight}}>
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

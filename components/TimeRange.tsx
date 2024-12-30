import React, {useState} from "react";
import TimeSelector from "@/components/ui/TimeSelector";
import {View, Text, Switch} from "react-native";
import styles, {theme} from "@/components/GlobalStyle";
import dayjs from "dayjs";

export default function TimeRange() {
  const [enabled, setEnabled] = useState(true);
  const [start, setStart] = useState(dayjs().toDate());
  const [end, setEnd] = useState(dayjs().add(15,'minute').toDate());

  function changeStartValue(event: Event, date: Date){
    setStart(date);
  }
  function changeEndValue(event: Event, date: Date){
    setEnd(date);
  }
  function toggleEnabled(){
    setEnabled(v=>!v);
  }
  return (
    <View style={{display: 'flex', flexDirection:'row', justifyContent:'flex-start', borderWidth:2, borderColor:theme.fg, marginTop:4, borderRadius:10}}>
      <Switch
        trackColor={{false: '#fff', true: '#fff'}}
        thumbColor={enabled ? theme.success : theme.sec}
        onValueChange={toggleEnabled}
        value={enabled}
      />
      <TimeSelector value={start} onChange={changeStartValue}/>
      <Text style={styles.text}> - </Text>
      <TimeSelector value={end} onChange={changeEndValue}/>
    </View>
  );
}

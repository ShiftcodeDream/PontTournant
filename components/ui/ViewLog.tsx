import useLogs from "@/lib/hooks/useLogs";
import {useState} from "react";
import {Text} from "react-native";
import {LogEntry} from "@/components/db/LogsDb";
import {FlatList, View} from "react-native";
import globalStyle, {theme} from "@/GlobalStyle";

export default function ViewLog(){
  const [list, setList] = useState(new Array<LogEntry>);
  const colors= [theme.fg, theme.fg, theme.warning, theme.danger];
  const log = useLogs();
  log.getAll().then(setList);

  return (
    <FlatList data={list} renderItem={(it) => {
      const c = {color: colors[it.item.type]};
      return (
        <View style={globalStyle.tableRow}>
          <Text style={globalStyle.fixedText}>{it.item.time.format("DD/MM - HH:mm:ss")}</Text>
          <Text style={[globalStyle.fixedText, c]}>{it.item.text}</Text>
        </View>
      )
    }} />
  )
}

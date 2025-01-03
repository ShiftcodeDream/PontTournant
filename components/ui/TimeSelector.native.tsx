import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform, Pressable, View, Text, StyleSheet} from "react-native";
import dayjs from "dayjs";
import {useState} from "react";

/**
 * Android implementation
 */
type Props = {
  value: Date,
  onChange: (event: any, value: any)=>void,
  minuteInterval?: number
}
export default function({value, onChange, minuteInterval=5}: Props){
  const [show, setShow] = useState(false);

  function internalOnChange (event: any, value: any){
    if (Platform.OS === "android") {
      setShow(false);
    }
    onChange(event, value);
  }

  const lstyle = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
      padding: 5,
    },
    pickedDateContainer: {
      padding: 5,
      backgroundColor: "#fff",
    },
    pickedDate: {
      fontSize: 18,
      color: "#000",
    },
  });

  return (
    <View style={lstyle.container}>
      {/* Display the selected date */}
      <Pressable
        onPress={()=>setShow(d=>!d)}
        style={lstyle.pickedDateContainer}
      >
        <Text style={lstyle.pickedDate}>
          {dayjs(value).format('H:mm')}
        </Text>
      </Pressable>

      {show && (
        <DateTimePicker
          value={value}
          mode="time"
          display="spinner"
          onChange={internalOnChange}
          textColor="#CE2EBE"
          is24Hour
          minuteInterval={minuteInterval}
        />
      )}
    </View>
  );
}

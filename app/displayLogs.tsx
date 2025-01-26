import {SafeAreaView} from 'react-native';
import {theme} from "@/GlobalStyle";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";

import ViewLog from "@/components/ui/ViewLog";
import CustomButton from "@/components/ui/CustomButton";
import useLogs from "@/lib/hooks/useLogs";

export default function AboutScreen() {
  const log = useLogs();
  function onClear(){
    log.clear();
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <LinearGradient colors={[theme.bgfrom, theme.bgto]}>
          <ViewLog/>
          <CustomButton label="Clear logs" onPress={onClear} />
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

import { Stack } from "expo-router";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

import updateTides from "@/task/updateTides";
import planNotifications from "@/task/planNotifications";
import {useEffect} from "react";
import useLogs from "@/lib/hooks/useLogs";

const TIDE_TASK = 'TideTask';
const NOTIF_TASK = 'NotifTask';

export default function RootLayout() {

  useEffect(()=>{
    const log = useLogs();
    log.deleteOld();
    TaskManager.defineTask(TIDE_TASK, updateTides);
    BackgroundFetch.registerTaskAsync(TIDE_TASK, {
      minimumInterval: 60 * 60 * 6, // every 6 hours
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    })
      .then(()=>log.log("Tide task setup OK"))
      .catch(()=>log.log("Tide task KO",3));

    TaskManager.defineTask(NOTIF_TASK, planNotifications);
    BackgroundFetch.registerTaskAsync(NOTIF_TASK, {
      minimumInterval: 60 * 60 * 4, // every 4 hours
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    })
      .then(()=>log.log("Notif task setup OK"))
      .catch(()=>log.log("Notif task KO",3));
  },[]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

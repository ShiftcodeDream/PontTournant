import { Stack } from "expo-router";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

import updateTides from "@/task/updateTides";
import planNotifications from "@/task/planNotifications";

const TIDE_TASK = 'TideTask';
const NOTIF_TASK = 'NotifTask';

TaskManager.defineTask(TIDE_TASK, updateTides);
BackgroundFetch.registerTaskAsync(TIDE_TASK, {
  minimumInterval: 60 * 60 * 6, // every 6 hours
  stopOnTerminate: false, // android only,
  startOnBoot: true, // android only
});

TaskManager.defineTask(NOTIF_TASK, planNotifications);
BackgroundFetch.registerTaskAsync(NOTIF_TASK, {
  minimumInterval: 60 * 60 * 4, // every 4 hours
  stopOnTerminate: false, // android only,
  startOnBoot: true, // android only
});

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

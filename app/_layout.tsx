import { Stack } from "expo-router";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

import updateTides from "@/task/updateTides";

const TIDE_TASK = 'TideTask';

TaskManager.defineTask(TIDE_TASK, updateTides);
BackgroundFetch.registerTaskAsync(TIDE_TASK, {
  minimumInterval: 60 * 60 * 6, // every 6 hours
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

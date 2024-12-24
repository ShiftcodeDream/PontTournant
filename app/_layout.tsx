import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title:'Accueil' }} />
      <Stack.Screen name="about" options={{ title:'A propos' }} />
    </Stack>
  );
}

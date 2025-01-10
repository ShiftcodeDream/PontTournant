import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles, { theme } from "@/GlobalStyle";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
        tabBarInactiveTintColor: theme.inactif,
        tabBarActiveTintColor: theme.titre,
        headerStyle: styles.titleBar,
        headerShadowVisible: true,
        headerTintColor: theme.fg,
        tabBarStyle: styles.tabBar,
        tabBarPosition: 'top',
      }}
    >
      <Tabs.Screen name="index" options={{
        tabBarLabel:'Accueil',
        title: 'Pont Tournant de Cherbourg',
        tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        ), }}
      />
      <Tabs.Screen name="about" options={{
        title:'Infos',
        tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
        ), }}/>
      <Tabs.Screen name="config" options={{
        title:'Paramètres de notification',
        tabBarIcon: ({color}) => (
          <AntDesign name='setting' color={color} size={24}/>
        ) }}/>
    </Tabs>
  );
}

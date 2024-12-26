import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "@/components/GlobalStyle";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: styles.tabBar.color,
        headerStyle: styles.titleBar,
        headerShadowVisible: true,
        headerTintColor: styles.titleBar.color,
        tabBarStyle: styles.tabBar,
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
        title:'Paramètres',
        tabBarIcon: ({color}) => (
          <AntDesign name='setting' color={color} size={24}/>
        ) }}/>
    </Tabs>
  );
}

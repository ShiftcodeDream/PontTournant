import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: '#0569FF',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >
      <Tabs.Screen name="index" options={{
        title:'Accueil',
        tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        ), }}
      />
      <Tabs.Screen name="about" options={{
        title:'A propos',
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

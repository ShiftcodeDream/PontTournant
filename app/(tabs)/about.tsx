import {useEffect, useState} from "react";
import {Animated, SafeAreaView, Text, StyleSheet, StyleProp, TextStyle, Pressable} from 'react-native';
import {Link} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {LinearGradient} from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

import styles, {theme} from "@/GlobalStyle";
import {displayNotification} from "@/Utils";
import {APP_VERSION, toastConfig} from "@/params";

export default function AboutScreen() {
  const [hideCtr, setHideCtr] = useState(4);
  const just: StyleProp<TextStyle> = StyleSheet.compose(styles.text,{
    textAlign: 'justify'
  });
  const left: StyleProp<TextStyle> = StyleSheet.compose(styles.text,{
    width: '100%',
    textAlign: 'left'
  });

  useEffect(()=> {
    const subscription = Notifications.addNotificationReceivedListener(displayNotification);
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <LinearGradient colors={[theme.bgfrom, theme.bgto]}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titre}>Pont Tournant de Cherbourg</Text>
            <Text style={just}>
              Le pont tournant de Cherbourg est susceptible de touner
              <Text style={{fontWeight: 'bold'}}> une heure avant</Text> et
              <Text style={{fontWeight: 'bold'}}> une heure après</Text> la pleine mer.
              Le pont ne tournera que si un bâteau se présente pour entrer ou sortir du bassin du commerce.
            </Text>
            <Text style={just}>
              Pendant toute la durée de la manoeuvre, la traversée du pont par les véhicules terrestres et les piétons est
              rendue impossible. Cette manoeuvre ne dure en général pas plus de dix minutes.
            </Text>
            <Text style={styles.titre}>A propos de l'application</Text>
            <Text style={just}>
              Si vous avez l'habitude de traverser le pont tournant à certaines heures (pour aller ou revenir du travail par exemple),
              renseignez ces horaires dans l'application. Vous recevrez une notification quelques minutes avant la manoeuvre.
              Ce délai est paramétrable à votre guise : vous pouvez définir combien de temps avant que la manoeuvre n'ait lieu
              vous souhaitez être prévenu.
            </Text>
            <Text style={[just, styles.withSeparator, {borderColor: theme.fg}]}>
              Les informations données ici le sont à titre informative. L'auteur de l'application ne peut être responsable
              de la qualité des prédictions, ni des conséquences de l'utilisation de cette application.
            </Text>
            <Text style={just}>
              Application développée par Matthias Delamare.
            </Text>
            <Text style={left}>
              Website <Link href="http://mdelamare.free.fr" style={styles.link}>
                http://mdelamare.free.fr
              </Link>
            </Text>
            <Text style={left}>
              Github <Link href="https://github.com/ShiftcodeDream/PontTournant" style={styles.link}>
                https://github.com/ShiftcodeDream/PontTournant
              </Link>
            </Text>
            <Pressable onPress={()=>setHideCtr(c=> c-1)}>
              <Text style={styles.text}>Version {APP_VERSION}</Text>
            </Pressable>
            { hideCtr<0 && (
              <Text style={just}>
                <Link href="/displayLogs">Voir les logs</Link>
              </Text>
            )}
            <Toast config={toastConfig} />
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

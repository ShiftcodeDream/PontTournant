import {useEffect} from "react";
import {Animated, SafeAreaView, Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import styles, {theme} from "@/GlobalStyle";
import {Link} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {LinearGradient} from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

import {displayNotification} from "@/Utils";
import {APP_VERSION, toastConfig} from "@/params";

export default function AboutScreen() {
  const just: StyleProp<TextStyle> = StyleSheet.compose(styles.text,{
    textAlign: 'justify'
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
              L'application envoie
              une notification lorsqu'une manoeuvre du pont va avoir lieu. Vous pouvez choisir les périodes de temps qui vous intéressent
              (moments où vous êtes susceptibles de traverser le pont). Vous pouvez aussi choisir combien de temps avant
              la manoeuvre vous souhaitez être prévenu(e).
            </Text>
            <Text style={[just, styles.withSeparator, {borderColor: theme.fg}]}>
              Les informations données ici le sont à titre informative. L'auteur de l'application ne peut être responsable
              de la qualité des prédictions, ni des conséquences de l'utilisation de cette application.
            </Text>
            <Text style={just}>
              Application développée par Matthias Delamare sous licence Open Source.
            </Text>
            <Text style={styles.text}>
              Website <Link href="http://mdelamare.free.fr" style={styles.link}>
                http://mdelamare.free.fr
              </Link>
            </Text>
            <Text style={styles.text}>
              Github <Link href="https://github.com/ShiftcodeDream/PontTournant" style={styles.link}>
                https://github.com/ShiftcodeDream/PontTournant
              </Link>
            </Text>
            <Text style={styles.text}>
              Version {APP_VERSION}
            </Text>
            <Toast config={toastConfig} />
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

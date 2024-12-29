import {Animated, SafeAreaView, Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import styles from "@/components/GlobalStyle";
import {Link} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;

export default function AboutScreen() {
  const just: StyleProp<TextStyle> = StyleSheet.compose(styles.text,{
    textAlign: 'justify'
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titre}>Pont Tournant de Cherbourg</Text>
          <Text style={just}>
            Le pont tournant de Cherbourg est susceptible de touner
            <Text style={{fontWeight: 'bold'}}>une heure avant</Text> et <Text style={{fontWeight: 'bold'}}>une heure après</Text> la pleine mer.
            Le pont ne tourne que si un bâteau se présente pour entrer ou sortir du bassin du commerce.
          </Text>
          <Text style={just}>
            Pendant toute la durée de la manoeuvre, la traversée du pont par les véhicules terrestres et les piétons est
            rendue impossible. Cette manoeuvre ne dure en général pas plus de dix minutes.
          </Text>
          <Text style={styles.titre}>A propos de l'application</Text>
          <Text style={just}>
            L'application Pont Tournant a été développée par Matthias Delamare sous licence Open Source. L'application envoie
            une notification lorsqu'une manoeuvre du pont va avoir lieu. Vous pouvez choisir les périodes de temps qui vous intéresse
            (moments où vous êtes susceptibles de traverser le pont). Vous pouvez aussi choisir combien de temps avant
            la manoeuvre vous souhaitez être prévenu(e).
          </Text>
          <Text style={just}>
            Les informations données ici le sont à titre informative. L'auteur de l'application ne peut être responsable
            de la qualité des prédictions, ni des conséquences de l'utilisation de cette application.
          </Text>
          <Link href="http://mdelamare.free.fr" style={styles.link}>http://mdelamare.free.fr</Link>
          <Text style={just}>
            Github : <Link href="https://github.com/ShiftcodeDream/PontTournant" style={styles.link}>
              https://github.com/ShiftcodeDream/PontTournant
            </Link>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

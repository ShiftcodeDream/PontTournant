import {StyleSheet} from "react-native";

export default StyleSheet.create({
  /* Entete en haut de l'écran */
  titleBar: {
    backgroundColor: '#082345',
    color: '#d0efff',
  },
  container: {
    backgroundColor: '#0e2b51',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Barre d'onglets en bas de l'écran */
  tabBar: {
    backgroundColor: '#082345',
    color: '#4891fa',
  },
  /* Affichage du jour */
  day: {
    color: '#eeb',
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 5,
  },
  /* Affichage d'un horaire */
  horaireView: {
    // width: '50%',
  },
  horaire: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 15,
    color: '#eeb',
  },
  horaireActif: {
    borderBottomColor: '#dd46ad',
    borderBottomWidth: 3,
  },
  horaireNext: {
    borderBottomColor: '#2da823',
    borderBottomWidth: 3,
  },
  // Ecran infos
  titre: {
    color: '#4891fa',
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    color: '#eeb',
    fontSize: 16,
    textAlign: 'justify',
    padding: 10,
  },
  link: {
    fontSize: 16,
    color: '#9a61bf',
  }
});
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
  },
  // Champs de saisie de texte
  input: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 40,
    borderWidth: 1,
    borderColor: '#eeb',
    margin: 6,
    textAlign: 'center',
  },
  wideButton: {
    width: '100%',
    borderColor: '#d0efff',
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: '#eeb',
    fontSize: 24,
  },
  roundedButtonContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#0e2b51',
  },
  roundedButton: {
    borderColor: '#d0efff',
    borderWidth: 0,
    borderRadius: 30,
  },
  roundedButtonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#d0efff',
    textAlign: 'center',
  },
});
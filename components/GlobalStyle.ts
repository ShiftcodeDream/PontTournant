import {StyleSheet} from "react-native";

const t = {
  bg      : '#0e2b51',
  bgdark  : '#082345',
  bglight : '#2a5998',
  fg      : '#d0efff',
  prim    : '#4891fa',
  sec     : '#eeb',
  danger  : '#dd46ad',
  success : '#2da823',
  link    : '#9a61bf',
}
export const theme = t;

export default StyleSheet.create({
  /* Entete en haut de l'écran */
  titleBar: {
    backgroundColor: t.bgdark,
  },
  container: {
    backgroundColor: t.bg,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  /* Barre d'onglets en bas de l'écran */
  tabBar: {
    backgroundColor: t.bg,
    color: t.prim,
  },
  /* Affichage du jour */
  day: {
    color: t.sec,
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 5,
  },
  /* Affichage d'un horaire */
  horaireView: {
  },
  horaire: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 15,
    color: t.fg,
  },
  horaireActif: {
    borderBottomColor: t.danger,
    borderBottomWidth: 3,
  },
  horaireNext: {
    borderBottomColor: t.success,
    borderBottomWidth: 3,
  },
  // Ecran infos
  titre: {
    color: t.prim,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    color: t.fg,
    fontSize: 16,
    padding: 10,
  },
  link: {
    fontSize: 16,
    color: t.link,
  },
  // Champs de saisie de texte
  input: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: t.sec,
    margin: 6,
    textAlign: 'center',
  },
  wideButton: {
    width: '100%',
    backgroundColor: t.prim,
    borderColor: t.fg,
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: t.sec,
    fontSize: 24,
  },
  roundedButtonContainer: {
    width: 30,
    height: 30,
    backgroundColor: t.bg,
  },
  roundedButton: {
    borderWidth: 0,
  },
  roundedButtonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: t.fg,
    textAlign: 'center',
  },
});
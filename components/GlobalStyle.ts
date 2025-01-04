import {StyleSheet} from "react-native";

const t = {
  bgfrom  : '#000428',
  bgmid   : '#00295d',
  bgto    : '#004e92',
  bg      : '#0e2b51',
  bglight : '#2a5998',
  inactif : '#5d7685',
  prim   : '#004e92',
  fg      : '#d0efff',
  titre   : '#4891fa',
  sec     : '#eeb',
  warning : '#e39e3f',
  danger  : '#dd46ad',
  success : '#2da823',
  link    : '#9a61bf',
}
export const theme = t;

export default StyleSheet.create({
  /* Entete en haut de l'écran */
  titleBar: {
    backgroundColor: t.bgfrom,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  /* Barre d'onglets en haut de l'écran */
  tabBar: {
    backgroundColor: t.bgmid,
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
    color: t.titre,
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
    borderRadius: 5,
    margin: 6,
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: t.fg,
    fontSize: 16,
    padding: 5,
  },
  roundedButtonContainer: {
    width: 30,
    height: 30,
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
  roundedContainer: {
    borderWidth:2,
    borderColor:t.bglight,
    backgroundColor: t.bg,
    marginTop:4,
    borderRadius:10,
    marginLeft:20,
    marginRight:20,
  },
  withSeparator: {
    width: '100%',
    borderBottomColor: t.bg,
    borderBottomWidth: 2,
  }
});

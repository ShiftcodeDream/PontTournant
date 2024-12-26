import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Entete en haut de l'écran */
  titleBar: {
    backgroundColor: '#0569FF',
    color: '#d0efff',
  },
  button: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    color: '#fff',
    padding: 5,
    marginTop: 5,
  },
  /* Barre d'onglets en bas de l'écran */
  tabBar: {
    backgroundColor: '#d0efff',
    color: '#0569FF',
  },
  /* Affichage du jour */
  day: {
    color: '#2743d1',
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 5,
  },
  /* Affichage d'un horaire */
  horaireView: {
    width: '50%',
  },
  horaire: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 7,
    marginTop: 5,
    padding: 5,
  },
  horaireActif: {
    borderColor: '#ff05b0',
  },
  horaireNext: {
    borderColor: '#2cbf20',
  }
});
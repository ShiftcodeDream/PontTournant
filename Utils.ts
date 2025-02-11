import dayjs, {Dayjs} from "dayjs";
import Toast from "react-native-toast-message";
import { Notification } from "expo-notifications";

/**
 * Returns string with first letter upper cased
 *
 * @param st
 */
export function firstUpperCase(st: string){
  return st.charAt(0).toUpperCase() + st.slice(1);
}

/**
 * If value is between mini and maxi, then returns valeur
 * If not, returns mini if value is lower than mini, or maxi if value is greater than maxi
 *
 * @param valeur
 * @param mini
 * @param maxi
 */
export function clamp(valeur: number, mini: number, maxi: number): number{
  return valeur < mini
    ? mini
    : valeur > maxi
    ? maxi
    : valeur;
}

/**
 * Renvoie ce qui est situé entre tagDebut et tagFin, ou null si au moins un des deux tags n'a pas été trouvé
 *
 * @param tagDebut
 * @param tagFin
 * @param texte
 */
export function extractBetween(tagDebut:string, tagFin:string, texte:string): string|null{
  let indexDebut, indexFin;
  indexDebut = texte.indexOf(tagDebut);
  if(indexDebut < 0)
    return null;
  indexDebut += tagDebut.length;
  indexFin = texte.indexOf(tagFin, indexDebut);
  if(indexFin < 0)
    return null;
  return texte.substring(indexDebut, indexFin);
}

/**
 * Renvoie tout ce qui se situe entre tagDebut et tagFin. Renvoie autant d'éléments
 * de tableau que de couples tagDebut / tagFin trouvés
 *
 * @param tagDebut
 * @param tagFin
 * @param texte
 */
export function splitBetween(tagDebut:string, tagFin:string, texte:string): Array<string>{
  const result: Array<string> = [];
  let indexDebut= 0, indexFin;
  while(true) {
    indexDebut = texte.indexOf(tagDebut, indexDebut);
    if (indexDebut < 0)
      return result;
    indexDebut += tagDebut.length;
    indexFin = texte.indexOf(tagFin, indexDebut);
    if (indexFin < 0)
      return result;
    result.push(texte.substring(indexDebut, indexFin));
  }
}
/**
 * Transforme une date "mercredi 30 janvier 2025" en date Dayjs
 * marche aussi pour   "vendredi  3 janvier 2025" (deux espaces à la suite)
 * @param theDate
 */
export function fromTextualDate(theDate: string): Dayjs {
  const mois = ['','janvier','fevrier','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','decembre'];
  const v = theDate.trim().split(' ').filter(h=>h.length>0);
  const numMois = mois.indexOf(v[2].toLowerCase());
  return dayjs(v[3] + '-' + numMois + '-' + v[1]);
}

/**
 * Retourne l'heure et les minutes sous la forme d'un nombre HHMM
 * @param d Dayjs contenant un timestamp complet
 */
export function getHourMinute(d: Dayjs): number{
  return d.hour()*100 + d.minute();
}

/**
 * Debounces a function, so that even if it is called several times,
 * it is executed only once after [delay] milliseconds
 *
 * @param func
 * @param delay
 */
const debounce = (func, delay) => {
  let timeoutId: NodeJS.Timeout;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(
      () => func.apply(this, args),
      delay
    );
  };
};

export function displayNotification(notif: Notification){
  const { content } = notif.request;
  Toast.show({
    type: 'info',
    text1: content.title,
    text2: content.body,
    visibilityTime: 10000,
  });
}

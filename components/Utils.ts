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
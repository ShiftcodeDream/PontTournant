import {Dayjs} from "dayjs";

import {extractBetween, fromTextualDate, splitBetween} from "@/Utils";
import {TIDES_URL} from "@/params";
import {TideDb} from "@/components/db/TidesDb";

/**
 * ETL (Extract, Tranform and Load) tides from web to local database
 * @returns number of tides found, or -1 if failed, or 0 if no data found
 */
export async function downloadTides(): Promise<number>{
  let status = 0;
  const tideDb = new TideDb();
  // Ménage dans les anciennes marées
  await tideDb.deletePastTides()
    .then(fetchTidesFromWeb)
    .then(computeTideDataFromWeb)
    .then(tides => {
      if(tides && tides.length){
        status = tides.length;
        tides.forEach(tide => tideDb.add(tide));
      }
    })
    .catch(()=> status = -1);
  return status;
}
/**
 * Return tides
 *
 * @param fromWeb if true, fetches tides from web then return data
 * if false, returns data from local db
 */
export function getTides(fromWeb: boolean): Promise<Dayjs[]>{
  if(fromWeb)
    return downloadTides().then(() => new TideDb().getTides());
  else
    return new TideDb().getTides();
}
/**
 * Fetches data from website.
 * Note that fetch used IS NOT expo-fetch
 */
export function fetchTidesFromWeb(): Promise<string>{
  return fetch(TIDES_URL).then(rep => rep.text())
}

export function computeTideDataFromWeb(tidesData: string): Dayjs[]{
  let today:Dayjs, data:string|null, cells:Array<string>, result: Array<Dayjs> = [];
  // Removes accents to remove UTF-8 multibyte characters
  const texte = tidesData.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Extracts "today" value
  let strToday = extractBetween('<h3 class="orange">', '</h3>', texte);
  if(strToday === null)
    return [];
  strToday = strToday.split('<br />')[1];
  today = fromTextualDate(strToday);

  // Extracts today tide values
  data = extractBetween('<div id="i_donnesJour">', '</div>', texte);
  if (data !== null) {
    cells = splitBetween('<strong>', '</strong>', data);
    if(cells.length>12)
      [10, 12].forEach(addTide);
  }

  // Extracts other days tides
  data = extractBetween('<div id="i_donnesLongue">', '</div>', texte);
  if (data != null) {
    cells = splitBetween('<strong>', '</strong>', data);
    for(let j=3; j<cells.length; j+=7){
      today = today.add(1, 'day');
      [j, j+3].forEach(addTide);
    }
  }

  function addTide(i:number){
    if (cells[i].length > 0) {
      const v = cells[i].trim().split('h').map(k => parseInt(k));
      let pleineMer = today.hour(v[0]).minute(v[1]);
      if(pleineMer.isValid()) {
        result.push(pleineMer.add(-1, 'hour'));
        result.push(pleineMer.add(1, 'hour'));
      }
    }
  }
  return result;
}

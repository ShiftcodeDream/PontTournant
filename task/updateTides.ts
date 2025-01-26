
import { BackgroundFetchResult } from 'expo-background-fetch';
import { downloadTides } from "@/api/Tides";
import useLogs from "@/lib/hooks/useLogs";
/**
 * Task to update tides information in background
 * @constructor
 */
export default async function updateTides(){
  const log = useLogs();
  log.log("START UpdateTides");
  const status = await downloadTides();
  switch(status){
    case  0:
      log.log("END UpdateTides : no data");
      return BackgroundFetchResult.NoData;
    case -1:
      log.log("END UpdateTides : failed");
      return BackgroundFetchResult.Failed;
    default:
      log.log("END UpdateTides : new data");
      return BackgroundFetchResult.NewData;
  }
}

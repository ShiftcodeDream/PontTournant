
import { BackgroundFetchResult } from 'expo-background-fetch';
import { downloadTides } from "@/api/Tides";
/**
 * Task to update tides information in background
 * @constructor
 */
export default async function updateTides(){
  const status = await downloadTides();
  switch(status){
    case  0: return BackgroundFetchResult.NoData;
    case -1: return BackgroundFetchResult.Failed;
    default: return BackgroundFetchResult.NewData;
  }
}

import {computeTideDataFromWeb, fetchTidesFromWeb} from "@/api/Maree";
import {TideDb} from "@/components/db/TidesDb";

const db = new TideDb();
export default function updateTides(){
  db.deletePastTides()
    .then(fetchTidesFromWeb)
    .then(computeTideDataFromWeb)
    .then(tides => {
      tides.forEach(tide => {
        // Insert ignore if exists
        db.add(tide);
      });
    });
  db.deletePastTides();
}

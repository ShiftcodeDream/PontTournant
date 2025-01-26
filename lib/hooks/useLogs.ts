import {LogDb} from "@/components/db/LogsDb";

export default function useLogs(){
  const logDb = new LogDb();
  return {
    log: logDb.log,
    getAll: logDb.getAll,
    deleteOld: logDb.deleteOld,
    clear: logDb.deleteAll,
  }
}

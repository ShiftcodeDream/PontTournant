import {AppDatabase} from "@/components/db/AppDatabase";
import dayjs, {Dayjs} from "dayjs";

/**
 * Object type
 */
export type LogEntry = {
  id:number,
  time:Dayjs,
  type:number,
  text:string
}
/**
 * SQLite database access to log table
 */
export class LogDb {
  async log(text:string, type=1): Promise<number> {
    const db = AppDatabase.getInstance();

    return db.runAsync(
      "INSERT INTO log (time, type, text) VALUES(?,?,?)",
      dayjs().format("YYYY-MM-DD HH:mm:ss"),
      type,
      text
    )
      .then(result => result.lastInsertRowId)
  }

  /**
   * Get all
   */
  async getAll(): Promise<LogEntry[]>{
    const db = AppDatabase.getInstance();
    return db.getAllAsync(
      "SELECT * FROM log ORDER BY DATETIME(time)"
    ).then(rep => {
      return rep.map(LogDb.toLogEntry)
    });
  }

  /**
   * Deletes logs older one week
   *
   */
  async deleteOld(): Promise<void>{
    const db = AppDatabase.getInstance();
    await db.runAsync(
      "DELETE FROM log WHERE DATETIME(time) < DATETIME('now', '-7 day')"
    );
  }

  /**
   * Deletes all tides
   */
  async deleteAll(): Promise<void>{
    const db = AppDatabase.getInstance();
    await db.runAsync(
      "DELETE FROM log WHERE true"
    );
  }

  /**
   * Creates an object instance from data retrieved from Sqlite database
   * @param v
   */
  static toLogEntry(v: unknown): LogEntry {
    // @ts-ignore
    let result: unknown = {
      id:v.id,
      time:dayjs(v.time, "YYYY-MM-DD HH:mm:ss"),
      type:v.type,
      text:v.text
    }
    return (result as LogEntry);
  }
}

import {AppDatabase} from "@/components/db/AppDatabase";
import dayjs, {Dayjs} from "dayjs";

// Formats for internal Sqlite use
const TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:00";
const DATE_FORMAT = "YYYY-MM-DD";
/**
 * Object type
 */
export type TideType = {
  tideTimestamp: Dayjs,
  lastNotification: Dayjs|null
}
/**
 * Object internal storage into Sqlite database
 */
type sqlTimeRangeType = {
  tide_timestamp: string,
  last_notification: string|null
}

/**
 * SQLite database access to time_range table
 */
export class TideDb {
  /**
   * Creates a new tide information
    * @param tide
   */
  async add(tide: Dayjs): Promise<number> {
    const db = AppDatabase.getInstance();

    return db.runAsync(
      "INSERT OR IGNORE INTO tide (tide_timestamp) VALUES(?)",
      tide.format(TIMESTAMP_FORMAT)
    )
      .then(result => result.lastInsertRowId)
  }

  /**
   * Get all tides
   */
  async getAll(): Promise<TideType[]>{
    const db = AppDatabase.getInstance();
    return db.getAllAsync(
      "SELECT * FROM tide ORDER BY TIMESTAMP(tide_timestamp)"
    ).then(rep => {
      // TODO : clean
      // console.log(rep);
      return rep.map(TideDb.toTideDataType)
    });
  }

  /**
   * Get all tides not having alreadu notified for a given day
   *
   * @param day Dayjs of the date or null for today
   */
  async getAllActive(day?: Dayjs): Promise<TideType[]>{
    const db = AppDatabase.getInstance();
    day = day ?? dayjs();
    return db.getAllAsync(
      "SELECT * FROM tide WHERE last_notification IS NULL AND DATE(tide_timestamp)=DATE(?)",
      day.format(DATE_FORMAT)
    ).then(rep => rep.map(TideDb.toTideDataType));
  }

  /**
   * Sets last notification date of a tide.
   *
   * @param id Tide id
   * @param timest Dayjs : last notification timestamp or null to reset to the "not notified" status
   */
  async setNotificationDate(id: number, timest: Dayjs|null): Promise<void>{
    const db = AppDatabase.getInstance();
    db.runAsync(
      "UPDATE tide SET last_notification=? WHERE id=?",
      timest ? timest.format(TIMESTAMP_FORMAT) : null,
      id
    );
  }

  /**
   * Deletes a tide by its id
   * @param id
   */
  async deleteById(id: number): Promise<void>{
    const db = AppDatabase.getInstance();
    await db.runAsync(
      "DELETE FROM tide WHERE id=?",
      id
    );
  }

  /**
   * Deletes tides older than the date "before"
   * if not provided, deletes tides older than yesterday (yesterday included)
   *
   * @param before
   */
  async deletePastTides(before?: Dayjs): Promise<void>{
    before = before || dayjs();
    const db = AppDatabase.getInstance();
    await db.runAsync(
      "DELETE FROM time_range WHERE DATE(tide_timestamp) < DATE(?)",
      before.format(DATE_FORMAT)
    );
  }

  /**
   * Deletes all tides
   */
  async deleteAll(): Promise<void>{
    const db = AppDatabase.getInstance();
    await db.runAsync(
      "DELETE FROM time_range WHERE true"
    );
  }

  /**
   * Converts data structure to be stored into Sqlite database
   * @param v
   */
  static toSqlDataType(v: TideType){
    let result: unknown = {
      tide_timestamp: v.tideTimestamp.format(TIMESTAMP_FORMAT),
      last_notification: v.lastNotification !== null ? v.lastNotification.format(TIMESTAMP_FORMAT) : null
    }
    return (result as sqlTimeRangeType);
  }

  /**
   * Creates an object instance from data retrieved from Sqlite database
   * @param v
   */
  static toTideDataType(v: unknown): TideType {
    let result: unknown = {
      tideTimestamp: dayjs(v.tide_timestamp,TIMESTAMP_FORMAT),
      lastNotification: dayjs(v.last_notification, TIMESTAMP_FORMAT)
    }
    return (result as TideType);
  }
}

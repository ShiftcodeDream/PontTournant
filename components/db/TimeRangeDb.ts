import {AppDatabase} from "@/components/db/AppDatabase";
import dayjs, {Dayjs} from "dayjs";

/**
 * Object type
 */
export type TimeRangeType = {
  id: number,
  startTime: Dayjs,
  endTime: Dayjs,
  weekDays: boolean[],
  enabled: boolean
}
/**
 * Object internal storage into Sqlite database
 */
type sqlTimeRangeType = {
  id: number,
  start_time: number,
  end_time: number,
  week_days: string,
  enabled: number
}

const AllWeekDays = "lun,mar,mer,jeu,ven,sam,dim".split(',');
/**
 * SQLite database access to time_range table
 */
export class TimeRangeDb {
  /**
   * Create a new TimeRange in the db
   * @param value Timerange to create
   */
  async add(value: TimeRangeType): Promise<number> {
    const db = AppDatabase.getInstance();
    const data = TimeRangeDb.toSqlDataType(value);

    return db.runAsync(
      "INSERT INTO time_range (start_time, end_time, enabled, week_days) VALUES(?,?,?,?)",
      data.start_time, data.end_time, data.enabled, data.week_days
    )
      .then(result => result.lastInsertRowId)
  }

  /**
   * Get all TimeRanges
   */
  async getAll(): Promise<TimeRangeType[]>{
    const db = AppDatabase.getInstance();
    return db.getAllAsync(
      "SELECT * FROM time_range ORDER BY id DESC"
    ).then(rep => {
      // TODO : clean
      // console.log(rep);
      return rep.map(TimeRangeDb.toTimeRangeDataType)
    });
  }

  /**
   * Get all TimeRange currently enabled
   */
  async getAllActive(): Promise<TimeRangeType[]>{
    const db = AppDatabase.getInstance();
    return db.getAllAsync(
      "SELECT * FROM time_range WHERE enabled=1"
    ).then(rep => rep.map(TimeRangeDb.toTimeRangeDataType));
  }

  /**
   * Get a TimeRange by its id
   * @param id
   */
  async getById(id: number): Promise<TimeRangeType>{
    const db = AppDatabase.getInstance();
    return db.getFirstAsync(
      "SELECT * FROM time_range WHERE id=?",
      id
    ).then(TimeRangeDb.toTimeRangeDataType);
  }

  /**
   * Modify a TimeRange in the db
   * @param id
   * @param value
   */
  async updateById(id: number, value: TimeRangeType): Promise<void>{
    const db = AppDatabase.getInstance();
    const data = TimeRangeDb.toSqlDataType(value);
    db.runAsync(
      "UPDATE time_range SET start_time=?, end_time=?, enabled=?, week_days=? WHERE id=?",
      data.start_time, data.end_time, data.enabled, data.week_days,
      id
    );
  }

  /**
   * Deletes a TimeRange by its id
   * @param id
   */
  async deleteById(id: number): Promise<void>{
    const db = AppDatabase.getInstance();
    await db.runAsync(
      "DELETE FROM time_range WHERE id=?",
      id
    );
  }

  /**
   * Deletes from the db all inactive TimeRanges
   */
  async deleteAllInactive(): Promise<void>{
    const db = AppDatabase.getInstance();
    await db.runAsync(
      "DELETE FROM time_range WHERE enabled=0"
    );
  }

  /**
   * Deletes all TimeRanges
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
  static toSqlDataType(v: TimeRangeType){
    let result: unknown = {
      id: v.id,
      start_time: v.startTime.get('hour')*100 + v.startTime.get('minute'),
      end_time: v.endTime.get('hour')*100 + v.endTime.get('minute'),
      week_days: AllWeekDays.filter((d,i) => v.weekDays[i]).join(','),
      enabled: v.enabled ? 1 : 0
    }
    return (result as sqlTimeRangeType);
  }

  /**
   * Creates an object instance from data retrieved from Sqlite database
   * @param v
   */
  static toTimeRangeDataType(v: unknown): TimeRangeType {
    let result: unknown = {
      id: v.id,
      startTime: dayjs().hour(Math.floor(v.start_time/100)).minute(v.start_time % 60),
      endTime: dayjs().hour(Math.floor(v.end_time/100)).minute(v.end_time % 60),
      weekDays: AllWeekDays.map(d=>v.week_days.includes(d)),
      enabled: v.enabled === 1
    }
    return (result as TimeRangeType);
  }
}

import {AppDatabase} from "@/components/db/AppDatabase";

export type TimeRangeType = {
  id: number,
  start_time: number,
  end_time: number,
  enabled: boolean
}

/**
 * SQLite database access to time_range table
 */
export class TimeRangeDb extends AppDatabase {
  /**
   * Create a new TimeRange in the db
   * @param value Timerange to create
   */
  async add(value: TimeRangeType): Promise<number> {
    const db = this.getDbSync();

    return db.runAsync(
      "INSERT INTO time_range (start_time, end_time, enabled) VALUES(?,?,?)",
      value.start_time, value.end_time, value.enabled? 1 : 0
    )
      .then(result => result.lastInsertRowId)
  }

  /**
   * Get all TimeRanges
   */
  async getAll(): Promise<TimeRangeType[]>{
    const db = this.getDbSync();
    return db.getAllAsync<any>(
      "SELECT * FROM time_range"
    ).then(rep => rep.map(r => (r as TimeRangeType)));
  }

  /**
   * Get all TimeRange currently enabled
   */
  async getAllActive(): Promise<TimeRangeType[]>{
    const db = this.getDbSync();
    return db.getAllAsync(
      "SELECT * FROM time_range WHERE enabled=1"
    ).then(rep => rep.map(r => (r as TimeRangeType)));
  }

  /**
   * Get a TimeRange by its id
   * @param id
   */
  async getById(id: number): Promise<TimeRangeType>{
    const db = this.getDbSync();
    return db.getFirstAsync(
      "SELECT * FROM time_range WHERE id=?",
      id
    ).then(r => (r as TimeRangeType));
  }

  /**
   * Modify a TimeRange in the db
   * @param id
   * @param value
   */
  async updateById(id: number, value: TimeRangeType): Promise<void>{
    const db = this.getDbSync();
    db.runAsync(
      "UPDATE time_range SET start_time=?, end_time=?, enabled=? WHERE id=?",
      value.start_time, value.end_time, value.enabled?1:0,
      id
    );
  }

  /**
   * Deletes a TimeRange by its id
   * @param id
   */
  async deleteById(id: number): Promise<void>{
    const db = this.getDbSync();
    await db.runAsync(
      "DELETE FROM time_range WHERE id=?",
      id
    );
  }

  /**
   * Deletes from the db all inactive TimeRanges
   */
  async deleteAllInactive(): Promise<void>{
    const db = this.getDbSync();
    await db.runAsync(
      "DELETE FROM time_range WHERE enabled=0"
    );
  }

  /**
   * Deletes all TimeRanges
   */
  async deleteAll(): Promise<void>{
    const db = this.getDbSync();
    await db.runAsync(
      "DELETE FROM time_range WHERE true"
    );
  }
}

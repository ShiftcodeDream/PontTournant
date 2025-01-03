import {openDatabaseSync, SQLiteDatabase} from "expo-sqlite";

const DATABASE_VERSION = 1;
// Times in hour + minutes are stocked with the following formula :
// hours*100 + minutes (hours from 0 to 23, minutes from 0 to 59)
const MIGRATION_STATEMENT_TO_V1 : string[] = [
  `CREATE TABLE IF NOT EXISTS time_range (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time NUMERIC,
    end_time NUMERIC,
    week_days TEXT DEFAULT '',
    enabled NUMERIC
   )`
];

export class AppDatabase {
  protected db:SQLiteDatabase | null = null;

  constructor(private readonly databaseName: string = 'ExpoSQLiteStorage'){ }

  protected getDbSync(): SQLiteDatabase {
    if (!this.db) {
      this.db = openDatabaseSync(this.databaseName);
      this.maybeMigrateDbSync(this.db);
    }
    return this.db;
  }
  private maybeMigrateDbSync(db: SQLiteDatabase) {
    db.withTransactionSync(() => {
      // TODO : clean
      // db.runSync("ALTER TABLE time_range DROP COLUMN week_days");
      // db.runSync("ALTER TABLE time_range ADD COLUMN week_days TEXT DEFAULT ''");
      // console.log(db.getAllSync("PRAGMA table_info(time_range)"));
      // console.log(db.getAllSync("SELECT * FROM time_range"));

      const result = db.getFirstSync<{ user_version: number }>('PRAGMA user_version');
      let currentDbVersion = result?.user_version ?? 0;
      if (currentDbVersion >= DATABASE_VERSION) {
        return;
      }
      switch(currentDbVersion){
        case 0:
          MIGRATION_STATEMENT_TO_V1.forEach(sql => db.execSync(sql));
          // For next data version, do not write "breaks" to execute scripts MIGRATION_STATEMENT_TO_V2, V3, etc...
      }
      db.execSync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    });
  }

  /**
   * Closes the database connection asynchronously.
   */
  async close(): Promise<void> {
    console.log("CLOSE");
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }

}
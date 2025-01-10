import {openDatabaseSync, SQLiteDatabase} from "expo-sqlite";
import {DATABASE_NAME} from "@/params";

const DATABASE_VERSION = 1;
// Times in hour + minutes are stocked with the following formula :
// hours*100 + minutes (hours from 0 to 23, minutes from 0 to 59)
// table tide : id and last_notification fields are for potential future uses
const MIGRATION_STATEMENT_TO_V1 : string[] = [
  `CREATE TABLE IF NOT EXISTS time_range (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time NUMERIC,
    end_time NUMERIC,
    week_days TEXT DEFAULT '',
    enabled NUMERIC
   )`,
  `CREATE TABLE IF NOT EXISTS tide (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tide_timestamp TEXT UNIQUE,
    last_notification TEXT DEFAULT NULL
    )`
];
// Singleton for SQLite database access
export class AppDatabase {
  private static db:SQLiteDatabase | null = null;

  private constructor(){ }

  public static getInstance(): SQLiteDatabase {
    if (!AppDatabase.db) {
      AppDatabase.db = openDatabaseSync(DATABASE_NAME);
      AppDatabase.maybeMigrateDbSync(AppDatabase.db);
    }
    return AppDatabase.db;
  }
  private static maybeMigrateDbSync(db: SQLiteDatabase) {
    db.withTransactionSync(() => {
      // TODO : clean
      // db.runSync(`DROP TABLE tide`);
      // db.runSync(`CREATE TABLE IF NOT EXISTS tide (
      //   id INTEGER PRIMARY KEY AUTOINCREMENT,
      //   tide_timestamp TEXT UNIQUE,
      //   last_notification TEXT DEFAULT NULL)`);
      // console.log(db.getAllSync("PRAGMA table_info(tide)"));
      // console.log(db.getAllSync("SELECT * FROM tide"));

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
    if (AppDatabase.db) {
      await AppDatabase.db.closeAsync();
      AppDatabase.db = null;
    }
  }

}
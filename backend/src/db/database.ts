import fs from 'node:fs';
import path from 'node:path';
import initSqlJs, { type Database } from 'sql.js';
import { env } from '../config/env';

let database: Database | undefined;

export async function initializeDatabase() {
  const SQL = await initSqlJs();
  const file = fs.existsSync(env.databaseFile) ? fs.readFileSync(env.databaseFile) : undefined;
  database = file ? new SQL.Database(file) : new SQL.Database();
  database.run('PRAGMA foreign_keys = ON');
  database.run(`
  CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    icon TEXT NOT NULL,
    status INTEGER NOT NULL DEFAULT 0 CHECK (status IN (0, 1))
  );

  CREATE TABLE IF NOT EXISTS sensor_readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperature REAL NOT NULL,
    humidity REAL NOT NULL,
    light REAL NOT NULL,
    device_id INTEGER REFERENCES devices(id) ON DELETE SET NULL,
    recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

  const deviceCount = database.exec('SELECT COUNT(*) AS count FROM devices')[0]?.values[0]?.[0] as number | undefined;

  if (deviceCount === 0) {
    database.run('INSERT INTO devices (name, type, icon, status) VALUES (?, ?, ?, ?)', ['Living Room Light', 'Smart Light', 'bulb-outline', 1]);
    database.run('INSERT INTO devices (name, type, icon, status) VALUES (?, ?, ?, ?)', ['Bedroom Fan', 'Smart Fan', 'sync-outline', 0]);
    database.run('INSERT INTO devices (name, type, icon, status) VALUES (?, ?, ?, ?)', ['Front Door Lock', 'Smart Lock', 'lock-closed-outline', 1]);
    persistDatabase();
  }
}

export function getDatabase(): Database {
  if (!database) throw new Error('Database has not been initialized.');
  return database;
}

export function persistDatabase() {
  const currentDatabase = getDatabase();
  fs.mkdirSync(path.dirname(env.databaseFile), { recursive: true });
  fs.writeFileSync(env.databaseFile, Buffer.from(currentDatabase.export()));
}

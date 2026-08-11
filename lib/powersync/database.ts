/**
 * PowerSync Database Configuration
 *
 * This module initializes and exports the PowerSync database instance.
 * PowerSync provides local-first capabilities with automatic sync to Supabase.
 *
 * For local development, this uses a SQLite file that syncs with your Supabase instance.
 */

import { PowerSyncDatabase } from '@powersync/node'
import { AppSchema } from './schema'
import { Connector } from './connector'

/**
 * PowerSync database instance
 *
 * The database file will be created at: ./powersync.db
 * All queries are executed locally against SQLite for instant response.
 */
export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: process.env.POWERSYNC_DB_URL || 'file:./powersync.db',
  },
})

/**
 * Initialize PowerSync with connection to Supabase
 *
 * Call this once when your application starts (e.g., in a layout or provider).
 * This will:
 * 1. Connect to the PowerSync backend (your Supabase instance)
 * 2. Begin syncing data
 * 3. Wait for initial sync to complete
 */
export async function initializePowerSync() {
  const connector = new Connector()
  await db.connect(connector)

  // Wait for initial data to be synced
  await db.waitForFirstSync({
    timeoutMs: 30000, // 30 second timeout
  })

  console.log('PowerSync initialized and synced')
  return db
}

/**
 * Disconnect PowerSync when shutting down
 */
export async function disconnectPowerSync() {
  await db.disconnect()
  console.log('PowerSync disconnected')
}

// Export types for use in components
export type PowerSyncDB = typeof db
export { AppSchema }

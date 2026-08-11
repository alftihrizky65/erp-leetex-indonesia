/**
 * PowerSync Exports
 *
 * Central export point for PowerSync functionality.
 * Import from this file for easy access to all PowerSync features.
 *
 * @example
 * import { db, initializePowerSync } from '@/lib/powersync'
 *
 * // Initialize on app start
 * await initializePowerSync()
 *
 * // Use the database
 * const users = await db.getAll('SELECT * FROM users')
 */

export { db, initializePowerSync, disconnectPowerSync } from './database'
export { Connector, connector } from './connector'
export * from './schema'
export type { PowerSyncDB } from './database'

import React from 'react'

/**
 * React Hook for PowerSync
 *
 * Use this in React components to access the PowerSync database.
 *
 * @example
 * function UserList() {
 *   const { users, loading } = usePowerSync(
 *     db.getAll('SELECT * FROM users ORDER BY created_at DESC')
 *   )
 *
 *   return <div>{users.map(u => <div key={u.id}>{u.name}</div>)}</div>
 * }
 */
export function usePowerSync<T>(query: () => Promise<T>) {
  // This is a placeholder - for a full React integration,
  // you would want to implement proper React Query or SWR integration
  // with PowerSync's watch() functionality for real-time updates

  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    query().then(setData).finally(() => setLoading(false))
  }, [])

  return { data, loading }
}

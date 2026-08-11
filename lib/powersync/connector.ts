/**
 * PowerSync Connector for Supabase
 *
 * This connector handles:
 * 1. Authentication with Supabase for PowerSync
 * 2. Uploading local changes to Supabase
 * 3. PowerSync session management
 *
 * Note: This requires a PowerSync instance (self-hosted or cloud)
 * to be connected to your Supabase database.
 *
 * For more information: https://docs.powersync.com
 */

import type {
  PowerSyncBackendConnector,
  PowerSyncCredentials,
  UploadQueueCheckpoint,
} from '@powersync/node'
import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client for PowerSync operations
 */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

/**
 * PowerSync Connector for Supabase
 *
 * Implements the PowerSyncBackendConnector interface to integrate
 * PowerSync with Supabase authentication and data synchronization.
 */
export class Connector implements PowerSyncBackendConnector {
  /**
   * Fetch credentials for PowerSync connection
   *
   * This should authenticate the user and return credentials for
   * connecting to the PowerSync instance.
   *
   * Returns the PowerSync endpoint and a JWT token for authentication.
   */
  async fetchCredentials(): Promise<PowerSyncCredentials> {
    // Get current user session from Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error('No active Supabase session. User must be authenticated.')
    }

    // The PowerSync endpoint URL - configure this based on your setup
    // For self-hosted: your PowerSync instance URL
    // For PowerSync Cloud: your cloud instance URL
    const endpoint = process.env.POWERSYNC_ENDPOINT_URL || 'http://localhost:8080'

    // Generate or retrieve a PowerSync token
    // This could be:
    // 1. A JWT issued by your backend that includes user_id
    // 2. A token from the PowerSync service
    const token = await this.getPowerSyncToken(session.access_token, session.user.id)

    return {
      endpoint,
      // Use the user's ID as the PowerSync user identifier
      token: session.access_token,
      // You can include additional user data
      expiresAt: session.expires_at ? session.expires_at * 1000 : undefined,
    }
  }

  /**
   * Upload local changes to Supabase
   *
   * This method is called when PowerSync has local changes that need
   * to be synced to the backend (Supabase).
   *
   * @param database - The PowerSync database with pending changes
   */
  async uploadData(database: any): Promise<void> {
    // Get all pending CRUD operations from PowerSync
    const transaction = await database.getNextCrudTransaction()

    if (!transaction) {
      return
    }

    try {
      // Process each CRUD operation
      for (const op of transaction.crud) {
        await this.applyCrudOperation(op)
      }

      // Acknowledge the transaction as successfully applied
      await transaction.complete()
    } catch (error) {
      // Transaction will be retried on next sync
      console.error('Failed to upload changes to Supabase:', error)
      throw error
    }
  }

  /**
   * Apply a single CRUD operation to Supabase
   */
  private async applyCrudOperation(op: any): Promise<void> {
    const tableName = op.table
    const recordData = op.record

    switch (op.op) {
      case 'PUT': {
        // Insert or update (upsert)
        const { data, error } = await supabase
          .from(tableName)
          .upsert(recordData)

        if (error) throw error
        break
      }
      case 'PATCH': {
        // Update existing record
        const { id, ...updateData } = recordData
        const { data, error } = await supabase
          .from(tableName)
          .update(updateData)
          .eq('id', id)

        if (error) throw error
        break
      }
      case 'DELETE': {
        // Delete record
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq('id', op.record.id)

        if (error) throw error
        break
      }
    }
  }

  /**
   * Get or generate a PowerSync authentication token
   *
   * This token is used to authenticate with the PowerSync instance.
   * You can implement custom token generation logic here.
   */
  private async getPowerSyncToken(supabaseToken: string, userId: string): Promise<string> {
    // Option 1: Use Supabase token directly (if PowerSync validates it)
    // Option 2: Call your backend to generate a PowerSync-specific token
    // Option 3: Use PowerSync Cloud token

    // For now, we'll use the Supabase access token
    // In production, you might want to call an API endpoint that
    // generates a PowerSync-specific signed token

    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/powersync-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${supabaseToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    })

    if (!response.ok) {
      // Fallback to using the Supabase token directly
      return supabaseToken
    }

    const { token } = await response.json()
    return token || supabaseToken
  }

  /**
   * Checkpoint for upload queue
   *
   * Called after successful data upload to track progress.
   */
  async uploadCheckpoint(checkpoint: UploadQueueCheckpoint): Promise<void> {
    // Store checkpoint in Supabase or local storage for recovery
    // This is useful for resuming interrupted uploads

    await supabase.from('powersync_checkpoints').upsert({
      user_id: (await this.getCurrentUserId()),
      checkpoint_data: JSON.stringify(checkpoint),
      updated_at: new Date().toISOString(),
    })
  }

  /**
   * Get the current authenticated user ID
   */
  private async getCurrentUserId(): Promise<string> {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      throw new Error('No authenticated user')
    }

    return session.user.id
  }
}

/**
 * Export a singleton connector instance
 */
export const connector = new Connector()

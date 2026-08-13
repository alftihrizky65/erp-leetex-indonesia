'use client'

import { useState, useEffect } from 'react'
import { getSupabaseClient, testConnection } from '@/lib/supabase-client'

export default function TestSupabasePage() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'failed'>('checking')
  const [message, setMessage] = useState('')

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    setStatus('checking')
    setMessage('Checking Supabase connection...')

    try {
      const client = getSupabaseClient()

      if (!client) {
        setStatus('failed')
        setMessage('Supabase client not created. Check environment variables.')
        return
      }

      const isConnected = await testConnection()

      if (isConnected) {
        setStatus('connected')
        setMessage('Successfully connected to Supabase!')
      } else {
        setStatus('failed')
        setMessage('Connection failed. Supabase may not be running.')
      }
    } catch (error: any) {
      setStatus('failed')
      setMessage(`Error: ${error.message}`)
    }
  }

  const checkTables = async () => {
    const client = getSupabaseClient()
    if (!client) return

    const tables = ['employees', 'sales_orders', 'products', 'suppliers', 'customers']

    for (const table of tables) {
      try {
        const { count, error } = await client
          .from(table)
          .select('*', { count: 'exact', head: true })
        console.log(`${table}: ${count} records`)
      } catch (err) {
        console.error(`${table}: Error - ${(err as any).message}`)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>

        <div className="space-y-4">
          {/* Status */}
          <div className={`p-4 rounded-lg ${
            status === 'checking' ? 'bg-blue-50' :
            status === 'connected' ? 'bg-green-50' :
            'bg-red-50'
          }`}>
            <div className="flex items-center gap-3">
              {status === 'checking' && (
                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              )}
              {status === 'connected' && (
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              )}
              {status === 'failed' && (
                <div className="w-3 h-3 bg-red-500 rounded-full" />
              )}
              <span className={`font-medium ${
                status === 'checking' ? 'text-blue-700' :
                status === 'connected' ? 'text-green-700' :
                'text-red-700'
              }`}>
                {status === 'checking' ? 'Checking...' :
                 status === 'connected' ? 'Connected' :
                 'Failed'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{message}</p>
          </div>

          {/* Environment Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Environment Variables:</p>
            <div className="text-xs space-y-1">
              <p><span className="font-mono">NEXT_PUBLIC_SUPABASE_URL:</span> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Not set'}</p>
              <p><span className="font-monoo">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not set'}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={checkConnection}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Test Connection
            </button>
            <button
              onClick={checkTables}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Check Tables
            </button>
          </div>

          <div className="text-xs text-gray-500 mt-4">
            <p>Open browser console (F12) to see detailed logs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

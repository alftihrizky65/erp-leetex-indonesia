# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ERP system for Leetex Indonesia, a garment/textile manufacturing company. The system is built with Next.js 16 (React 19) and TypeScript, using Tailwind CSS v4 for styling.

## Development Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Next.js 16.2.11** - Using the App Router (`app/` directory)
- **React 19.2.4** - Latest React with concurrent features
- **TypeScript 5** - Strict mode enabled
- **Tailwind CSS v4** - New version using `@tailwindcss/postcss` with `@import "tailwindcss"` syntax
- **ESLint 9** - Flat config format with `next/core-web-vitals` and `next/typescript` presets

### Directory Structure

```
app/                    # Next.js App Router (pages, layouts, server components)
  ├── layout.tsx        # Root layout with Geist font configuration
  ├── page.tsx          # Home page
  └── globals.css       # Tailwind imports and CSS variables
database/schemas/       # Database schema definitions organized by domain
  ├── employees/        # Employee management
  ├── finance/          # Financial records
  ├── inventory/        # Inventory tracking
  ├── machines/         # Machinery/equipment
  ├── payroll/          # Payroll processing
  ├── procurement/      # Procurement and purchasing
  ├── production/       # Production planning
  ├── sales/            # Sales orders and customers
  └── users/            # System users and authentication
```

### Path Aliases

`@/*` is aliased to the project root (configured in `tsconfig.json`). Use this for imports:
```typescript
import { Component } from "@/components/Component";
import { util } from "@/lib/util";
```

### Tailwind CSS v4 Notes

Tailwind v4 uses a new configuration approach:
- CSS uses `@import "tailwindcss"` instead of `@tailwind` directives
- Theme customization uses `@theme inline` in CSS or `postcss.config.mjs`
- No `tailwind.config.js` file by default

## Next.js 16 Considerations

This project uses Next.js 16, which has breaking changes from earlier versions. Key differences:
- React 19 is required (peer dependency)
- Some APIs and conventions have changed—consult `node_modules/next/dist/docs/` before adopting patterns from older Next.js versions
- The AGENTS.md file explicitly warns about version differences

## Database & Sync

### Supabase + PowerSync

The project uses **Supabase** for the backend database and **PowerSync** for local-first, offline-capable data synchronization.

#### Setup Supabase Locally

1. **Install Supabase CLI** (Windows):
   ```bash
   # Using npm
   npm install -g supabase

   # Or download from: https://supabase.com/docs/guides/cli/get-started
   ```

2. **Initialize Supabase**:
   ```bash
   supabase init
   ```

3. **Start Supabase locally**:
   ```bash
   supabase start
   ```
   This will output your local credentials. Update `.env.local` with these values.

4. **Environment Variables** (already configured in `.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
   ```

#### PowerSync Integration

PowerSync provides a local SQLite database that syncs automatically with Supabase:

- **lib/powersync/schema.ts** - Defines local SQLite schema (must match Supabase tables)
- **lib/powersync/database.ts** - PowerSync database instance
- **lib/powersync/connector.ts** - Handles authentication and data upload to Supabase
- **lib/supabase.ts** - Supabase client for direct database access

#### Using PowerSync

```typescript
import { db, initializePowerSync } from '@/lib/powersync'

// Initialize on app startup
await initializePowerSync()

// Query local database (instant response)
const users = await db.getAll('SELECT * FROM users')

// Watch for changes
for await (const result of db.watch('SELECT * FROM inventory')) {
  console.log('Inventory updated:', result.rows)
}
```

#### Important Notes

- PowerSync requires a PowerSync instance (self-hosted or cloud) connected to your Supabase database
- Set `POWERSYNC_ENDPOINT_URL` in `.env.local` to your PowerSync instance URL
- All PowerSync queries run against local SQLite for instant response
- Changes are automatically synced to Supabase in the background

## Current Development Status

The project is in early development with:
- Basic Next.js scaffolding in place
- Database schema folder structure defined (empty `.gitkeep` files)
- Supabase + PowerSync installed and configured
- Default `create-next-app` landing page still active

Next development areas will likely include:
- Supabase database schema design (migrations in `supabase/migrations/`)
- PowerSync sync rules setup
- Authentication system integration
- Domain-specific features for each business area (employees, production, inventory, etc.)

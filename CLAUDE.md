# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ERP system for Leetex Indonesia, a garment/textile manufacturing company. The system is built with Next.js 16 (React 19) and TypeScript, using Tailwind CSS v4 for styling. It implements a **local-first architecture** using PowerSync + Supabase for offline-capable operations.

## Development Commands

```bash
# Start Next.js development server
npm run dev      # http://localhost:3000

# Build and production
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint

# Supabase local development
supabase start        # Start local Supabase (ports: API 54321, DB 54322, Studio 54323)
supabase stop         # Stop local Supabase
supabase status       # Check status
supabase db reset     # Reset database with migrations/seeds
```

## Architecture

### Tech Stack
- **Next.js 16.2.11** - App Router (`app/` directory)
- **React 19.2.4** - Concurrent features
- **TypeScript 5** - Strict mode
- **Tailwind CSS v4** - `@tailwindcss/postcss` with `@import "tailwindcss"` syntax
- **Supabase** - PostgreSQL database, auth, storage
- **PowerSync** - Local SQLite with automatic sync (offline-first)
- **ESLint 9** - Flat config with `next/core-web-vitals` and `next/typescript`

### Directory Structure

```
app/                    # Next.js App Router (pages, layouts, server components)
  ├── layout.tsx        # Root layout with Geist font
  ├── page.tsx          # Home page
  └── globals.css       # Tailwind imports + CSS variables (dark mode support)
lib/                    # Core libraries
  ├── powersync/        # PowerSync local database implementation
  │   ├── schema.ts      # Local SQLite schema (must match Supabase)
  │   ├── database.ts    # PowerSync instance
  │   ├── connector.ts    # Supabase auth + data upload
  │   └── index.ts       # Exports + React hook
  └── supabase.ts       # Supabase client (client + server variants)
database/schemas/       # Database schema definitions by domain
  ├── employees/        # Employee management
  ├── finance/          # Financial records
  ├── inventory/        # Inventory tracking
  ├── machines/         # Machinery/equipment
  ├── payroll/          # Payroll processing
  ├── procurement/      # Procurement and purchasing
  ├── production/       # Production planning
  ├── sales/            # Sales orders and customers
  └── users/            # System users and authentication
supabase/               # Supabase local development config
  ├── config.toml       # Supabase configuration
  ├── migrations/       # Database migrations (create with Supabase CLI)
  └── seed.sql          # Database seed data
env/                    # Environment configuration templates
  ├── .env.example      # Template with placeholder values
  ├── .env.development  # Development environment
  └── .env.production   # Production environment
```

### Path Aliases

`@/*` maps to project root (configured in `tsconfig.json`):
```typescript
import { Component } from "@/components/Component"
import { util } from "@/lib/util"
```

## Local-First Architecture

The system uses PowerSync for local SQLite + automatic Supabase sync:

- **Local reads**: All queries run instantly against local SQLite
- **Offline support**: App works without network
- **Automatic sync**: Changes queued and synced when online
- **Auth**: Supabase sessions with PKCE flow for App Router

### Using PowerSync

```typescript
import { db, initializePowerSync } from '@/lib/powersync'

// Initialize on app startup (in root layout or provider)
await initializePowerSync()

// Query local database (instant)
const users = await db.getAll('SELECT * FROM users')

// Watch for changes
for await (const result of db.watch('SELECT * FROM inventory')) {
  console.log('Inventory updated:', result.rows)
}
```

### PowerSync + Supabase Flow

1. **Authentication**: Supabase auth (stored in session)
2. **PowerSync connects**: Uses Supabase session token
3. **Local changes**: Queued automatically in SQLite
4. **Background sync**: Connector uploads to Supabase when online
5. **Schema alignment**: PowerSync schema (`lib/powersync/schema.ts`) must match Supabase tables

**Important**: Requires PowerSync instance (self-hosted or cloud) connected to Supabase. Set `POWERSYNC_ENDPOINT_URL` in environment.

## Database Architecture

The system plans **25 tables across 8 modules** (see `PRD.md` for full specification):

### Naming Conventions
- **Tables**: `snake_case` plural (e.g., `sales_orders`)
- **Primary keys**: `id` (UUID)
- **Foreign keys**: `{table_singular}_id` (e.g., `user_id`)
- **Audit columns**: `created_at`, `updated_at`, `deleted_at` (soft delete)

### Module Breakdown
1. **Users** (1 table): Authentication & authorization
2. **HR** (4 tables): Employees, shifts, schedules, attendance
3. **Payroll** (1 table): Salary processing
4. **Finance** (1 table): Cash transactions
5. **Inventory** (5 tables): Categories, products, variants, physical/digital stock
6. **Machines** (3 tables): Equipment, maintenance schedules, logs
7. **Sales** (3 tables): Customers, orders, order details
8. **Procurement** (4 tables): Suppliers, POs, goods receipts, COGS
9. **Production** (3 tables): BOM, production stages, work orders

### Creating Database Tables

1. **Supabase migration** (recommended):
   ```bash
   supabase migration new create_users_table
   # Edit generated .sql file in supabase/migrations/
   supabase db reset  # Apply migration to local instance
   ```

2. **PowerSync schema**: Update `lib/powersync/schema.ts` to match

3. **Type generation**: Run Supabase type generator for TypeScript types

## Environment Configuration

The `env/` folder contains environment templates:

- `.env.example` - Template with documentation
- `.env.development` - Local Supabase setup
- `.env.production` - Production configuration

Copy to `.env.local` for local overrides (gitignored):

```bash
cp env/.env.development .env.local
# Update with actual Supabase credentials
```

### Key Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon key (RLS-respecting)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role (bypasses RLS, server-only)
- `DATABASE_URL` - PostgreSQL connection string
- `POWERSYNC_ENDPOINT_URL` - PowerSync instance URL

## Next.js 16 Considerations

**⚠️ Breaking Changes**: This project uses Next.js 16, which has significant differences from earlier versions. **Before writing any code**, read the relevant documentation in `node_modules/next/dist/docs/` to verify APIs and conventions. Heed deprecation notices.

Key differences from earlier versions:
- React 19 is required (peer dependency)
- Some APIs and conventions have changed
- Consult official docs before adopting patterns from older Next.js versions

The `AGENTS.md` file explicitly warns about version differences—always verify against Next.js 16 docs.

## Tailwind CSS v4

New configuration approach (no `tailwind.config.js`):

- CSS uses `@import "tailwindcss"` instead of `@tailwind` directives
- Theme customization via `@theme inline` in CSS or `postcss.config.mjs`
- Dark mode support via CSS variables in `app/globals.css`

## Supabase Client Usage

```typescript
import { supabase } from '@/lib/supabase'  // Client-side (RLS)
import { createSupabaseServerClient } from '@/lib/supabase'  // Server-side

// In Server Components or API routes
const supabase = createSupabaseServerClient()
const { data } = await supabase.from('users').select('*')
```

- **Client**: Uses anon key, respects RLS, for browser/React components
- **Server**: Uses service role, bypasses RLS, for Server Components/API routes
- **Auth**: PKCE flow configured for App Router

## Current Development Status

**Implemented**:
- Next.js 16 + React 19 scaffolding
- Tailwind CSS v4 with dark mode
- Supabase client configuration
- PowerSync integration infrastructure
- Database schema folder structure
- Environment configuration templates

**Not Yet Implemented**:
- Actual database tables (migrations)
- Supabase RLS policies
- PowerSync sync rules
- Authentication flow
- Business logic for modules
- UI components beyond default template

## Common Patterns

### File Organization
- App Router structure (not Pages Router)
- Centralized exports (`lib/*/index.ts`)
- Domain-based schema folders

### Code Style
- TypeScript strict mode
- Path aliases with `@/`
- Tailwind utility classes
- Geist font family (Sans + Mono)

### Development Workflow
- Supabase CLI for local database
- Environment-specific configs in `env/`
- Git-tracked schemas (planned in `database/schemas/`)

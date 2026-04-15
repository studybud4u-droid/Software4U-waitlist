# Software4U Waitlist

Global seller marketplace waitlist built with Next.js, React, and Supabase.

## Features

- ✨ Beautiful, responsive waitlist UI
- 📊 Real-time signup counter
- 🔐 Privacy-first design with Supabase
- 📱 Mobile optimized
- 🚀 Ready to deploy on Vercel

## Quick Start

### Prerequisites

- Node.js 18+
- Supabase account

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Verify `.env.local` has:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://bgeptxqgourvrckoyrqd.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXB0eHFnb3VydnJja295cnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NzM1MjQsImV4cCI6MjA4OTM0OTUyNH0.x7mZzH7d_Wb5LzN8yzl2JE3jFiMd2clSc6xy6aYGO90
   ```

3. Create Supabase table:
   ```sql
   create table waitlist_signups (
     id bigint primary key generated always as identity,
     email varchar(255) unique not null,
     consent_given boolean default true,
     created_at timestamp with time zone default now()
   );
   
   create index idx_email on waitlist_signups(email);
   ```

4. Run:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## Deployment

1. Push to GitHub
2. Deploy on Vercel with environment variables
3. Done!

## Pages

- `/` - Main waitlist
- `/privacy` - Privacy Policy
- `/terms` - Terms of Use

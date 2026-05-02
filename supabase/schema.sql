create table if not exists public.mta_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  offer_no text not null,
  customer text not null,
  project text not null,
  area numeric not null default 0,
  unit_price numeric not null default 0,
  labor_price numeric not null default 0,
  shipping numeric not null default 0,
  vat_rate numeric not null default 0.2,
  total numeric not null default 0,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.mta_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  email text,
  offer_no text,
  message text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.mta_projects enable row level security;
alter table public.mta_leads enable row level security;

create policy "Users can read own projects" on public.mta_projects
  for select using (auth.uid() = user_id or user_id is null);

create policy "Users can insert own projects" on public.mta_projects
  for insert with check (auth.uid() = user_id or user_id is null);

create policy "Anyone can create lead" on public.mta_leads
  for insert with check (true);

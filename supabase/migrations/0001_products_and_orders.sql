-- Products catalog (Ahmad Tea HoReCa)
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text,
  package_size text,
  price_wholesale numeric(10, 2) not null,
  moq integer not null default 1,
  sku text unique,
  created_at timestamptz not null default now()
);

-- Orders placed by HoReCa clients (no auth/session required)
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique,
  client_name text not null,
  client_contact text not null,
  items jsonb not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table products enable row level security;
alter table orders enable row level security;

-- Anyone can browse the catalog
create policy "Public read access to products"
  on products for select
  using (true);

-- Orders are written only via the server (service role key), so no public
-- insert/select policies are created for the orders table.

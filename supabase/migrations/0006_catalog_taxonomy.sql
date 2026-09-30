-- Extra catalog taxonomy for richer segment-specific presentation (e.g. /shop/hotels).
-- All nullable: cards degrade gracefully when a product hasn't been tagged yet.
alter table products add column if not exists tea_category text
  check (tea_category in ('black', 'green', 'herbal', 'white_oolong'));
alter table products add column if not exists caffeine_level smallint
  check (caffeine_level between 0 and 5);
alter table products add column if not exists flavor_tags text[];
alter table products add column if not exists occasion_tags text[];
alter table products add column if not exists units_per_package integer;

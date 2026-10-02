-- English versions of the customer-facing product texts. Empty values fall
-- back to the Lithuanian columns on the English site (see lib/products.ts).
alter table products add column if not exists description_en text;
alter table products add column if not exists flavor_tags_en text[];

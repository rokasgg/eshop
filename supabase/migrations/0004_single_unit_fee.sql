-- Extra fee charged when a client orders a single piece instead of a full box
alter table products add column if not exists single_unit_fee numeric(10, 2) not null default 0.50;

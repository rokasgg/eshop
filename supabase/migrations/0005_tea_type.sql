-- Loose tea vs tea bags
alter table products add column if not exists tea_type text check (tea_type in ('loose', 'bags'));

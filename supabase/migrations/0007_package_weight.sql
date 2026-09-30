-- Net weight (grams) for loose tea, used to derive price-per-cup alongside
-- units_per_package (which covers tea bag/pyramid counts).
alter table products add column if not exists package_weight_grams integer;

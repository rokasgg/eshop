-- Sample Ahmad Tea products — edit values, then run in Supabase SQL Editor.
-- Repeat the insert block (or add more rows to `values`) for every product.

insert into products (name, image_url, package_size, price_wholesale, moq, sku)
values
  ('Ahmad Earl Grey', 'https://example.com/earl-grey.jpg', '100 pakelių x 2g', 4.50, 6, 'AT-EG-100'),
  ('Ahmad English Breakfast', 'https://example.com/english-breakfast.jpg', '100 pakelių x 2g', 4.50, 6, 'AT-EB-100'),
  ('Ahmad Green Tea', 'https://example.com/green-tea.jpg', '100 pakelių x 2g', 4.80, 6, 'AT-GT-100');

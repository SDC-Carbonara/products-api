-- /Library/PostgreSQL/14/scripts/runpsql.sh; exit

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  slogan VARCHAR(200),
  description TEXT,
  category VARCHAR(200),
  default_price TEXT NOT NULL
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  feature VARCHAR(200),
  value VARCHAR(200)
);

CREATE TABLE styles (
  style_id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(200),
  sale_price VARCHAR(200),
  original_price VARCHAR(200),
  default_style BOOLEAN
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  style_id INTEGER REFERENCES styles(style_id),
  url TEXT not null,
  thumbnail_url TEXT not null
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  style_id INTEGER REFERENCES styles(style_id),
  size VARCHAR(200),
  quantity INTEGER
);

CREATE TABLE related_products (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  related_product_id INTEGER NOT NULL
);

COPY products(id, name, slogan, description, category, default_price)
FROM '/Users/andynguyen/Documents/WorkingTerminal/system-design-capstone/Products/CSV/product.csv'
DELIMITER ','
CSV HEADER;

COPY features(id, product_id, feature, value)
FROM '/Users/andynguyen/Documents/WorkingTerminal/system-design-capstone/Products/CSV/features.csv'
DELIMITER ','
CSV HEADER;

COPY styles(style_id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/andynguyen/Documents/WorkingTerminal/system-design-capstone/Products/CSV/styles.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, style_id, url, thumbnail_url)
FROM '/Users/andynguyen/Documents/WorkingTerminal/system-design-capstone/Products/CSV/photos.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id, style_id, size, quantity)
FROM '/Users/andynguyen/Documents/WorkingTerminal/system-design-capstone/Products/CSV/skus.csv'
DELIMITER ','
CSV HEADER;

COPY related_products(id, product_id, related_product_id)
FROM '/Users/andynguyen/Documents/WorkingTerminal/system-design-capstone/Products/CSV/related.csv'
DELIMITER ','
CSV HEADER;


-- performance, throughput, latency, and caching capability, nginx
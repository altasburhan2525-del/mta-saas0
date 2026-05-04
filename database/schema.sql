CREATE TABLE dealers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(190) NOT NULL,
  slug VARCHAR(190) UNIQUE,
  city VARCHAR(100),
  phone VARCHAR(50),
  logo_url VARCHAR(500),
  status ENUM('active','passive','suspended') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  dealer_id BIGINT UNSIGNED NULL,
  name VARCHAR(190) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin','dealer_admin','staff','customer') NOT NULL DEFAULT 'customer',
  status ENUM('active','passive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (dealer_id) REFERENCES dealers(id) ON DELETE SET NULL
);

CREATE TABLE proposals (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  dealer_id BIGINT UNSIGNED NOT NULL,
  customer_name VARCHAR(190) NOT NULL,
  customer_phone VARCHAR(60),
  project_name VARCHAR(190),
  subtotal DECIMAL(14,2) DEFAULT 0,
  vat_rate DECIMAL(5,4) DEFAULT 0.2000,
  vat_total DECIMAL(14,2) DEFAULT 0,
  grand_total DECIMAL(14,2) DEFAULT 0,
  status ENUM('draft','sent','approved','rejected') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (dealer_id) REFERENCES dealers(id) ON DELETE CASCADE
);

CREATE TABLE proposal_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  proposal_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(190) NOT NULL,
  unit VARCHAR(50),
  quantity DECIMAL(14,3) DEFAULT 0,
  unit_price DECIMAL(14,2) DEFAULT 0,
  vat_rate DECIMAL(5,4) DEFAULT 0.2000,
  line_total DECIMAL(14,2) DEFAULT 0,
  FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE
);

CREATE TABLE calculations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  dealer_id BIGINT UNSIGNED NULL,
  user_id BIGINT UNSIGNED NULL,
  payload_json JSON,
  result_json JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE settings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  dealer_id BIGINT UNSIGNED NULL,
  setting_key VARCHAR(190) NOT NULL,
  setting_value TEXT,
  UNIQUE KEY uniq_setting (dealer_id, setting_key)
);

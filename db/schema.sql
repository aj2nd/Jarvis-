-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(32) DEFAULT 'user',
  twofa_secret VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DOCUMENTS
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  filename VARCHAR(255),
  file_url VARCHAR(512),
  doc_type VARCHAR(32),
  status VARCHAR(32) DEFAULT 'uploaded',
  extracted_data JSONB,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP
);

-- TRANSACTIONS
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  document_id INT REFERENCES documents(id) ON DELETE SET NULL,
  type VARCHAR(32),
  description TEXT,
  amount NUMERIC(15,2),
  currency VARCHAR(8) DEFAULT 'AED',
  date DATE,
  vat_amount NUMERIC(15,2),
  vat_rate NUMERIC(5,2),
  category VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ACCOUNTS (Chart of Accounts)
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(64),
  code VARCHAR(16),
  type VARCHAR(32),
  parent_id INT REFERENCES accounts(id) ON DELETE SET NULL
);

-- VAT FILINGS
CREATE TABLE vat_filings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  period_start DATE,
  period_end DATE,
  status VARCHAR(32) DEFAULT 'draft',
  total_sales NUMERIC(15,2),
  total_purchases NUMERIC(15,2),
  vat_due NUMERIC(15,2),
  filing_url VARCHAR(512),
  filed_at TIMESTAMP
);

-- CORPORATE TAX FILINGS
CREATE TABLE corporate_tax_filings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  fiscal_year INT,
  status VARCHAR(32) DEFAULT 'draft',
  taxable_income NUMERIC(15,2),
  tax_due NUMERIC(15,2),
  filing_url VARCHAR(512),
  filed_at TIMESTAMP
);

-- REPORTS
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  report_type VARCHAR(64),
  period_start DATE,
  period_end DATE,
  data JSONB,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BANK ACCOUNTS
CREATE TABLE bank_accounts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  bank_name VARCHAR(128),
  account_number VARCHAR(64),
  currency VARCHAR(8) DEFAULT 'AED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BANK TRANSACTIONS
CREATE TABLE bank_transactions (
  id SERIAL PRIMARY KEY,
  bank_account_id INT REFERENCES bank_accounts(id) ON DELETE SET NULL,
  document_id INT REFERENCES documents(id) ON DELETE SET NULL,
  date DATE,
  description TEXT,
  amount NUMERIC(15,2),
  currency VARCHAR(8) DEFAULT 'AED',
  matched_transaction_id INT REFERENCES transactions(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ADVISORY LOGS
CREATE TABLE advisory_logs (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  question TEXT,
  answer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  type VARCHAR(32),
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ACTIVITY LOGS
CREATE TABLE activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(64),
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

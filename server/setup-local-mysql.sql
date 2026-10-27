CREATE DATABASE IF NOT EXISTS `salama_db`;
USE `salama_db`;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(32) NULL,
  role ENUM('survivor', 'ngo_staff', 'admin', 'volunteer') NOT NULL DEFAULT 'survivor',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS incidents (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  case_ref VARCHAR(32) NOT NULL UNIQUE,
  incident_type ENUM('physical', 'sexual', 'emotional', 'economic', 'other') NOT NULL,
  incident_date DATE NOT NULL,
  county VARCHAR(100) NOT NULL,
  location VARCHAR(255) NULL,
  description TEXT NOT NULL,
  status ENUM('open', 'in_review', 'closed') NOT NULL DEFAULT 'open',
  is_anonymous BOOLEAN NOT NULL DEFAULT TRUE,
  user_id INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX incidents_county_idx (county),
  INDEX incidents_status_idx (status)
);

CREATE TABLE IF NOT EXISTS resources (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM('hotline', 'shelter', 'legal', 'medical', 'mental-health') NOT NULL,
  county VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  contact VARCHAR(100) NOT NULL,
  available VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX resources_county_type_idx (county, type)
);

CREATE TABLE IF NOT EXISTS donations (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  donor_name VARCHAR(255) NULL,
  amount DECIMAL(12, 2) NOT NULL,
  payment_method ENUM('mpesa', 'card', 'bank') NOT NULL,
  transaction_ref VARCHAR(128) NOT NULL,
  message TEXT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  user_id INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX donations_payment_method_idx (payment_method)
);

CREATE TABLE IF NOT EXISTS volunteers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  county VARCHAR(100) NOT NULL,
  role ENUM('counsellor', 'legal', 'awareness', 'shelter', 'digital', 'transport') NOT NULL,
  availability ENUM('weekdays', 'weekends', 'both', 'flexible') NOT NULL,
  experience TEXT NULL,
  motivation TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX volunteers_status_idx (status)
);

DROP DATABASE IF EXISTS medical_center;
CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE hospital (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    DOB TIMESTAMP NOT NULL
);

CREATE TABLE disease (
    id SERIAL PRIMARY KEY,
    disease_name VARCHAR(100) UNIQUE
);

CREATE TABLE doctor_assignments (
    id SERIAL PRIMARY KEY,
    doctor_id INT NOT NULL REFERENCES doctors (id),
    hospital_id INT NOT NULL REFERENCES hospital (id)
);

CREATE TABLE patient_visits (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES patients (id),
    disease_id INT NOT NULL REFERENCES disease (id),
    visit_id INT NOT NULL REFERENCES doctor_assignments (id),
    visit_date TIMESTAMP NOT NULL DEFAULT NOW()
);
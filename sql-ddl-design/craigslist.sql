DROP DATABASE IF EXISTS craigslist;
CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    location VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    region_preference INT REFERENCES region (id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    post_title VARCHAR(50) NOT NULL,
    post_text TEXT,
    post_date TIMESTAMP DEFAULT NOW(),
    category_id INT NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
    region_id INT NOT NULL REFERENCES region (id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO region (location)
VALUES ('California');

INSERT INTO users (username, password, region_preference)
VALUES ('cla', 'password1', 1);

INSERT INTO categories (category)
VALUES ('Memes');

INSERT INTO posts (post_title, post_text, category_id, region_id, user_id)
VALUES ('new post', 'hello this is my first post', 1, 1, 1);
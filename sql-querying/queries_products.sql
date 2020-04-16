-- Comments in SQL Start with dash-dash --

-- Add a product to the table with the name of "chair", price of 44.00 and can_be_returned of false
-- Add a product to the table with the name of "stool", price of 25.99, and can_be_returned of false
-- Add a product to the table witht he name of 'table', price of 124.00, and can_be_returned of false
INSERT INTO products (name, price, can_be_returned)
VALUES ('chair', 44, false),
('stool', 25.99, true),
('table', 124.00, false);

-- Display all the rows and columns in the table
SELECT * FROM products;

-- Display all the names of the products
SELECT name FROM products;

-- Display all the names and prices of the products
SELECT name, price FROM products;

-- Add a new product - make up whatever you like!
INSERT INTO products (name, price, can_be_returned)
VALUES ('sink', 225.00, true);

-- Display only products that can_be_returned
SELECT name, price
FROM products
WHERE can_be_returned = true;

-- There's a sale going on: Everything is $20 off! Update the database accordingly.
UPDATE products
SET price = (price - 20.00)

-- Because of the sale, everything that costs less than $25 has sold out. Remove all products whose price meets this criteria
DELETE FROM products 
WHERE price < 5.00;

-- There is a new company policy: everything is returnable. Update the database accordingly
UPDATE products
SET can_be_returned = true;
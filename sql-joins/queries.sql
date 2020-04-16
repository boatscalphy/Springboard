-- Write your queries here

SELECT *
FROM owners o
FULL OUTER JOIN vehicles v
ON o.id = v.owner_id;

SELECT o.first_name, o.last_name, COUNT(v.owner_id) as count
FROM owners o
JOIN vehicles v
ON o.id = v.owner_id
GROUP BY o.id
ORDER BY count, first_name, last_name ASC;

SELECT o.first_name, o.last_name, ROUND(AVG(v.price)::numeric,2) as average, COUNT(v.owner_id) as count
FROM owners o
JOIN vehicles v
ON o.id = v.owner_id
GROUP BY o.id
HAVING AVG(v.price) > 10000
ORDER BY count, first_name, last_name ASC;

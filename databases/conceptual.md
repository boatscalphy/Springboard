### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?

  PostgresSQL is a relation database management system (RDBMS) that uses a scripted query language (SQL) to read, create, delete, and update data.

- What is the difference between SQL and PostgreSQL?

  The difference between PostgreSQL and SQL is that Postgres is a relational dataabase system whereas SQL is the syntax/ language that users use to communicate with a database system.

- In `psql`, how do you connect to a database?
    
    
  To connect to a database in `psql` use the `\c` command.


- What is the difference between `HAVING` and `WHERE`?

  You can thinkg of `HAVING` as a looser equality check than `WHERE` since having is just searching for an entry that contains your search query whereas `WHERE` is looking for an entry that contains exactly the search query that was provided.

- What is the difference between an `INNER` and `OUTER` join?

  The different between an `INNER` and an `OUTER` join is that with an `INNER` join rows that share the same item within the column will be returned whereas in an `OUTER` join rows that might be empty or `NULL` in a table may be included in the join.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?

  The difference between a `LEFT OUTER` and a `RIGHT OUTER` join is the direction the `OUTER`. A `LEFT OUTER JOIN` will join unmatched rows on the left table in the join whereas a `RIGHT OUTER JOIN` will join unmatched rows on the right table to the join.

- What is an ORM? What do they do?

  An `ORM` stands for `Object relational mapping`. It is uses object orientated programming to create an association between two incompatible systems, which allows developers to create and use the two system together in their projects.

- What are some differences between making HTTP requests using AJAX and from the server side using a library like `requests`?

  Some differences between making HTTP requests using AJAX from the server side is that it allows us to hide our api keys/ tokens. 

- What is CSRF? What is the purpose of the CSRF token?

  `CSRF` stands for cross-site request forgery. It essentially is an attack that allows the attacker to execute unwanted actions on a web application. The CSRF token is a way to combat these attacks by ensuring that the request that is being made to the server is legitimate and is from a webpage serviced by the application.

- What is the purpose of `form.hidden_tag()`?

  The purpose of the `form.hidden_tag()` is to create the CSRF token field for us when we create a form for the client to fill out.
  
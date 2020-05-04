### Conceptual Exercise

Answer the following questions below:

- What is RESTful routing?

- What is a resource?

- When building a JSON API why do you not include routes to render a form that when submitted creates a new user?

    You do not want to include a route to render a form when building a JSON API because the response that will be sent back to the client will not be in a JSON format, but in a text/html format.

- What does idempotent mean? Which HTTP verbs are idempotent?

- What is the difference between PUT and PATCH?

- What is one way encryption?

- What is the purpose of a `salt` when hashing a password?

- What is the purpose of the Bcrypt module?

    The purpose of the Bcrypt module is to allow us to hash and salt our passwords to prevent attackers from easily getting access to user information.

- What is the difference between authorization and authentication?

    Authentication is who you are and authorization is what you are allowed to do
    
- What are some ways to manage the complexities of a large codebase, like Warbler?

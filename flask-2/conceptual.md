### Conceptual Exercise

Answer the following questions below:

- What is RESTful routing?

    RESTful routing is a design pattern that is used to map HTTP verbs to a website's URL that associates some kind of CRUD action.  

- What is a resource?

    A resource is an object with data associated with it that is returned from the API.

- When building a JSON API why do you not include routes to render a form that when submitted creates a new user?

    You do not want to include a route to render a form when building a JSON API because the response that will be sent back to the client will not be in a JSON format, but in a text/html format.

- What does idempotent mean? Which HTTP verbs are idempotent?

    Idempotent means that the same result is achieve if repeated actions are performed. The HTTP verbs that are idempotent are: GET, PUT, PATCH, and DELETE

- What is the difference between PUT and PATCH?

    The difference between PUT and PATCH is that. PUT is use to entirely replace a resource and PATCH is used to make specific updates to the existing resource.

- What is one way encryption?

    One way encryption is an encryption method that encrypts data and the result is entirely different and very difficult to reverse to determine the original peice of data 

- What is the purpose of a `salt` when hashing a password?

    The purpose of `salting` a when hashing a password is to further reduce the odds of encrypted data being stolen as the salt makes it harder for attackers to guess the encrypted data / password even if they know our hashing/ encryption method

- What is the purpose of the Bcrypt module?

    The purpose of the Bcrypt module is to allow us to hash and salt our passwords to prevent attackers from easily getting access to user information.

- What is the difference between authorization and authentication?

    Authentication is who you are and authorization is what you are allowed to do
    
- What are some ways to manage the complexities of a large codebase, like Warbler?

    1. Create modular functions stay DRY
    2. Have multiple files that perform specific tasks
    3. Create Unit Test once a specific function is complete.
    4. Comment code
    5. Have variables that are easy to understand.
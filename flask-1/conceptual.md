### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?
  Errors are much more loosely followed in JavaScript than Python. For example if trying to get an index that is out of range for a list Python will throw an error, but Javascript will return undefined.
  Python functions are defined followed by a colon and are tab separated. Whereas Javascript functions are encompassed by {}s.
  Python comparison operators are just == but Javascript can utilize == and ===.

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you 
  can try to get a missing key (like "c") *without* your programming 
  crashing.

  You can use an if statement to check if the key exists in the dictionary or using the get() method on the dictionary specifying the key you are searching for.

- What is a unit test?
  A unit test is a test that is designed and ran for one specific part of your code

- What is an integration test?
  An integration test is a test that is designed to ensure that multiple components of your code are working together without errors.

- What is the role of web application framework, like Flask?
  The role of a web application framework is to allow developers to quickly build out applications given the structure and constraints that the framework sets for the developer, without needing to develop everything from scratch.

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?
  Picking which would be a better fit for an application depends on what the application is attempting to do. If we are designing a search or filter for the specific food url query parameters may seem to be more fitting. If we are building routes that will provide information on a specific type of food or are more geared toward providing more information on the specific food we can use a URL placeholder.

- How do you collect data from a URL placeholder parameter using Flask?
  Collecting data from a URL placeholder is defined by encompassing the placeholder in between <> and passing that variable between the <> in the function.

- How do you collect data from the query string using Flask?
  To collect data from the URL query string we could use the request object to obtain the url placeholder parameter: request.args['placeholder']

- How do you collect data from the body of the request using Flask?
  request.body

- What is a cookie and what kinds of things are they commonly used for?
  A cookie is a form of storage that allows the client or server to preserve some kind of state within the web application.

- What is the session object in Flask?
  The session object in Flask is Flask's way of storing cookies. 

- What does Flask's `jsonify()` do?
  jsonify() allows flask to return to the client a json response instead of a text/html response, which is very useful when building an API.

- What was the hardest part of this past week for you?
  What was the most interesting?
  The hardest part of this week was remembering all the different methods and structure of templating. I found myself constantly searching up the docs to remember how to do specific tasks. 
  The most interesting part about this week was probably learning and using session in Flask and also jsonify. I did not have much experience with backend development, so I learned a lot about cookies and how the backend actually works from working with sessions and learning about cookies

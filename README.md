# Basic example of JWT security of a Node.js API

Demonstrate the process of adding JWT security to a Node.js API implementation. While there are multiple ways to implement API layer security, JWT is a widely adopted, developer-friendly security implementation in Node.js API projects.

## Setup

```bash
  npm install
  npm run start
```

## Test

#### Next, use Postman, and then create a request to authenticate a test user:

- Create a new POST request for user authentication.
- Set the request’s address to localhost:3000/api/auth/login.
- Update the body to contain this JSON value:

```javascript
{
    "username": "testadmin1",
    "password": "testadmin1_password"
}
```

- Run the request in Postman.
- Save the return JWT information for our next call.

#### Now that we have a JWT for our test user, we’ll create another request to test one of our endpoints and get the available USER records:

- Create a new GET request for user authentication.
- Set the request’s address to localhost:3000/api/users.
- Set the type to Bearer Token with previous api call response.
- Run the request in Postman.
- View the user list.

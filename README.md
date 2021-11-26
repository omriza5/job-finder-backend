# Decription

# REST API

---

## BaseURL: http://localhost/5000

### Create A New User:

- **URL**
  /api/users
- **Method:**
  `POST`
- **URL Params**
  `none`
- **Request Body**
  firstName: String
  lastName:String
  email:String
  password:String
  linkedinUsername:String
  linkedinPassword:String
  facebookUsername:String
  facebookPassword:String

- **Required:**
  `All fields are required`

- **Success Response:**

  - **Code:** 201
  - **Content:** `Json Web Token`
  - Token Payload: { \_id, firstName, lastName, email }

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `User with the given email is already registered`

  OR

  - **Code:** 500 Internal Server Error
    **Content:** `#createUser: Somthing went wrong!`

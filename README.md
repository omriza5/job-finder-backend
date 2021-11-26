# Table Of Content

1. [ Description. ](#desc)
2. [ REST API. ](#restApi)

<a name="desc"></a>

# Decription

<a name="restApi"></a>

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
- **Request Body** <br />
  firstName: String <br />
  lastName:String <br />
  email:String <br />
  password:String <br />
  linkedinUsername:String <br />
  linkedinPassword:String <br />
  facebookUsername:String <br />
  facebookPassword:String <br />

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
  - **Content:** `#createUser: Somthing went wrong!`

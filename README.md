# Table Of Content

1. [ Description. ](#desc)
2. [ REST API. ](#restApi)
3. [ Middlewares. ](#middlewares)

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

### User login:

- **URL**
  /api/auth
- **Method:**
  `POST`
- **URL Params**
  `none`
- **Request Body** <br />
  email:String <br />
  password:String <br />

- **Required:**
  `All fields are required`

- **Success Response:**

  - **Code:** 200
  - **Content:** `Json Web Token`
  - Token Payload: { \_id, firstName, lastName, email }

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `Invalid password.`

  OR

  - **Code:** 404 NOT FOUND
  - **Content:** `User not found, register please`

### Linkedin crawl:

- **URL**
  /api/crawl/linkedin
- **Method:**
  `POST`
- **URL Params**
  `none`
- **Request Body** <br />
  filterOptions:{ datePosted: String, job: String, experienceLevel: String, location:String } <br />
  platform:String <br />
  platformPass:String <br />

- **Required:**
  `All fields are required`

- **Success Response:**

  - **Code:** 200 <br />
  - **Content:** `to be updated`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `Invalid platform password.`

<a name="middlewares"></a>

# Midllewares

### Auth:

adds a user object to request.body if the client sent a valid json web token.<br />
payload:{ \_id, firstName, lastName, email} <br />

### Decrypt By Platform:

determines the wanted platform for crawling using request.body.platform.<br />
validate platform password.<br />
adds to request.body two props:<br />

1. username
2. password

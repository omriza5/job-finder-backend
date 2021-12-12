# Table Of Content

1. [ Description. ](#desc)
2. [Technologies](#tech)
3. [DB Collections](#dbCollections)
4. [Linkedin crawl](#linkedinCrawl)
5. [ REST API. ](#restApi)
6. [ Middlewares. ](#middlewares)

<a name="desc"></a>

# Decription

A web application for finding relevant jobs via Linkedin and Facebook, and keep tracking
the progress of applied jobs.

<a name="tech"></a>

# Technologies

![](https://miro.medium.com/max/3000/1*moL1HY_pEqW0TisE7Vh6gg.png) <br/> -**Front-End**: ReactJS, HTML5, CSS, MaterialUI <br /> -**Back-End**: NodeJS, Express, MongoDB, Puppeteer

![](https://i.ibb.co/XYnV7hM/system-Diag.png)

# DB Collections

<a name="dbCollections"></a>
![](https://i.ibb.co/yQX3j3X/db-Collections.png)

<a name="linkedinCrawl"></a>

# Linkedin Crawl

![](https://i.ibb.co/fCqQ35M/linkedin-crawl.png)

<a name="restApi"></a>

# REST API

---

## BaseURL: https://job-finder-be.herokuapp.com/api

### Create A New User:

- **URL**
  /users
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
  /auth
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
  /crawl/linkedin
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
  - **Content:** `user object with new jobs`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `Invalid platform password.`

### Facebook crawl:

- **URL**
  /crawl/facebook
- **Method:**
  `POST`
- **URL Params**
  `none`
- **Request Body** <br />
  job:string,
  platform:string,
  platformPass:string,
  groupPath:string <br />

- **Required:**
  `All fields are required`

- **Success Response:**

  - **Code:** 200 <br />
  - **Content:** `user object with new posts`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `Invalid platform password.`

### Get Jobs by user id:

- **URL**
  /jobs
- **Method:**
  `GET`
- **URL Params**
  `userid`
- **Request Body**
  `none`

- **Required:**
  `All fields are required`

- **Success Response:**

  - **Code:** 200 <br />
  - **Content:** `array of job objects`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `error object`

### Delete a job:

- **URL**
  /jobs
- **Method:**
  `DELETE`
- **URL Params**
  `none`
- **Request Body** <br />
  jobId:`string`,
  userId:`string` <br />

- **Required:**
  `All fields are required`

- **Success Response:**

  - **Code:** 200 <br />
  - **Content:** `updated user object`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `error object`

### Update job apply date:

- **URL**
  /jobs
- **Method:**
  `PUT`
- **URL Params**
  `none`
- **Request Body** <br />
- jobId:`string`,
  userId:`string`<br />

- **Required:**
  `All fields are required`

- **Success Response:**

  - **Code:** 200 <br />
  - **Content:** `updated user object`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `error object`

### Update job status:

- **URL**
  /jobs/status
- **Method:**
  `PUT`
- **URL Params**
  `none`
- **Request Body** <br />
- jobId:`string`,
  userId:`string`,
  status:`string`<br />

- **Required:**
  `All fields are required`

- **Success Response:**

  - **Code:** 200 <br />
  - **Content:** `updated user object`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `error object`

### Get posts by user id:

- **URL**
  /posts
- **Method:**
  `GET`
- **URL Params**
  `userid`
- **Request Body**
  `none`

- **Required:**
  `All fields are required`

- **Success Response:**

  - **Code:** 200 <br />
  - **Content:** `array of posts objects`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `error object`

### Delete a post:

- **URL**
  /posts
- **Method:**
  `DELETE`
- **URL Params**
  `none`
- **Request Body** <br />
  postId:`string`,
  userId:`string` <br />

- **Required:**
  `All fields are required`

- **Success Response:**

  - **Code:** 200 <br />
  - **Content:** `updated user object`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `error object`
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

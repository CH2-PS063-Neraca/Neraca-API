# Cloud Computing Learning Path

Creating RESTFul APIs and deploying to Google Cloud Platform using Google Cloud Run and Google Cloud Build for communication between Machine Learning Model and Mobile Development. Creating database in Google Compute Engine and using Google Cloud Storage to store images.

#### Cloud Computing Member :
* Dyan Pawestry Sekar Rindayu (C193BSX4247)
* Nizar Fadilah (C301BSY3497)

## Neraca APIs

Neraca is a legal service application to help people fight for their rights in court. This API is deployed on Google Cloud Platform (GCP). In making the RESTful APIs we use [NodeJs](https://nodejs.org/en) with some depedencies which are [Sequelize](https://sequelize.org/), [JSON Web Token(JWT)](https://jwt.io/), and [NodeMailer](https://nodemailer.com/). 

The API consists of four main endpoints that provide different functions:

1. Authentication/Authorization APIs
2. Users APIs
3. Advocat APIs

# Getting Started

1. Clone this repository
```
git clone https://github.com/CH2-PS063-Neraca/Neraca-API.git
```
2. Install Depedencies
```
npm i express bcryptjs body-parser  cookie-parser cookie-session cors dotenv jsonwebtoken mysql2 nodemailer sequelize nodemon googleapis
```

## Authentication/Authorization 
These endpoints allow users to authenticate themselves and obtain authorization to access other endpoints. The API implements token-based authentication using JSON Web Tokens (JWT) to ensure secure communication between the client and server.

#### Base URL

## USER API

Link app : ....

#### Method :
> GET

* Show all users
```
GET ({host})/api/user/users
```

#### Response : 
```
{
  "id": "1",
  "username": "user",
  "email": "user@example.com"
}
```
These endpoints are used to display all users who have registered.

* Show profile users
```
GET ({host})/api/user/profile/:id
```
#### Response :
```
{
  "username": "user",
  "email": "user@example.com",
  "phone": "number",
}
```
These endpoints are used to display the profile of the user.

* Show profile setting
```
GET ({host})/api/user/profile-setting/:id
```
#### Response : 
```
{
  "email": "user-email",
  "phone": "no-user",
  "password": "password-user"
}
```


#### Method :
> POST

* Register User
```
POST ({host})/api/auth/register
```
in the body of the request, copy this code as an example : 
```
{
  "username": "user username",
  "email": "user@example.com",
  "password": "password user",
  "confPassword": "confirm password user"
}
```

#### Response : 
```
{
  "status": "Success",
  "message": "Anda berhasil registrasi"
}
```
These endpoints are used for users to register to our application.

* Login User
```
POST ({host})/api/auth/login
```
in the body of the request, copy this code as an example :
```
{
  "email": "user@example.com",
  "password": "userpassword"
}
```
#### Response : 
```
{
  "status": "Success",
  "message": "Anda berhasil login"
}
```
These endpoints are used for user login into the application.

* Logout User
```
POST ({host})/api/auth/logout
```
#### Response : 
```
{
  "status": "Success",
  "message": "Anda berhasil logout"
}
```
These endpoints are used by users to exit the application


* Update user email
```
POST ({host})/api/user/update-email/:id
```
in the body of the request, copy this code as an example : 
```
{
  "email": "new-email-user"
}
```

#### Response : 
```
{
  "status": "Success",
  "message": "Email berhasil diubah"
}
```

* Update user phone number
```
POST ({host})/api/user/update-phone/:id
```
In the body of the request, copy this code as an example :
```
{
  "phone": "new number phone user"
}
```

#### Response :
```
{
  "status": "Success",
  "message": "Phone berhasil diubah"
}
```

* Update user password
```
POST ({host})/api/user/update-password
```
In the body of the request, copy this code as an example :
```
{
  "currentPassword": "123",
  "newPassword": "321",
  "confPassword": "321"
}
```
#### Response :
```
{
  "status": "Success",
  "message": "Password berhasil diubah"
}
```

* Forgot password user
```
POST ({host})/api/user/forgot-password
```
In the body of the request, copy this code as an example :
```
{
  "email": "useremail@example.com"
}
```

## ADVOCAT API 


#### Method :
> GET

* Show advocat
```
GET ({host})/api/advocat/get-advocat
```
#### Response : 
```
None
```


#### Method :
> POST

* Register advocat
```
POST ({host})/api/advocat/register
```
#### Response : 
```
None
```

* Advocat login
```
POST ({host})/api/advocat/login
```
#### Response : 
```
None
```

* Advocat logout
```
POST ({host})/api/advocat/logout
```
#### Response :
```
None
```

* Update password advocat
```
POST ({host})/api/advocat/update-password
```
#### Response : 
```
None
```

* Forgot password advocat
```
POST ({host})/api/advocat/forgot-password
```
#### Response : 
```
None
```


#### Method : 
> DELETE

* Delete advocat user
```
DELETE ({host})/api/advocat/delete
```
#### Response : 
```
None
```


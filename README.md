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

Link app : ....

#### Method :
> GET

* Show all users
```
GET ({host})/api/auth/users
```

#### Response : 
```
None
```

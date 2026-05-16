## *University Bus Tracker API*
## *ICA - 03 | Web Services and Server Technology (IT2234)*

## **Problem Description**

Students at the University of Vavuniya who want to travel back towards Vavuniya town after lectures have no reliable way to know which buses - including services from Mannar, Poovarasankulam, Cheddikulam, Veerapuram and Suntharapuram - will pass through the University stop and at what times. In the morning, students waiting at stops along the Vavuniya town route also have no way to know when the next bus will pass their stop, causing missed lectures and unnecessary waiting.

## **Proposed Solution**

A RESTful backend API that allows administrators to manage bus routes, buses, and schedules with real stop-by-stop timings. Students can query available buses by direction and see exactly what time each bus passes every stop. The system is secured with JWT authentication so only authorized administrators can modify data.

## **Features**

- Track buses going **to university** (morning) and **from university** (evening)
- View stop-by-stop arrival times for every bus
- Filter schedules by direction (toUniversity / fromUniversity)
- Update bus status in real time (on-time / delayed / cancelled)
- Full CRUD on routes, buses, and schedules
- Pre-seeded with real Vavuniya-Mannar route data
- **JWT Authentication** - POST, PUT, DELETE endpoints are protected
- **Secret Code Registration** - only authorized personnel can register as admin using a secret admin code
- **Admin Control Panel** - full CRUD operations directly from the browser UI
- **Token expires after 24 hours**  for security

## **Technologies Used**

|     Layer       |    Technology      |
----------------------------------------
| Runtime         | Node.js            |
| Framework       | Express.js         |
| Database        | MongoDB (Mongoose) |
| Authentication  | JWT + bcryptjs     |
| API Testing     | Postman            |
| Version Control | GitHub             |
| Frontend        | React.js (Vite)    |

## **Project Structure**

university-bus-tracker/
|
|--client/
|  |--src/
|  |  |--components/
|  |  |  |--Navbar.jsx
|  |  |--pages/
|  |  |  |--Home.jsx
|  |  |  |--MorningBuses.jsx
|  |  |  |--EveningBuses.jsx
|  |  |  |--AdminPanel.jsx
|  |  |  |--Login.jsx
|  |  |  |--Register.jsx
|  |  |--App.jsx
|  |  |--index.css
|  |--index.html
|  |--package.json
|
|--controllers/
|  |--authController.js
|  |--routeController.js
|  |--busController.js
|  |--scheduleController.js
|
|--middleware/
|  |--auth.js
|
|--models/
|  |--User.js
|  |--Route.js
|  |--Bus.js
|  |--Schedule.js
|
|--routes/
|  |--authRoutes.js
|  |--routeRoutes.js
|  |--busRoutes.js
|  |--scheduleRoutes.js
|
|--seed.js
|--.env.example
|--.gitignore
|--package.json
|--server.js

## **Setup Instructions** - *Backend*

1. Clone the repository

        git clone https://github.com/aarabyselvaratnam/university-bus-api.git
        cd university-bus-tracker

2. Install dependencies

        npm install

3. Configure environment variables

    Create a new file called .env and add:

        PORT=5000
        MONGO_URI=mongodb://localhost:27017/universityBusDB
        JWT_SECRET=universitybustracker2026secret
        ADMIN_CODE=UOVADMIN2026

4. Start MongoDB

        mongod

5. Seed the database with real bus data

        node seed.js

6. Run the server

        npm run dev

    Server runs at: http://localhost:5000

## **Setup Instructions** - *Frontend*

1. Open a new terminal and navigate to the client folder

        cd client

2. Install frontend dependencies

        npm install

3. Start the React development server

        npm run dev

4. Open browser and go to

        http://localhost:5173

## **Pages Available**

| Page          | URL       | Description                                        |
|---------------------------------------------------------------------------------
| Home          | /         | Landing page with direction buttons                |
| Morning Buses | /morning  | Buses from Vavuniya to University with stop times  |
| Evening Buses | /evening  | Mannar side buses to Vavuniya town                 |
| Admin Login   | /login    | JWT protected admin login                          |
| Admin Panel   | /admin    | Full CRUD control panel (redirects to login)       |
| Register      | /register | Register new admin with secret admin code          |

## **Authentication & Security**

This system uses JWT (JSON Web Token) authentication:

- **GET endpoints** are public - students can view bus schedules without login
- **POST, PUT, DELETE endpoints** are protected - require a valid JWT token
- **Admin login** at /login generates a JWT token stored in localStorage
- **New admin registration** at /register requires a secret admin code
- **Token expires** after 24 hours - admin must login again after expiry
- **Passwords** are hashed using bcryptjs before storing in the database

## **API Endpoints**

### Authentication : /api/auth

| Method | Endpoint            | Description             | Protected  |
-----------------------------------------------------------------------
| POST   | /api/auth/register  | Register new admin      | No         |
| POST   | /api/auth/login     | Login and get JWT token | No         |

### Routes : /api/routes

| Method | Endpoint        | Description      | Protected |
-----------------------------------------------------------
| GET    | /api/routes     | Get all routes   | No        |
| GET    | /api/routes/:id | Get single route | No        |
| POST   | /api/routes     | Create a route   | Yes       |
| PUT    | /api/routes/:id | Update a route   | Yes       |
| DELETE | /api/routes/:id | Delete a route   | Yes       |

### Buses : /api/buses

| Method | Endpoint       | Description    | Protected |
--------------------------------------------------------
| GET    | /api/buses     | Get all buses  | No        |
| GET    | /api/buses/:id | Get single bus | No        |
| POST   | /api/buses     | Create a bus   | Yes       |
| PUT    | /api/buses/:id | Update a bus   | Yes       |
| DELETE | /api/buses/:id | Delete a bus   | Yes       |

### Schedules : /api/schedules

| Method | Endpoint                                | Description               | Protected |
|-------------------------------------------------------------------------------------------
| GET    | /api/schedules                          | Get all schedules         | No        |
| GET    | /api/schedules?direction=toUniversity   | Buses going to university | No        |
| GET    | /api/schedules?direction=fromUniversity | Buses going to town       | No        |
| GET    | /api/schedules/:id                      | Get single schedule       | No        |
| POST   | /api/schedules                          | Create a schedule         | Yes       |
| PUT    | /api/schedules/:id                      | Update a schedule         | Yes       |
| DELETE | /api/schedules/:id                      | Delete a schedule         | Yes       |

## **Sample Request Bodies**

### Register Admin (POST /api/auth/register)
*json*
{
  "username": "admin",
  "password": "admin123",
  "adminCode": "your_secret_admin_code_here"
}

### Login (POST /api/auth/login)
*json*
{
  "username": "admin",
  "password": "admin123"
}

### *Using JWT Token in Postman*
Add this to Headers tab:
Authorization: Bearer <your_token_here>

### Create a Bus (POST /api/buses) - requires token
*json*
{
  "busName": "Vavuniya - Mannar (7:30)",
  "origin": "Vavuniya",
  "destination": "Mannar",
  "type": "government",
  "route": "<route_id>"
}

### Mark a Bus as Delayed (PUT /api/schedules/:id) - requires token
*json*
{
  "status": "delayed",
  "remarks": "Delayed by 15 minutes due to road work near Nelukkulam"
}

## **Routes Covered** : *Sample data*

**Morning Route (Vavuniya → University):**
Vavuniya New Bus Stand → Kurumankadu → Paddanichoor → Veppankulam → Nelukkulam → Pampaimadu Junction → University of Vavuniya

**Evening Route (Mannar Side → University → Vavuniya):**
Mannar → Chekkadipu lavu → Poovarasankulam → Salambaikulam → University of Vavuniya → Pampaimadu Junction → Nelukkulam → Veppankulam → Paddanichoor → Kurumankadu → Vavuniya New Bus Stand

## **How to Run with Postman**

1. Start MongoDB: `mongod`
2. Start the server: `npm run dev`
3. Seed the database: `node seed.js`
4. Open Postman → Open "University Bus Tracker" collection
5. POST /api/auth/login to get your JWT token
6. Copy the token and add to Authorization header for protected requests
7. Test `GET /api/schedules?direction=toUniversity` to see all morning buses
8. Test `GET /api/schedules?direction=fromUniversity` to see all evening buses

## **Security Design**

| Feature              | Implementation        |
------------------------------------------------
| Password Hashing     | bcryptjs (salt: 10)   |
| Token Generation     | jsonwebtoken          |
| Token Expiry         | 24 hours (1d)         |
| Protected Routes     | JWT middleware        |
| Admin Registration   | Secret code required  |
| Token Storage        | localStorage          |

*Student Details:*

| Name       | Aaraby Selvaratnam                          |

| Reg No     | 2022/ICT/128                                |
| University | University of Vavuniya - Sri Lanka          |
| Department | Physical Science                            |
| Module     | Web Services and Server Technology (IT2234) |
| Year       | 2nd Year 2nd Semester                       |
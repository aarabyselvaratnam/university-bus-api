## *University Bus Tracker API*
## *ICA - 03 | Web Services and Server Technology (IT2234)*

##  **Problem Description**

Students at the University of Vavuniya who want to travel back towards Vavuniya town after lectures have no reliable way to know which buses - including services from Mannar, Poovarasankulam, Cheddikulam, Veerapuram and Suntharapuram - will pass through the University stop and at what times. In the morning, students waiting at stops along the Vavuniya town route also have no way to know when the next bus will pass their stop, causing missed lectures and unnecessary waiting.

## **Proposed Solution**

A RESTful backend API that allows administrators to mange bus routes, buses, and schedules with real stop by stop timings. Students can query available buses by direction and see exactly what time each bus passes every stop.

 ##  **Features**

- Track buses going **to university** (morning) and **from university** (evening)
- View stop by stop arrival times for every bus
- Filter schedules by direction (toUniversity / fromUniversity)
- Update bus status in real time(on-time / delayed / cancelled)
- Full CRUD on routes, buses, and schedules
- Pre - seeded with real Vavuniya-Mannar route data

## **Technologies Used**
__________________________________________
|   Runtime             |   Node.js      |
|   Framework           |   Express.js   |
|   Database            |   MongoDB      |
|   API Testing         |   Postman      |
|   Version Control     |   GitHub       |
|   Frontend            |   React.js     |


##  **Project Structure**

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
|  |  |--App.jsx
|  |  |--index.css
|  |--index.html
|  |--package.json
|
|--controllers/
|  |--routeController.js
|  |--busController.js
|  |--scheduleController.js
|
|--models/
|  |--Route.js
|  |--Bus.js
|  |--Schedule.js
|
|--routes/
|  |--routeRoutes.js
|  |--busRoutes.js
|  |--scheduleRoutes.js
|
|--seed.js
|--.env.example
|--.gitignore
|--package.json
|--server.js

## **Setup Instructions** - *packages and backend*

1. Clone the repository

    git clone https://github.com/aarabyselvaratnam/university-bus-api.git

    cd university-bus-tracker

2. Install dependencies

    npm install

3. Configure environment varibales

*copy .env.example .env*
**Create a new file called .env and copy the contents from .env.example into it**

*Edit `.env`:*
**After copying it to .env, you open .env and replace your_mongodb_connection_string_here with your actual MongoDB connection string**

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/universityBusDB

4. Seed the database with real bus data

    node seed.js

5. Run the server

    npm run dev
    **Server runs at: `http://localhost:5000`**


**Setup Instructions** - *Front End*

1. Open a new terminal and navigate to the client folder

    cd client

2. Install frontend dependencies

    npm install

3. Start the React development server

    npm run dev

4. Open browser and go to

    http://localhost:5173
    
    *Pages Available*

    | Home           | /        | Landing page with directions Button   |
    | Morning buses  | /morning | Buses from Vavuniya to University     |
    | Evening  buses | /evening | Mannar side buses to Vavuniya         |
    | Admin Panel    | /admin   | Update Bus Status(Password Protected) |

  

## **API Endpoints**

    ### Routes : /api/routes

    | GET    | /api/routes     | Get all routes   |
    | GET    | /api/routes/:id | Get single route |
    | POST   | /api/routes     | Create a route   |
    | PUT    | /api/routes/:id | Update a route   |
    | DELETE | /api/routes/:id | Delete a route   |

    ### Buses : /api/buses

    | GET    | /api/buses     | Get all buses   |
    | GET    | /api/buses/:id | Get single bus  |
    | POST   | /api/buses     | Create a bus    |
    | PUT    | /api/buses/:id | Update a bus    |
    | DELETE | /api/buses/:id | Delete a bus    |

    ### Schedules : /api/schedules

    | GET    | /api/schedules                             | Get all schedules         |
    | GET    | /api/schedules?direction=toUniversity      | Buses going to University |
    | GET    | /api/schedules?direction=fromUniversity    | Buses going to Town       |
    | GET    | /api/schedules/:id                         | Get single schedule       |
    | POST   | /api/schedules                             | Create a schedule         |
    | PUT    | /api/schedules/:id                         | Update a schedule         |
    | DELETE | /api/schedules/:id                         | Delete a schedule         |

 ## **Sample API Requests**

1)   //Create a Route (POST /api/routes)

{
  "routeName": "Vavuniya Town to University",
  "direction": "toUniversity",
  "stops": [
    "Vavuniya New Bus Stand",
    "Kurumankadu",
    "Paddanichoor",
    "Veppankulam",
    "Nelukkulam",
    "Pampaimadu Junction",
    "University of Vavuniya"
  ],
  "description": "Morning route from Vavuniya town to university"
}


2) //Create a Schedule (POST /api/schedules)

{
  "bus": "<bus_id>",
  "departureTime": "07:30",
  "stopTimes": [
    { "stop": "Vavuniya New Bus Stand", "time": "07:30" },
    { "stop": "Kurumankadu", "time": "07:40" },
    { "stop": "Veppankulam", "time": "07:50" },
    { "stop": "Nelukkulam", "time": "07:55" },
    { "stop": "Pampaimadu Junction", "time": "08:05" },
    { "stop": "University of Vavuniya", "time": "08:10" }
  ],
  "daysOperating": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "status": "on-time",
  "remarks": "Government bus via Mannar route"
}


3) Mark a Bus as Delayed (PUT /api/schedules/:id)

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
4. Open Postman → New Collection → "University Bus Tracker"
5. Test `GET /api/schedules?direction=toUniversity` to see all morning buses
6. Test `GET /api/schedules?direction=fromUniversity` to see all evening buses
7. Export collection as JSON for submission


*Student Details:*

| Name       | Aaraby Selvaratnam                          |
| Reg No     | 2022/ICT/128                                |
| University | University of Vavuniya - Sri Lanka          |
| Department | Physical Science                            |
| Module     | Web Services and Server Technology (IT2234) |
| Year       | 2nd Year 2nd Semester                       |
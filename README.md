# tractrac-test
# Clone the repository
The project files are in the master branch, 
run git clone <repository-url>
# Install dependencies
cd <project-folder>
npm install
# Configure environment variables:
There is no need for any enviromental variable configuration because this is a test project. I included the .env files
# Start the development server
run npm start to start the backend
run npm run dev to start the frontend
note: the backend most be started before the frontend functionality works.
# Folder Structure
├── client/             # Frontend codebase (React.js)
├── server/             # Backend codebase (Node.js, Express.js)
├── test/               # test code for the endpoints
├── .env                # Environment variables
└── README.md           # Project documentation
# Technologies Used
MongoDB: A NoSQL database used for data storage.
Express.js: A backend framework for building RESTful APIs.
React.js: A JavaScript library for building user interfaces.
Node.js: A JavaScript runtime for executing server-side code.
JSON Web Token (JWT): Used for authentication and authorization.
Bcrypt: A library for hashing and encrypting user passwords.
cookie-parser: it used to parse cookie request
Jest: provide testing functions
supertest: provides server testing functions
Mongoose: connects express to the database
# Features
User registration: Allows users to create a new account with a unique username and password.
User login: Authenticates users and generates a JWT for accessing protected routes.
Protected routes: Only accessible to authenticated users with a valid JWT.
Error handling: Provides informative error messages for various scenarios (e.g., invalid credentials, duplicate usernames).
# API Endpoints
POST /api/v1/auth/register: Register a new user.
POST /api/v1/auth/login: Log in an existing user and retrieve a JWT.
POST /api/v1/auth/logout: Logout an existing user and clear thier cookies.
GET /api/v1/auth/protected-route: Access a protected route (requires authentication).
# Test
We used jest and supertest to test the servers 
==> In order to run the test you have to fill up the empty string with the appropriate value to simulate a real endpoint
# Contributing
Contributions are welcome! If you encounter any bugs or have suggestions for improvement, please open an issue or submit a pull request.

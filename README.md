# tractrac-test
# Clone the repository
The project files are in the master branch 
git clone <repository-url>
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
├── .env                # Environment variables
└── README.md           # Project documentation
# Technologies Used
MongoDB: A NoSQL database used for data storage.
Express.js: A backend framework for building RESTful APIs.
React.js: A JavaScript library for building user interfaces.
Node.js: A JavaScript runtime for executing server-side code.
JSON Web Token (JWT): Used for authentication and authorization.
Bcrypt: A library for hashing and encrypting user passwords.
cookie-parser
# Features
User registration: Allows users to create a new account with a unique username and password.
User login: Authenticates users and generates a JWT for accessing protected routes.
Protected routes: Only accessible to authenticated users with a valid JWT.
Error handling: Provides informative error messages for various scenarios (e.g., invalid credentials, duplicate usernames).
# API Endpoints
POST /api/register: Register a new user.
POST /api/login: Log in an existing user and retrieve a JWT.
GET /api/protected-route: Access a protected route (requires authentication).
# Contributing
Contributions are welcome! If you encounter any bugs or have suggestions for improvement, please open an issue or submit a pull request.

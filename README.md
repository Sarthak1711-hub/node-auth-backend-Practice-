Authentication Backend (Node.js + Express)
A secure authentication backend built with Node.js, Express, and MongoDB, implementing modern best practices such as hashed passwords, JWT-based authentication, and HTTP-only cookies.
This project focuses on backend fundamentals, clean separation of concerns, and real-world authentication flow rather than frontend complexity.

🚀 Features
•	User signs up with password hashing (bcrypt)

•	User logs in with credential verification.

•	JWT-based authentication

•	Secure, HTTP-only cookie storage

•	Logout functionality (token invalidation via cookie clearing)

•	Protected routes using authentication middleware

•	Environment-based configuration

•	Clean controller–route–middleware separation

🔐 Authentication Flow

Signup
•	User submits the signup form.

•	Password is hashed using bcrypt

•	User data is stored in MongoDB.

•	JWT is generated and sent as an HTTP-only cookie

Login
•	User submits email and password.

•	The stored hashed password is retrieved explicitly.

•	bcrypt compares the plain password with the stored hash

•	On success, a new JWT is issued and stored in a cookie.

Protected Routes
•	JWT is read from cookies

•	The token is verified using a secret key.

•	User identity is attached to the request.

•	Access is granted or denied accordingly.

Logout
•	The authentication cookie is cleared.

•	User is logged out

🛡️ Security Practices Used

•	Passwords are never stored in plain text.

•	The password field is excluded from queries by default.

•	JWT secret is stored in environment variables

•	Cookies are marked as httpOnly and sameSite

•	Authentication logic is isolated in middleware.

•	No sensitive information is committed to version control.

⚙️ Environment Variables

Create a .env file in the root directory with the following values:

PORT=3000
JWT_SECRET=your_secret_key
MONGO_URI=mongodb://localhost:27017/your_database_name

🧪 Running the Project Locally

npm install
npm start

The server will start on the port defined in the environment variables.

🧠 Design Philosophy
•	Controllers handle business logic.

•	Routes define API endpoints.

•	Middleware handles cross-cutting concerns like authentication.

•	Models define database structure.

•	Authentication is treated as a backend concern, not a UI feature.

This approach mirrors how production Node.js backends are structured.
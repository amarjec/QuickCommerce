# QuickCommerce: A Modern E-Commerce Platform

QuickCommerce is a full-stack e-commerce application designed to provide a seamless shopping experience. It features user authentication, a dynamic shopping cart, and a secure checkout process. The project is built with a modern technology stack, ensuring a responsive and efficient application.

# ✨ Features
Product Management: Browse a wide range of products, view details, and filter by categories.

Shopping Cart: Add and remove items, adjust quantities, and manage your cart in real time.

User Authentication: Secure user registration and login functionality.

Address Management: Users can save and manage multiple delivery addresses.

Order Placement: A streamlined checkout process, currently supporting Cash On Delivery (COD).

Order History: Users can view and track their past orders.

Responsive Design: The application is optimized for both desktop and mobile devices.

# 💻 Technologies Used
# Frontend

React: A JavaScript library for building user interfaces.

React Hooks: For managing state and side effects in functional components.

React Router: For client-side routing.

Tailwind CSS: A utility-first CSS framework for rapid styling.

Axios: For making HTTP requests to the backend.

# Backend

Node.js: A JavaScript runtime for server-side development.

Express.js: A fast, unopinionated, minimalist web framework for Node.js.

MongoDB: A NoSQL, document-based database.

Mongoose: An elegant MongoDB object modeling for Node.js.

bcryptjs: For password hashing and security.

jsonwebtoken: For creating and verifying JSON Web Tokens for user authentication.

🚀 Getting Started
Prerequisites

Node.js (v14.x or later)

npm (v6.x or later)

A MongoDB instance (local or hosted)

Installation

Clone the repository:

git clone https://github.com/amarjec/QuickCommerce

cd QuickCommerce

Install dependencies for both the client and the server:

# From the project root
cd server
npm install
cd ../client
npm install

Create a .env file in the server directory and add your environment variables:

MONGO_URI=<Your_MongoDB_Connection_String>

JWT_SECRET=<A_Secret_Key_For_JWT>

NODE_ENV = ""

# ADMIN
SELLER_EMAIL = ""

SELLER_PASSWORD = ""

# CLOUDINARY
CLOUDINARY_CLOUD_NAME = ""

CLOUDINARY_API_KEY = ""

CLOUDINARY_API_SECRET = ""

Create a .env file in the client directory for frontend environment variables.

VITE_BACKEND_URL = ""

CURRENCY = ""

Running the Application

Start the backend server:

cd server
npm start

The server will run on http://localhost:4000.

Start the frontend application:

cd client
npm start

The React application will open in your browser, typically at http://localhost:3000.

🌐 API Endpoints
Here are some of the key API endpoints handled by the server:

POST /api/auth/register: Register a new user.

POST /api/auth/login: Authenticate a user and receive a JWT.

GET /api/product/all: Fetch a list of all products.

POST /api/order/cod: Place an order using the Cash On Delivery method.

GET /api/order/user: Retrieve all orders for the authenticated user.

POST /api/address/add: Add a new address for the user.

GET /api/address/get: Get all saved addresses for the user.


📝 License
This project is licensed under the MIT License.


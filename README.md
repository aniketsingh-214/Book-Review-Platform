Book Review Platform
This is a full-stack web application for a Book Review Platform, built with Node.js, Express, MongoDB, and React. Users can sign up, log in, add books, and post reviews and ratings for them.

Features
User Authentication: Secure signup and login using JSON Web Tokens (JWT).

Book Management: Authenticated users can add new books to the platform.

Book Listings: View all books with pagination.

Filtering: Filter books by author or genre.

Reviews & Ratings: Authenticated users can write a text review and give a star rating (1-5) to any book.

Average Rating: Each book displays its calculated average rating on both the list and detail pages.

Setup and Installation
To get this project running locally, you will need Node.js, npm, and MongoDB installed on your machine.

1. Clone the Repository
git clone <your-repository-url>
cd book-review-platform

2. Backend Setup
The backend server connects to the database and serves the REST API.

# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the /backend directory
# and add the following environment variables:

backend/.env file:

# Server Port
PORT=5000

# Your MongoDB Connection URI
MONGO_URI=mongodb://localhost:27017/book-review-platform

# A long, random, and secret string for JWT
JWT_SECRET=your_very_secret_key_that_is_long_and_random
```bash
# Start the backend development server
npm run dev

The backend API will now be running on http://localhost:5000.

3. Frontend Setup
The frontend is a React single-page application.

# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev

The React application will now be running on http://localhost:5173 (or another port if 5173 is busy) and will connect to the backend API.

Architecture Decisions
This project is structured as a monorepo with a clear separation between the backend and frontend concerns.

Backend
Framework: Node.js with Express.js was chosen for its speed, simplicity, and vast ecosystem, making it a standard choice for building robust REST APIs.

Database: MongoDB (a NoSQL database) was selected for its flexible, document-based data model which maps naturally to JavaScript objects. Mongoose is used as the Object Data Modeling (ODM) library to provide schema validation, model relationships, and business logic hooks.

Authentication: JSON Web Tokens (JWT) are used for managing user sessions. This is a stateless authentication mechanism where the server signs a token for the user, who then sends it with every protected request. This approach is scalable and standard for modern APIs.

Structure: The backend code is organized by feature (routes, controllers, models) to maintain a clean and scalable architecture. A dedicated middleware is used for protecting routes.

Frontend
Framework: React was used for building the user interface due to its component-based architecture, which promotes reusability and maintainability. React Hooks are used exclusively for state management and side effects, following modern React best practices.

Development Environment: Vite was chosen over Create React App for its significantly faster development server startup and Hot Module Replacement (HMR).

Styling: Tailwind CSS was selected as the styling solution. It's a utility-first CSS framework that allows for rapid UI development directly within the JSX, ensuring consistency and reducing the need for custom CSS files.

State Management: For global state (specifically user authentication), React's Context API was used. It is a lightweight, built-in solution that is perfectly suited for this application's scale, avoiding the overhead of a larger library like Redux.

API Communication: Axios is used for making HTTP requests to the backend. An Axios instance is configured with a request interceptor to automatically attach the JWT to the headers of protected API calls.

Known Limitations
No Real-time Updates: The application does not use WebSockets. If a new review is added for a book, other users viewing that page will need to refresh to see it.

Basic Error Handling: The UI provides basic error messages for form submissions, but a more sophisticated system (like toast notifications) could improve the user experience.

Limited Sorting: The book list can be filtered, but there is no functionality to sort the books by criteria like average rating or date added.

No Review Editing/Deletion: Once a user submits a review, they cannot edit or delete it.

No Password Management: There is no "Forgot Password" feature for users to reset their credentials.

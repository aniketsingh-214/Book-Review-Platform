# 📚 Book Review Platform

A full-stack web application for book lovers to share and discover book reviews. Built using **Node.js**, **Express**, **MongoDB**, and **React**, the platform supports secure user authentication, book management, and interactive review functionality.

---

## ✨ Features

- 🔐 **User Authentication**: Secure signup and login using JSON Web Tokens (JWT).
- 📖 **Book Management**: Authenticated users can add books to the platform.
- 📚 **Book Listings**: View all books with pagination.
- 🔎 **Filtering**: Filter books by **author** or **genre**.
- ✍️ **Reviews & Ratings**: Authenticated users can post reviews and give star ratings (1–5).
- ⭐ **Average Rating**: Each book displays its average user rating on the listing and detail pages.

---

## 🛠️ Setup and Installation

> Prerequisites: Ensure you have **Node.js**, **npm**, and **MongoDB** installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-review-platform.git
cd book-review-platform
````

---

### 2. Backend Setup

The backend connects to MongoDB and serves the REST API.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following:

```env
# Server Port
PORT=5000

# MongoDB URI
MONGO_URI=mongodb://localhost:27017/book-review-platform

# JWT Secret Key
JWT_SECRET=your_very_secret_key_that_is_long_and_random
```

Then start the server:

```bash
npm run dev
```

The backend API runs at: `http://localhost:5000`

---

### 3. Frontend Setup

The frontend is a React app powered by Vite.

```bash
cd ../frontend
npm install
npm run dev
```

The frontend app runs at: `http://localhost:5173` (or a different port if 5173 is in use)

---

## 🧱 Architecture Decisions

### 🔧 Backend

* **Framework**: Node.js with Express — chosen for its simplicity and rich ecosystem.
* **Database**: MongoDB + Mongoose — schema-based modeling and natural JSON structure.
* **Authentication**: JWT — stateless and scalable token-based authentication.
* **Structure**: Organized by feature (`routes/`, `controllers/`, `models/`, `middleware/`).

### 🎨 Frontend

* **Framework**: React — modular UI with component reusability.
* **Bundler**: Vite — fast dev environment and hot module replacement (HMR).
* **Styling**: Tailwind CSS — utility-first styling in JSX.
* **State Management**: React Context API — for lightweight global auth state.
* **API Handling**: Axios — with interceptors to attach JWT in headers.

---

## ⚠️ Known Limitations

* 🔄 **No Real-time Updates**: Users need to refresh to see new reviews.
* 🚫 **No Review Editing/Deletion**: Reviews cannot be modified or removed after posting.
* 📉 **No Sorting Options**: Users can filter books but cannot sort them.
* ❗ **Basic Error Handling**: Form errors are shown, but no advanced notifications (e.g., toasts).
* 🔐 **No Password Recovery**: Lacks a "Forgot Password" or reset mechanism.

---

## 💡 Future Improvements

* Add **review edit/delete** options.
* Introduce **sorting** (by rating, date, etc.).
* Add **WebSocket** support for real-time updates.
* Improve UI/UX with toast notifications and animations.
* Implement **password reset** via email.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ by **Aniket Singh**
GitHub: [@aniketsingh-214](https://github.com/aniketsingh-214)



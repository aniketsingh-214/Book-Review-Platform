import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookDetailPage from './pages/BookDetailPage';
import AddBookPage from './pages/AddBookPage';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen font-sans">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            {/* Private Routes */}
            <Route path="/add-book" element={
              <PrivateRoute>
                <AddBookPage />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
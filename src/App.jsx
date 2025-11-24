import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import CareerPage from './pages/CareerPage';
import BlogsPage from './pages/BlogsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Landing page route */}
          <Route exact path="/" element={<LandingPage />} />

          {/* Other pages with navbar */}
          <Route element={<Layout />}>
            <Route path="/about" element={<Home />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Catch all undefined routes and redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
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
          <Route path="/about" element={
            <>
              <Navbar />
              <main className="main-content">
                <div className="page-container">
                  <Home />
                </div>
              </main>
            </>
          } />
          <Route path="/career" element={
            <>
              <Navbar />
              <main className="main-content">
                <div className="page-container">
                  <CareerPage />
                </div>
              </main>
            </>
          } />
          <Route path="/blogs" element={
            <>
              <Navbar />
              <main className="main-content">
                <div className="page-container">
                  <BlogsPage />
                </div>
              </main>
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <main className="main-content">
                <div className="page-container">
                  <ContactPage />
                </div>
              </main>
            </>
          } />

          {/* Catch all undefined routes and redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

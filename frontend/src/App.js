import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Notifications from "./components/Notifications";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import './App.css';
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Booking from "./components/Booking";
import EmployeeList from "./components/admin/UserList";
import Profile from "./users/Profile";
import Appointments from "./components/Appointments";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import PortfolioWeb from "./components/PortfolioWeb";
import UpdateWeb from "./components/UpdateWeb";
import CreateWeb from "./components/CreateWeb";
import Portfolio from "./components/Portfolio";
import PortfolioGraphic from "./components/PortfolioGraphic";
import CreateGraphic from "./components/CreateGraphic";
import UpdateGraphic from "./components/UpdateGraphic";
import Services from "./components/Services";
import ContactPage from "./components/ContactPage";
import TermsConditions from "./components/Terms&Conditions";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  const { loading } = useSelector(state => state.alerts);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const cookiesAcceptedStatus = localStorage.getItem("cookiesAccepted");
    if (cookiesAcceptedStatus === "true") {
      setCookiesAccepted(true);  
    } else {
      setCookiesAccepted(false); 
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setCookiesAccepted(true); 
    console.log("Cookies accepted!");
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setCookiesAccepted(true); 
    console.log("Cookies declined!");
  };

  return (
    <div className="App">
      <Router>
        {loading && (
          <div className="spinner-parent">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
        <Toaster position="top-center" reserveOrder={false} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/termsConditions" element={<TermsConditions />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/theLoginPart" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/forgotPassword" element={<ForgetPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          <Route path="/admin/theRegisterSection" element={<ProtectedRoute><Register /></ProtectedRoute>} />
          <Route path="/portfolioWeb" element={<ProtectedRoute><PortfolioWeb /></ProtectedRoute>} />
          <Route path="/updateWeb/:id" element={<ProtectedRoute><UpdateWeb /></ProtectedRoute>} />
          <Route path="/createWeb" element={<ProtectedRoute><CreateWeb /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/admin/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
          <Route path="/contactPage" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
          <Route path="/portfolioGraphic" element={<ProtectedRoute><PortfolioGraphic /></ProtectedRoute>} />
          <Route path="/createGraphic" element={<ProtectedRoute><CreateGraphic /></ProtectedRoute>} />
          <Route path="/updateGraphic/:id" element={<ProtectedRoute><UpdateGraphic /></ProtectedRoute>} />
          <Route path="/employee/profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/services" element={<Services />} />
        </Routes>

        {!cookiesAccepted && (
          <div className="cookie-consent-banner">
            <div className="cookie-consent-text">
              This website uses cookies to improve your experience. By continuing to browse, you consent to the use of cookies.
              <a href="/privacyPolicy" className="cookie-link"> Learn more</a>
            </div>
            <div className="cookie-consent-buttons">
              <button
                className="accept-button"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="decline-button"
                onClick={handleDecline}
              >
                Decline
              </button>
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;

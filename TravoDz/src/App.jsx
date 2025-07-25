import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from './pages/WelcomePage';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CalendrierPage from "./pages/CalendrierPage";
import DocumentsPage from "./pages/DocumentsPage";
import SettingsPage from "./pages/SettingsPage";
import Pyment from"./pages/Payment";

function App() {
  return (
    <Router basename="/travo/">  {/* Définir la base pour un sous-dossier */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/msg" element={<Messages />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cal" element={<CalendrierPage />} />
        <Route path="/doc" element={<DocumentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
          <Route path="/payment" element={<Pyment />} />
        
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import PasswordRetriever from "./PasswordRetriever";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/p/:id" element={<PasswordRetriever />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeePortal from "./pages/EmployeePortal";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AddEmployee from "./components/AddEmployee";
import AddLaptop from "./components/AddLaptop";
import AssignLaptop from "./components/AssignLaptop";
import CreateIssue from "./components/CreateIssue";
import RequestList from "./components/RequestList";

function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/add-laptop" element={<AddLaptop />} />
        <Route path="/assign-laptop" element={<AssignLaptop />} />
        <Route path="/create-issue" element={<CreateIssue />} />
        <Route path="/employee" element={<EmployeePortal />} />
        <Route path="/requests" element={<RequestList />} />

      </Routes>
    </Router>
  );
}

export default App;

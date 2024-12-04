import React, { useState, useEffect } from "react";
import axios from "axios";
import LaptopDetails from "../components/LaptopDetails";
import RequestForm from "../components/RequestForm";
import IssueForm from "../components/IssueForm";

const EmployeePortal = () => {
  const [assignedLaptop, setAssignedLaptop] = useState(null);
  const [laptopRequest, setLaptopRequest] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [issue, setIssue] = useState({ description: "", priority: "Low" });

  useEffect(() => {
    
    fetchAssignedLaptop();
  }, []);
  const fetchAssignedLaptop = async () => {
    const res = await axios.get("http://localhost:5000/api/assignments", {
      headers: { token: localStorage.getItem("token") },
    });
    setAssignedLaptop(res.data);
    console.log(res.data)
    setEmployeeId(res.data[0].employeeId._id)
  };

  const handleRequestLaptop = async (e) => {
    e.preventDefault();
   const res= await axios.post(
      "http://localhost:5000/api/requests",
      {
        employeeId,
        reason: laptopRequest,
      },
      { headers: { token: localStorage.getItem("token") } }
    );
    alert("Request submitted.");
    setLaptopRequest("");
  console.log(res.data)
  };

  const handleReportIssue = async (e) => {
    e.preventDefault();
    await axios.post("/api/issues", issue);
    alert("Issue reported.");
    setIssue({ description: "", priority: "Low" });
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Employee Portal</h1>

      {/* Assigned Laptop */}
      <h2 className="mb-4 text-2xl font-bold">Assigned Laptop</h2>
      <LaptopDetails
        laptop={assignedLaptop}
        fetchAssignedLaptop={fetchAssignedLaptop}
      />

      {/* Request New Laptop */}
      <h2 className="mt-6 mb-4 text-2xl font-bold">Request New Laptop</h2>
      <RequestForm
        requestText={laptopRequest}
        setRequestText={setLaptopRequest}
        onSubmit={handleRequestLaptop}
      />

      {/* Report an Issue */}
      <h2 className="mb-4 text-2xl font-bold">Report an Issue</h2>
      <IssueForm
        issue={issue}
        setIssue={setIssue}
        onSubmit={handleReportIssue}
      />
    </div>
  );
};

export default EmployeePortal;

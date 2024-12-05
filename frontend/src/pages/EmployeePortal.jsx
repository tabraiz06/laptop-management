import React, { useState, useEffect } from "react";
import axios from "axios";
import LaptopDetails from "../components/LaptopDetails";
import RequestForm from "../components/RequestForm";
import IssueForm from "../components/IssueForm";
import { useNavigate } from "react-router-dom";

const EmployeePortal = () => {
  const navigate = useNavigate();
  const [assignedLaptop, setAssignedLaptop] = useState(null);
  const [laptopRequest, setLaptopRequest] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [issue, setIssue] = useState({ description: "", priority: "Low" });

  useEffect(() => {
    fetchAssignedLaptop();
  }, []);
  const fetchAssignedLaptop = async () => {
    const res = await axios.get(
      "https://laptop-management-backend.vercel.app/api/assignments",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    setAssignedLaptop(res.data);

    setEmployeeId(res.data[0].employeeId._id);
  };

  const handleRequestLaptop = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://laptop-management-backend.vercel.app/api/requests",
      {
        employeeId,
        reason: laptopRequest,
      },
      { headers: { token: localStorage.getItem("token") } }
    );
    alert("Request submitted.");
    setLaptopRequest("");
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
      <div className="mb-8 space-y-4 flex gap-4">
        <button
          onClick={() => navigate("/create-issue")}
          className="w-full p-3 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Report an Issue
        </button>
      </div>

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
      {/* <h2 className="mb-4 text-2xl font-bold">Report an Issue</h2>
      <IssueForm
        issue={issue}
        setIssue={setIssue}
        onSubmit={handleReportIssue}
      /> */}
    </div>
  );
};

export default EmployeePortal;

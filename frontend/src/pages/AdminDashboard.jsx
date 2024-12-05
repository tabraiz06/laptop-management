import React, { useState, useEffect } from "react";
import axios from "axios";
import OverviewCard from "../components/OverviewCard";

import EmployeeTable from "../components/EmployeeTable";

import LaptopTable from "../components/LaptopTable";
import LaptopEditModal from "../components/LaptopEditModal";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    assigned: 0,
    available: 0,
    maintenance: 0,
  });
  const [laptops, setLaptops] = useState([]);
  const [editLaptop, setEditLaptop] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchLaptops();
    fetchEmployees();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get(
      "https://laptop-management-backend.vercel.app/api/admin/stats",{headers:{token:localStorage.getItem('token')}}
    );
    setStats(res.data);
  };

  const fetchLaptops = async () => {
    const res = await axios.get(
      "https://laptop-management-backend.vercel.app/api/laptops/",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    setLaptops(res.data);
  };

  const fetchEmployees = async () => {
    const res = await axios.get(
      "https://laptop-management-backend.vercel.app/api/employees",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    setEmployees(res.data);
  };

  const handleRemoveEmployee = async (id) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      await axios.delete(
        `https://laptop-management-backend.vercel.app/api/employees/${id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      fetchEmployees();
    }
  };

  const handleEdit = (laptop) => {
    setEditLaptop(laptop);
  };
  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to delete this laptop?")) {
      await axios.delete(
        `https://laptop-management-backend.vercel.app/api/laptops/${id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      fetchLaptops();
    }
  };
  const handleSave = async () => {
    await axios.put(
      `https://laptop-management-backend.vercel.app/api/laptops/${editLaptop._id}`,
      editLaptop,
      { headers: { token: localStorage.getItem("token") } }
    );
    setEditLaptop(null);
    fetchLaptops();
    fetchStats();
  };
  const handleCloseModal = () => {
    setEditLaptop(null);
  };
  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <div className="mb-8 space-y-4 flex gap-4">
        <button
          onClick={() => navigate("/add-employee")}
          className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add Employee
        </button>
        <button
          onClick={() => navigate("/add-laptop")}
          className="w-full p-3 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Add Laptop
        </button>
        <button
          onClick={() => navigate("/assign-laptop")}
          className="w-full p-3 text-white bg-purple-500 rounded hover:bg-purple-600"
        >
          Assign Laptop
        </button>
        <button
          onClick={() => navigate("/requests")}
          className="w-full p-3 text-white bg-purple-500 rounded hover:bg-purple-600"
        >
          View Requests
        </button>
        <button
          onClick={() => navigate("/create-issue")}
          className="w-full p-3 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Create Issue
        </button>
      </div>
      {/* <RequestList /> */}
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard label="Total Laptops" value={stats.total} />
        <OverviewCard label="Assigned" value={stats.assigned} />
        <OverviewCard label="Available" value={stats.available} />
        <OverviewCard label="Under Maintenance" value={stats.maintenance} />
      </div>

      {/* Manage Laptops */}
      {/* <h2 className="mb-4 text-2xl font-bold">Manage Laptops</h2>
      <LaptopForm
        formData={newLaptop}
        setFormData={setNewLaptop}
        onSubmit={handleLaptopAdd}
      /> */}
      {/* Add Employee Form */}
      {/* <h2 className="mb-4 text-2xl font-bold">Manage Employees</h2>
      <EmployeeForm
        formData={newEmployee}
        setFormData={setNewEmployee}
        onSubmit={handleAddEmployee}
      /> */}

      {/* Employee List */}
      <h2 className="mt-6 mb-4 text-2xl font-bold">Employee List</h2>
      <EmployeeTable employees={employees} onRemove={handleRemoveEmployee} />
      {/* Laptop List */}
      <h2 className="mb-4 text-2xl font-bold">All Laptops</h2>
      <LaptopTable
        laptops={laptops}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />

      {/* Edit Modal */}
      <LaptopEditModal
        laptop={editLaptop}
        onClose={handleCloseModal}
        onSave={handleSave}
        setLaptop={setEditLaptop}
      />
    </div>
  );
};

export default AdminDashboard;

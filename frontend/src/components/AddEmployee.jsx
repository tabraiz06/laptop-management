import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate= useNavigate()
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employees", employee,{headers:{token:localStorage.getItem('token')}});
      alert("Employee added successfully!");
      navigate('/admin')
      setEmployee({ name: "", email: "", password: "", department: "" });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Add Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "password", "department"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            value={employee[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            className="w-full p-3 border rounded"
            required
          />
        ))}
        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

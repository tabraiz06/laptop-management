import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssignLaptop = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [assignment, setAssignment] = useState({
    employeeId: "",
    laptopId: "",
  });

  useEffect(() => {
    // Fetch employees
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "https://laptop-management-backend.vercel.app/api/employees",
          {
            headers: { token: localStorage.getItem("token") },
          }
        );

        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
    fetchLaptops();
  }, []);
  // Fetch available laptops
  const fetchLaptops = async () => {
    try {
      const res = await axios.get(
        "https://laptop-management-backend.vercel.app/api/laptops",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      setLaptops(res.data.filter((laptop) => laptop.status === "available"));
    } catch (error) {
      console.error("Error fetching laptops:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      await axios.post(
        "https://laptop-management-backend.vercel.app/api/assignments",
        assignment,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      fetchLaptops();
      navigate("/admin");
      setAssignment({ laptopId: "", employeeId: "" });

      alert("Laptop assigned successfully!");
    } catch (error) {
      console.error("Error assigning laptop:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Assign Laptop</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Employee
          </label>
          <select
            name="employeeId"
            value={assignment.employeeId}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">-- Select an Employee --</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name} ({employee.email})
              </option>
            ))}
          </select>
        </div>

        {/* Laptop Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Laptop
          </label>
          <select
            name="laptopId"
            value={assignment.laptopId}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">-- Select a Laptop --</option>
            {laptops.length > 0 ? (
              <>
                {laptops.map((laptop) => (
                  <option key={laptop._id} value={laptop._id}>
                    {laptop.brand} {laptop.model} ({laptop.serialNumber})
                  </option>
                ))}
              </>
            ) : (
              <>
                <option key={"001"} value={""}>
                  no laptop is available to assign
                </option>
              </>
            )}
            {}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 text-white bg-purple-500 rounded hover:bg-purple-600"
        >
          Assign Laptop
        </button>
      </form>
    </div>
  );
};

export default AssignLaptop;

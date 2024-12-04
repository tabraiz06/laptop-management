import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateIssue = () => {
  const navigate=useNavigate()
  const [laptops, setLaptops] = useState([]);
  const [issue, setIssue] = useState({
    laptopId: "",
    description: "",
    priority: "Low",
    reportedBy:""
  });

  useEffect(() => {
    // Fetch all laptops
    const fetchLaptops = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/laptops", {
          headers: { token: localStorage.getItem("token") },
        });
        setLaptops(res.data);
      } catch (error) {
        console.error("Error fetching laptops:", error);
      }
    };

    fetchLaptops();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(issue)
      await axios.post("http://localhost:5000/api/issues", issue,{headers:{token:localStorage.getItem('token')}});
      alert("Issue created successfully!");
      navigate('/admin')
      setIssue({ laptopId: "", description: "", priority: "Low" });
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Create Issue</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Laptop Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter Name
          </label>
          <input
          name="reportedBy"
            className="w-full p-3 border rounded"
            type="text"
            value={issue.reportedBy}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Laptop
          </label>
          <select
            name="laptopId"
            value={issue.laptopId}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">-- Select a Laptop --</option>
            {laptops.map((laptop) => (
              <option key={laptop.id} value={laptop._id}>
                {laptop.brand} {laptop.model} ({laptop.serialNumber})
              </option>
            ))}
          </select>
        </div>

        {/* Issue Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Issue Description
          </label>
          <textarea
            name="description"
            value={issue.description}
            onChange={handleChange}
            placeholder="Describe the issue"
            className="w-full p-3 border rounded"
            rows="4"
            required
          />
        </div>

        {/* Priority Level */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Priority Level
          </label>
          <select
            name="priority"
            value={issue.priority}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Create Issue
        </button>
      </form>
    </div>
  );
};

export default CreateIssue;

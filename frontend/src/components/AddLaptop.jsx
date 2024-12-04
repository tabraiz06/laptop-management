import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AddLaptop = () => {
  const navigate= useNavigate()
  const { fetchLaptops } = useAuth();
  const [laptop, setLaptop] = useState({
    brand: "",
    model: "",
    serialNumber: "",
    purchaseDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaptop({ ...laptop, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post("http://localhost:5000/api/laptops", laptop, {
      headers: { token: localStorage.getItem("token") },
    });
    fetchLaptops()
      alert("Laptop added successfully!");
      navigate('/admin')
      setLaptop({ brand: "", model: "", serialNumber: "", purchaseDate: "" });
    } catch (error) {
      console.error("Error adding laptop:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Add Laptop</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["brand", "model", "serialNumber", "purchaseDate"].map((field) => (
          <input
            key={field}
            type={field === "purchaseDate" ? "date" : "text"}
            name={field}
            value={laptop[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            className="w-full p-3 border rounded"
            required
          />
        ))}
        <button
          type="submit"
          className="w-full p-3 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Add Laptop
        </button>
      </form>
    </div>
  );
};

export default AddLaptop;

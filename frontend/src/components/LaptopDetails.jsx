import axios from "axios";
import React from "react";

const LaptopDetails = ({ laptop, fetchAssignedLaptop }) => {
  console.log(laptop);
  if (!laptop) {
    return <p>No laptop assigned yet.</p>;
  }

  const handleUnAssigned = async (id) => {
    const res = await axios.delete(
      `http://localhost:5000/api/assignments/${id}`,
      { headers: { token: localStorage.getItem("token") } }
    );
    fetchAssignedLaptop()
    // console.log(res.data)
  };

  return (
    <div className="p-4 bg-blue-100 rounded shadow ">
      <div className="flex flex-wrap">
        {laptop.map((laptops) => (
          <div key={laptops._id}>
            <p className="flex gap-4">
              <strong>Brand:</strong> {laptops.laptopId.brand}
            </p>
            <p className="flex gap-4">
              <strong>Model:</strong> {laptops.laptopId.model}
            </p>
            <p className="flex gap-4">
              <strong>Serial Number:</strong> {laptops.laptopId.serialNumber}
            </p>
            <p className="flex gap-4">
              <strong>Condition:</strong> {laptops.laptopId.status}
            </p>
            <button
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              onClick={() => handleUnAssigned(laptops._id)}
            >
              Un-Assigned
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaptopDetails;
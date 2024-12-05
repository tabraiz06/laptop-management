import React, { useState } from "react";
import IssueModal from "../components/IssueModal";
import axios from "axios";
const LaptopTable = ({ laptops, onEdit, onRemove }) => {
  const [issues, setIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchIssues = async (laptopId) => {
    try {
      const res = await axios.get(
        `https://laptop-management-backend.vercel.app/api/issues/${laptopId}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      setIssues(res.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching laptop issues:", error);
      alert(error.response?.data?.message || "Failed to fetch issues.");
    }
  };

  const handleViewIssues = (laptopId) => {
    fetchIssues(laptopId);
  };

  return (
    <div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Brand</th>
            <th className="p-2 border border-gray-300">Model</th>
            <th className="p-2 border border-gray-300">Serial Number</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {laptops.map((laptop) => (
            <tr key={laptop._id} className="hover:bg-gray-50">
              <td className="p-2 border border-gray-300">{laptop.brand}</td>
              <td className="p-2 border border-gray-300">{laptop.model}</td>
              <td className="p-2 border border-gray-300">
                {laptop.serialNumber}
              </td>
              <td className="p-2 border border-gray-300">{laptop.status}</td>
              <td className="p-2 border border-gray-300">
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => onEdit(laptop)}
                    className="p-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRemove(laptop._id)}
                    className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleViewIssues(laptop._id)}
                    className="p-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    View Issue
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {showModal && (
        <IssueModal issues={issues} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default LaptopTable;

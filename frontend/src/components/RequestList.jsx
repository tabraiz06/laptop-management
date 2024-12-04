import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests",{headers:{token:localStorage.getItem("token")}});
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("Failed to fetch requests.");
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/requests/${requestId}`,
        { status },{headers:{token:localStorage.getItem('token')}}
      );
      alert(res.data.message);
      fetchRequests(); // Refresh requests
    } catch (error) {
      console.error("Error updating request status:", error);
      alert("Failed to update request status.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Laptop Requests</h2>
      {requests.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Employee</th>
              <th className="p-2 border border-gray-300">Reason</th>
              <th className="p-2 border border-gray-300">Status</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="p-2 border border-gray-300">
                  {request.employeeId.name} ({request.employeeId.email})
                </td>
                <td className="p-2 border border-gray-300">{request.reason}</td>
                <td className="p-2 border border-gray-300">{request.status}</td>
                <td className="p-2 border border-gray-300">
                  <button
                    onClick={() => updateRequestStatus(request._id, "Approved")}
                    className="px-3 py-1 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateRequestStatus(request._id, "Rejected")}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
};

export default RequestList;

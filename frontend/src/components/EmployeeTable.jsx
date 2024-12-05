import React from "react";

const EmployeeTable = ({ employees, onRemove }) => {
  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border border-gray-300">Name</th>
          <th className="p-2 border border-gray-300">Email</th>
          <th className="p-2 border border-gray-300">Department</th>
          <th className="p-2 border border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id} className="hover:bg-gray-50">
            <td className="p-2 border border-gray-300">{employee.name}</td>
            <td className="p-2 border border-gray-300">{employee.email}</td>
            <td className="p-2 border border-gray-300">
              {employee.department}
            </td>
            <td className="p-2 border border-gray-300">
              <button
                onClick={() => onRemove(employee._id)}
                className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;

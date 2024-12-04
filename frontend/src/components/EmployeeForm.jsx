import React from "react";

const EmployeeForm = ({ formData, setFormData, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {["name", "email", "password", "department"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : "text"}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={(e) =>
            setFormData({ ...formData, [field]: e.target.value })
          }
          className="p-3 border rounded"
          required
        />
      ))}
      <button
        type="submit"
        className="col-span-1 p-3 text-white bg-blue-500 rounded hover:bg-blue-600 sm:col-span-2"
      >
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;

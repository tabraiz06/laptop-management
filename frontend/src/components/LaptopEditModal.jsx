import React from "react";

const LaptopEditModal = ({ laptop, onClose, onSave, setLaptop }) => {
  if (!laptop) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaptop({ ...laptop, [name]: value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Edit Laptop</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="grid gap-4"
        >
          {["brand", "model", "serialNumber", "status"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={laptop[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="p-3 border rounded"
              required
            />
          ))}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onSave}
              className="p-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LaptopEditModal;

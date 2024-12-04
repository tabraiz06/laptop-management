import React from "react";

const RequestForm = ({ requestText, setRequestText, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <textarea
        value={requestText}
        onChange={(e) => setRequestText(e.target.value)}
        placeholder="Reason for requesting a new laptop..."
        className="w-full p-3 border rounded"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full p-3 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Submit Request
      </button>
    </form>
  );
};

export default RequestForm;

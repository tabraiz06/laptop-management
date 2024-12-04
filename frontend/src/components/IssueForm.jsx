import React from "react";

const IssueForm = ({ issue, setIssue, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={issue.description}
        onChange={(e) => setIssue({ ...issue, description: e.target.value })}
        placeholder="Describe the issue..."
        className="w-full p-3 mb-4 border rounded"
        required
      ></textarea>
      <select
        value={issue.priority}
        onChange={(e) => setIssue({ ...issue, priority: e.target.value })}
        className="w-full p-3 mb-4 border rounded"
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <button
        type="submit"
        className="w-full p-3 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Report Issue
      </button>
    </form>
  );
};

export default IssueForm;

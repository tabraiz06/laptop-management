import React from "react";

const IssueModal = ({ issues, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 max-w-lg p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Laptop Issues</h2>

        {issues.length > 0 ? (
          <ul className="space-y-4">
            {issues.map((issue) => (
              <li
                key={issue.id}
                className="p-4 border rounded shadow-sm bg-gray-50"
              >
                <p>
                  <strong>Description:</strong> {issue.description}
                </p>
                <p>
                  <strong>Priority:</strong> {issue.priority}
                </p>
                <p>
                  <strong>Status:</strong> {issue.status}
                </p>
                <p>
                  <strong>Reported By:</strong> {issue.reportedBy}
                </p>
                <p>
                  <strong>Reported At:</strong>{" "}
                  {new Date(issue.reportedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No issues found for this laptop.</p>
        )}

        <button
          onClick={onClose}
          className="px-4 py-2 mt-4 text-white bg-purple-500 rounded hover:bg-purple-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default IssueModal;

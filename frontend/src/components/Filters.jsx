import React from "react";

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="flex items-center mb-4 space-x-4">
      {Object.keys(filters).map((key) => (
        <select
          key={key}
          value={filters[key]}
          onChange={(e) => onFilterChange(key, e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">{`Filter by ${key}`}</option>
          {filters[key].map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default Filters;

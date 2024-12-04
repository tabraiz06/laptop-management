import React from "react";

const OverviewCard = ({ label, value, bgColor }) => {
  return (
    <div
      className={`p-4 text-center rounded shadow ${bgColor || "bg-blue-100"}`}
    >
      <h2 className="text-xl font-bold">{label}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default OverviewCard;

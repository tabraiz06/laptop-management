import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate= useNavigate()
  const { logout } = useAuth();
  const user= localStorage.getItem('user')
  
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Laptop Management</div>
      <div>
        {user && (
          <>
            <span className="mr-4">{user}</span>
            <button
              onClick={()=>[logout(),navigate('/')]}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

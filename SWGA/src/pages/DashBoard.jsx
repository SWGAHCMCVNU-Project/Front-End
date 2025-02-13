/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Nếu đang ở trang dashboard gốc, cho phép chọn role
  if (location.pathname === '/dashboard') {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Chọn loại Dashboard</h2>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/dashboard-admin')}>
            Admin Dashboard
          </button>
          <button onClick={() => navigate('/dashboard-staff')}>
            Staff Dashboard
          </button>
          <button onClick={() => navigate('/dashboard-brand')}>
            Brand Dashboard
          </button>
        </div>
      </div>
    );
  }

  return ;
};

export default DashBoard;

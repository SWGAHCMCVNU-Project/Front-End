/* eslint-disable no-unused-vars */
import React from "react";
import { Tabs } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { UserOutlined, TeamOutlined, ShopOutlined } from "@ant-design/icons";

const DashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  const handleTabChange = (key) => {
    navigate(key); // Chuyển hướng khi chọn tab
  };

  return (
    <Tabs
      activeKey={location.pathname} // Đồng bộ tab với URL
      onChange={handleTabChange}
      items={[
        {
          key: "/dashboard-admin",
          label: (
            <>
              <UserOutlined /> Dashboard Admin
            </>
          ),
        },
        {
          key: "/dashboard-staff",
          label: (
            <>
              <TeamOutlined /> Dashboard Staff
            </>
          ),
        },
        {
          key: "/dashboard-brand",
          label: (
            <>
              <ShopOutlined /> Dashboard Brand
            </>
          ),
        },
      ]}
    />
  );
};

export default DashBoard;

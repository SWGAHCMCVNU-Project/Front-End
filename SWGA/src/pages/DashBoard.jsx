/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Spinner from '../ui/Spinner';
import DashboardAdmin from './Dashboard/DashboardAdmin';
import DashboardStaff from './Dashboard/DashboardStaff';
import DashboardBrand from './Dashboard/DashboardBrand';
import DashboardCampus from './Dashboard/DashBoardCampus';
import storageService from '../services/storageService';

const DashBoard = () => {
  const roleLogin = storageService.getRoleLogin();

  if (!roleLogin) {
    return <Spinner />;
  }

  switch (roleLogin) {
    case 'admin':
      return <DashboardAdmin />;
    case 'staff':
      return <DashboardStaff />;
    case 'brand':
      return <DashboardBrand />;
    case 'campus':
      return <DashboardCampus />;
    default:
      return <Navigate to="/sign-in" replace />;
  }
};

export default DashBoard;
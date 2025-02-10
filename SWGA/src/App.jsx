/* eslint-disable no-unused-vars */
import "antd/dist/reset.css";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./assets/styles/App.scss";
import "./assets/styles/responsive.scss";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import DashBoard from "./pages/DashBoard";
import DashboardAdmin from "./pages/Dashboard/DashboardAdmin.jsx";
import DashboardStaff from "./pages/Dashboard/DashboardStaff.jsx";
import DashboardBrand from "./pages/Dashboard/DashboardBrand.jsx";
// import CampaignPage from "./pages/CampaignManagement/CampaignPage.jsx";
// import CampaignDetailsPage from "./pages/CampaignManagement/CampaignDetailsPage.jsx";
import Main from "./components/layout/Main.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<DashBoard />} />
          <Route path="/dashboard-admin" exact element={<DashboardAdmin />} />
          <Route path="/dashboard-staff" exact element={<DashboardStaff />} />
          <Route path="/dashboard-brand" exact element={<DashboardBrand />} />
          {/* <Route path="/campaigns" element={<CampaignPage />} /> */}
          {/* <Route
            path="campaigns/:campaignId"
            element={ <CampaignDetailsPage/>}
          /> */}
          <Route path="*" exact element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

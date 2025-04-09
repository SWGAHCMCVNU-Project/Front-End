import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./assets/styles/App.scss";
import "./assets/styles/responsive.scss";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import DashBoard from "./pages/DashBoard";
import CampaignPage from "./pages/CampaignManagement/CampaignPage.jsx";
import Brands from "./pages/BrandManagement/Brands.jsx";
import Brand from "./pages/BrandManagement/Brand.jsx";
import Students from "./pages/StudentManagement/Students.jsx";
import Student from "./pages/StudentManagement/Student.jsx";
import ChallengePage from "./pages/ChallengeManagement/ChallengePage.jsx";
import StorePage from "./pages/StoreManagement/StorePage.jsx";
import VoucherType from "./pages/VoucherType/VoucherType.jsx";
import Vouchers from "./pages/VoucherManagement/Vouchers.jsx";
import Voucher from "./pages/VoucherManagement/Voucher.jsx";
import CustomerPage from "./pages/CustomerManagement/CustomerPage.jsx";
import BrandTransactionPage from "./pages/BrandManagement/BrandTransaction.jsx";
import FeedbackPage from "./pages/FeedbackManagement/Feedback.jsx";
import TransactionDetailPage from "./pages/BrandManagement/TransactionDetailPage";
import Lecturers from "./pages/LectureManagement/Lecturers.jsx";
import PackagePoint from "./pages/PackagePointManagement/PackagePoint.jsx";
import Main from "./components/layout/Main.jsx";
import storageService from "./services/storageService";
import VoucherCreatePage from "./pages/VoucherManagement/VoucherCreatePage.jsx";
import Areas from "./pages/AreaManagement/Areas.jsx";
import Profile from "./pages/Profile.jsx";
import CampaignType from "./pages/CampaignType/CampaignType.jsx";
import StoreCreatePage from "./pages/StoreManagement/StoreCreatePage.jsx";
import StoreDetailsPage from "./pages/StoreManagement/StoreDetailsPage.jsx";
import StoreUpdatePage from "./pages/StoreManagement/StoreUpdatePage.jsx";
import Account from "./pages/Account.jsx";
import CampaignCreatePage from "./pages/CampaignManagement/CampaignCreatePage.jsx";
import CampaignDetailsPage from "./pages/CampaignManagement/CampaignDetailsPage.jsx";
import CampaignUpdatePage from "./pages/CampaignManagement/CampaignUpdatePage.jsx";
import BuyPoints from "./pages/BuyPoints";
import CampusDetailsPage from "./pages/CampusManagement/CampusDetailsPage.jsx";
import CampusPage from "./pages/CampusManagement/CampusPage.jsx";
import LuckyPrize from "./pages/LuckyPrizeManagement/LuckyPrize.jsx";

function PrivateRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const isAuthenticated = !!storageService.getAccessToken();
  const roleLogin = storageService.getRoleLogin();

  if (location.pathname === "/sign-in") {
    return children;
  }

  if (!isAuthenticated || !roleLogin) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(roleLogin)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  const [roleLogin, setRoleLogin] = useState(storageService.getRoleLogin());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const vnpParams = Array.from(urlParams.entries()).filter(([key]) =>
      key.startsWith("vnp_")
    );

    if (vnpParams.length > 0 && location.pathname === "/") {
      navigate(`/buy-points?${urlParams.toString()}`, { replace: true });
    }
  }, [location, navigate]);

  const handleLogin = (newRoleLogin) => {
    storageService.setRoleLogin(newRoleLogin);
    setRoleLogin(newRoleLogin);
  };

  return (
    <>
      <Routes>
        <Route
          path="/sign-in"
          exact
          element={<SignIn onLogin={handleLogin} />}
        />
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/" element={<Main />}>
          <Route path="/dashboard" exact element={<DashBoard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/brands"
            exact
            element={
              <PrivateRoute allowedRoles={["admin", "brand"]}>
                <Brands />
              </PrivateRoute>
            }
          />
          <Route
            path="brands/:brandId"
            element={
              <PrivateRoute allowedRoles={["admin", "brand"]}>
                <Brand />
              </PrivateRoute>
            }
          />
          <Route
            path="/campaigns"
            exact
            element={
              <PrivateRoute allowedRoles={["admin", "brand"]}>
                <CampaignPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/campaigns/create"
            exact
            element={
              <PrivateRoute allowedRoles={["admin", "brand"]}>
                <CampaignCreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/campaigns/:campaignId"
            exact
            element={
              <PrivateRoute allowedRoles={["admin", "brand"]}>
                <CampaignDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/campaigns/edit/:campaignId"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <CampaignUpdatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            exact
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Students />
              </PrivateRoute>
            }
          />
          <Route
            path="students/:studentId"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Student />
              </PrivateRoute>
            }
          />
          <Route
            path="/campus"
            exact
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <CampusPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/campus/:campusId"
            exact
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <CampusDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/lucky-prizes"
            exact
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <LuckyPrize />
              </PrivateRoute>
            }
          />
          <Route
            path="/areas"
            exact
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Areas />
              </PrivateRoute>
            }
          />
          <Route
            path="/stores"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <StorePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/stores/create"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <StoreCreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/stores/:storeId"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <StoreDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/stores/edit/:storeId"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <StoreUpdatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/vouchers"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <Vouchers />
              </PrivateRoute>
            }
          />
          <Route
            path="/vouchers/create"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <VoucherCreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/vouchers/:voucherId"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <Voucher />
              </PrivateRoute>
            }
          />
          <Route
            path="/vouchers/edit/:voucherId"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <VoucherCreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/voucher-type"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <VoucherType />
              </PrivateRoute>
            }
          />
          <Route
            path="/campaign-type"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <CampaignType />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <CustomerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <BrandTransactionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions/:id"
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <TransactionDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback"
            exact
            element={
              <PrivateRoute allowedRoles={["brand"]}>
                <FeedbackPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/lecturers"
            exact
            element={
              <PrivateRoute allowedRoles={["campus"]}>
                <Lecturers />
              </PrivateRoute>
            }
          />
          <Route
            path="/point-packages"
            exact
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <PackagePoint />
              </PrivateRoute>
            }
          />
          <Route
            path="/challenges"
            exact
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <ChallengePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/buy-points"
            exact
            element={
              <PrivateRoute allowedRoles={["brand", "campus"]}>
                <BuyPoints />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
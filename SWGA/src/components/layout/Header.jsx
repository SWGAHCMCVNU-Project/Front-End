import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Col, Divider, Popover, Row, Typography, notification } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import avatarProfile from "../../assets/images/avatar-profile.png";
import storageService from "../../services/storageService";
import walletService from "../../store/api/walletApi";
import ButtonCustom from "../../ui/custom/Button/ButtonCustom";
import point from "../../assets/images/dauxanh.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetCampusByAccountId from "../../hooks/campus/useGetCampusByAccount";
import { useBrand } from "../../hooks/brand/useBrand";

const profileIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z" fill="#111827"></path>
  </svg>
);

const settingIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z" fill="#111827"></path>
  </svg>
);

function Header({ onPress, name, subName, handleSidenavColor, handleSidenavType, handleFixedNavbar }) {
  const { Title } = Typography;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(storageService.getUser());
  const queryClient = useQueryClient();
  const [campusId, setCampusId] = useState(storageService.getCampusId());

  const { brand, isLoading: isLoadingBrand, error: brandError } = useBrand();
  const accountId = userData?.accountId;
  const { data: campusResponse, isLoading: isCampusLoading } = useGetCampusByAccountId(accountId, {
    enabled: !!accountId && userData?.role === 'campus' && !campusId,
  });

  useEffect(() => {
    if (campusResponse?.data?.id && userData?.role === 'campus') {
      storageService.setCampusId(campusResponse.data.id);
      setCampusId(campusResponse.data.id);
      window.dispatchEvent(new Event('campusIdUpdated'));
    }
  }, [campusResponse]);

  const brandId = userData?.role === 'brand' && brand ? brand.id : storageService.getBrandId();

  const { data: walletBalance, isLoading: isLoadingWallet, refetch } = useQuery({
    queryKey: ['walletBalance', userData?.role, campusId, brandId],
    queryFn: async () => {
      if (userData?.role === 'campus') {
        if (!campusId) {
          console.warn('Campus ID not found, returning 0 balance');
          return 0; // Return 0 if campusId is not available
        }
        const walletData = await walletService.getWalletByCampusId(campusId);
        return walletData?.balance || 0;
      } else if (userData?.role === 'brand') {
        if (!brandId) throw new Error('Brand ID not found');
        const walletData = await walletService.getWalletByBrandId(brandId);
        return walletData?.balance || 0;
      }
      return null;
    },
    enabled: !!userData?.role && ['campus', 'brand'].includes(userData?.role),
    retry: false,
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const newUser = storageService.getUser();
      setUserData(newUser);
      setCampusId(storageService.getCampusId());
      if (newUser && ['campus', 'brand'].includes(newUser.role)) {
        queryClient.invalidateQueries(['walletBalance']);
      }
    };

    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleStorageChange);
    window.addEventListener('campusIdUpdated', () => {
      const updatedCampusId = storageService.getCampusId();
      setCampusId(updatedCampusId);
      refetch(); // Refetch wallet balance when campusId is updated
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
      window.removeEventListener('campusIdUpdated', handleStorageChange);
    };
  }, [queryClient, refetch]);

  useEffect(() => {
    const handleWalletBalanceUpdate = () => {
      // Force refetch wallet balance
      queryClient.invalidateQueries(['walletBalance']);
    };
  
    window.addEventListener('walletBalanceUpdated', handleWalletBalanceUpdate);
    
    return () => {
      window.removeEventListener('walletBalanceUpdated', handleWalletBalanceUpdate);
    };
  }, [queryClient]);
  const handleLogOut = () => {
    try {
      storageService.clearAll();
      queryClient.clear();
      navigate("/sign-in");
      notification.success({
        message: "Đăng xuất thành công",
        placement: "topRight",
        duration: 2,
      });
      window.dispatchEvent(new Event('authChange'));
    } catch (error) {
      notification.error({
        message: "Đăng xuất thất bại",
        description: error.message,
      });
    }
  };

  const menu = (
    <div style={{ padding: '10px', width: '250px' }}>
      <Avatar.Group style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <div>
          <Title level={5} style={{ marginLeft: "30px", fontSize: '16px', fontWeight: 'bold' }}>
            {userData?.userName || "Guest User"}
          </Title>
          <div style={{ color: '#666', fontSize: '14px', marginLeft: "30px" }}>
            {userData?.role === "admin" && "Quản trị viên"}
            {userData?.role === "brand" && "Quản lí thương hiệu"}
            {userData?.role === "staff" && "Nhân viên"}
            {userData?.role === "campus" && "Campus"}
          </div>
        </div>
      </Avatar.Group>
      <Divider style={{ margin: '10px 0' }} />
      <div style={{ marginBottom: '10px', marginLeft: "30px" }}>
        <Link to="/account" style={{ display: 'flex', alignItems: 'center', color: '#111827', fontSize: '14px' }}>
          <UserOutlined style={{ marginRight: '8px', fontSize: '16px' }} />
          Hồ sơ
        </Link>
      </div>
      <div style={{ marginBottom: '15px', marginLeft: "30px" }}>
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', color: '#111827', fontSize: '14px' }}>
          <HomeOutlined style={{ marginRight: '8px', fontSize: '16px' }} />
          Trang chủ
        </Link>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ButtonCustom
          type="primary"
          onClick={handleLogOut}
          style={{ width: '100%', backgroundColor: '#1890ff', borderColor: '#1890ff', fontSize: '14px' }}
        >
          Đăng Xuất
        </ButtonCustom>
      </div>
    </div>
  );

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 290, 
        right: 0, 
        zIndex: 1000, 
        backgroundColor: '#fff', 
        boxShadow: '0 2px 8px rgba(255, 255, 255, 0.15)',
        padding: '30px 0',
        height: '70px',
      }}
    >
      <Row gutter={[24, 0]} align="middle">
        <Col span={24} md={24} className="header-control" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: "-10px" }}>
          {userData ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '16px', color: '#111827', marginLeft: "15px" }}>
                  Chào mừng, {userData.userName || "bạn"}!
                </span>
                <Avatar src={avatarProfile} size="small" style={{ marginLeft: '15px'}} />
                {(userData.role === 'campus' || userData.role === 'brand') && (
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                    <span style={{ fontSize: '16px', color: '#111827' }}>
                      
                      Ví: {isLoadingWallet || isCampusLoading || isLoadingBrand ? 'Loading...' : (walletBalance ?? '0')}
                    </span>
                    <img src={point} alt="point icon" style={{ width: '16px', height: '16px', marginLeft: '5px' }} />
                  </div>
                )}
              </div>
              <Badge size="small" count={1} style={{ marginLeft: '30px' }}>
                <Popover content={menu} trigger="click" placement="bottom">
                  {settingIcon}
                </Popover>
              </Badge>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="btn-sign-in" style={{ marginRight: '25px' }}>
                {profileIcon}
                <span style={{ marginLeft: '8px' }}>Đăng nhập</span>
              </Link>
              <Badge size="small" count={1} style={{ marginRight: '30px' }}>
                <Popover content={menu} trigger="click" placement="bottom">
                  {settingIcon}
                </Popover>
              </Badge>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Header;
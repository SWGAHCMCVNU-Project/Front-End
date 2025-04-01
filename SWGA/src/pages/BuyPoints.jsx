import { Card, Typography, Button, Row, Col, message, Spin } from 'antd';
import styled from 'styled-components';
import { ShoppingCartOutlined, CheckOutlined } from '@ant-design/icons';
import { usePointPackages } from '../hooks/point-package/usePointPackages';
import { usePurchasePointsCampus } from '../hooks/buy-point/usePurchasePointsCampus';
import { usePurchasePointsBrand } from '../hooks/buy-point/usePurchasePointsBrand';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StorageService from '../services/storageService';
import { useBrand } from '../hooks/brand/useBrand';
import useGetCampusByAccountId from '../hooks/campus/useGetCampusByAccount';

const { Title, Text } = Typography;

const PageContainer = styled.div`
  padding: 2rem;
  background: #f5f5f5;
  min-height: calc(100vh - 88px);
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  h2 {
    font-size: 2.5rem !important;
    margin-bottom: 1rem !important;
  }
  .ant-typography {
    color: #666;
  }
`;

const StyledCard = styled(Card)`
  height: 100%;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #1db954;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .ant-card-body {
    padding: 2rem;
  }
`;

const PackageTitle = styled(Title)`
  margin-bottom: 0.5rem !important;
`;

const PriceTag = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #1db954;
  margin: 1.5rem 0;
`;

const PointValue = styled.div`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  li {
    color: #666;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const BuyButton = styled(Button)`
  background: #1db954;
  border: none;
  height: 48px;
  font-size: 1rem;
  font-weight: bold;
  
  &:hover {
    background: #1ed760 !important;
    transform: scale(1.02);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

function BuyPoints() {
  const { pointPackages, isLoading } = usePointPackages({
    status: true,
    size: 100,
  });

  const { brand, isLoading: isBrandLoading } = useBrand();
  const accountId = StorageService.getAccountId();
  const { data: campusResponse, isLoading: isCampusLoading } = useGetCampusByAccountId(accountId);
  const navigate = useNavigate();
  const role = StorageService.getRoleLogin();
  const campusId = campusResponse?.data?.id;
  const brandId = StorageService.getBrandId();

  const { buyPoints: buyPointsCampus, isPurchasing: isPurchasingCampus } = usePurchasePointsCampus();
  const { buyPoints: buyPointsBrand, isPurchasing: isPurchasingBrand } = usePurchasePointsBrand();

  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const location = useLocation();

  // Xử lý redirect và callback từ VNPay
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const vnpParams = Array.from(urlParams.entries()).filter(([key]) => key.startsWith('vnp_'));

    // Nếu có params VNPay và đang ở trang chủ (/)
    if (vnpParams.length > 0 && location.pathname === '/') {
      // Chuyển hướng ngay đến /buy-point với giữ nguyên params
      navigate(`/buy-point?${urlParams.toString()}`, { replace: true });
      return;
    }

    // Xử lý callback VNPay khi đã ở trang /buy-point
    if (vnpParams.length > 0 && location.pathname === '/buy-point') {
      const vnpResponseCode = urlParams.get('vnp_ResponseCode');
      const vnpAmount = urlParams.get('vnp_Amount');
      const vnpTransactionStatus = urlParams.get('vnp_TransactionStatus');

      if (vnpResponseCode === '00' && vnpTransactionStatus === '00') {
        const amount = vnpAmount ? parseInt(vnpAmount) / 100 : 0;
        message.success(`Thanh toán thành công ${amount.toLocaleString('vi-VN')} VNĐ`, 5);
      } else if (vnpResponseCode) {
        message.error('Thanh toán thất bại. Vui lòng thử lại.', 5);
      }

      // Xóa params sau khi xử lý
      window.history.replaceState({}, '', '/buy-point');
    }
  }, [location, navigate]);

  const handleBuyPackage = async (packageInfo) => {
    try {
      setSelectedPackageId(packageInfo.id);

      if (role === 'campus') {
        if (!campusId) {
          throw new Error('Không tìm thấy campusId. Vui lòng đăng nhập lại.');
        }
        await buyPointsCampus(packageInfo.id, campusId, null);
      } else if (role === 'brand') {
        if (!brandId) {
          throw new Error('Không tìm thấy brandId. Vui lòng đăng nhập lại.');
        }
        await buyPointsBrand(packageInfo.id, null, brandId);
      } else {
        throw new Error('Vai trò không hợp lệ. Vui lòng đăng nhập lại.');
      }
    } catch (error) {
      console.error('Error in handleBuyPackage:', error);
      message.error(error.message || 'Có lỗi xảy ra khi mua gói điểm.');
      setSelectedPackageId(null);
    }
  };

  if (isLoading || isBrandLoading || isCampusLoading) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  if (!pointPackages?.data?.items || pointPackages.data.items.length === 0) {
    return (
      <LoadingContainer>
        <Text>Không có dữ liệu gói điểm</Text>
      </LoadingContainer>
    );
  }

  const getDefaultFeatures = (point) => [
    `Tích ${point} điểm`,
    'Đổi voucher theo điểm',
    'Hỗ trợ 24/7 nếu có vấn đề',
    'Ưu đãi hấp dẫn',
  ];

  const isPurchasing = role === 'brand' ? isPurchasingBrand : isPurchasingCampus;

  return (
    <PageContainer>
      <HeaderSection>
        <Title level={2}>Nâng cấp trải nghiệm của bạn</Title>
        <Text>Chọn gói điểm phù hợp và tận hưởng nhiều ưu đãi hơn</Text>
      </HeaderSection>

      <Row gutter={[32, 32]} justify="center">
        {pointPackages.data.items.map((pkg) => (
          <Col xs={24} sm={24} md={8} key={pkg.id}>
            <StyledCard>
              <PackageTitle level={4}>{pkg.packageName}</PackageTitle>
              <PointValue>{pkg.point} điểm</PointValue>
              <PriceTag>{pkg.price?.toLocaleString('vi-VN')} VNĐ</PriceTag>
              
              <FeatureList>
                {getDefaultFeatures(pkg.point).map((feature, index) => (
                  <li key={index}>
                    <CheckOutlined style={{ color: '#1db954' }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </FeatureList>

              <BuyButton
                style={{ fontSize: "20px" }}
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => handleBuyPackage(pkg)}
                block
                loading={isPurchasing && selectedPackageId === pkg.id}
                disabled={isPurchasing}
              >
                Mua Ngay
              </BuyButton>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
}

export default BuyPoints;
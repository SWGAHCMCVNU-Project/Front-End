import { Card, Typography, Button, Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import { ShoppingCartOutlined, CheckOutlined } from '@ant-design/icons';
import { usePointPackages } from '../hooks/point-package/usePointPackages';
import { usePurchasePointsCampus } from '../hooks/buy-point/usePurchasePointsCampus';
import { usePurchasePointsBrand } from '../hooks/buy-point/usePurchasePointsBrand';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import StorageService from '../services/storageService';
import { useBrand } from '../hooks/brand/useBrand';
import useGetCampusByAccountId from '../hooks/campus/useGetCampusByAccount';
import { toast } from 'react-hot-toast';

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
    border-color: #1c5d78;
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
  color: #1c5d78;
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
  background: #1c5d78;
  border: none;
  height: 48px;
  font-size: 1rem;
  font-weight: bold;
  
  &:hover {
    background: #1c5d78 !important;
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
  const role = StorageService.getRoleLogin();

  // Sử dụng state để lưu campusId
  const [persistentCampusId, setPersistentCampusId] = useState(null);

  // Lấy campusId từ API
  const campusData = campusResponse?.data;
  let campusId = campusResponse?.campusId;

  // Cập nhật persistentCampusId khi có campusId từ API
  useEffect(() => {
    if (campusId) {
      setPersistentCampusId(campusId);
    }
  }, [campusId]);

  // Fallback lấy campusId từ localStorage nếu API trả về null
  if (!campusId && role === 'campus') {
    const storedCampusId = StorageService.getCampusId();
    campusId = storedCampusId || persistentCampusId;
  }

  const [brandId, setBrandId] = useState(StorageService.getBrandId());

  const { buyPoints: buyPointsCampus, isPurchasing: isPurchasingCampus } = usePurchasePointsCampus();
  const { buyPoints: buyPointsBrand, isPurchasing: isPurchasingBrand } = usePurchasePointsBrand();

  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const hasProcessedRef = useRef(false);

  // Debug localStorage
  

  // Store campusId in StorageService after fetching
  useEffect(() => {
    if (campusId && role === 'campus') {
      StorageService.setCampusId(campusId);
    }
  }, [campusId, role]);

  useEffect(() => {
    setBrandId(StorageService.getBrandId());
    const handleStorageUpdate = () => {
      setBrandId(StorageService.getBrandId());
    };
    window.addEventListener('storageUpdated', handleStorageUpdate);
    return () => {
      window.removeEventListener('storageUpdated', handleStorageUpdate);
    };
  }, []);

  useEffect(() => {
    const vnpResponseCode = searchParams.get('vnp_ResponseCode');
    const vnpAmount = searchParams.get('vnp_Amount');
    const vnpTransactionStatus = searchParams.get('vnp_TransactionStatus');
  
    if (vnpResponseCode && vnpAmount && vnpTransactionStatus && !hasProcessedRef.current) {
      hasProcessedRef.current = true;
      setSearchParams({}, { replace: true });
      window.history.replaceState({}, '', window.location.pathname);
  
      if (vnpResponseCode === '00' && vnpTransactionStatus === '00') {
        const amount = parseInt(vnpAmount) / 100;
        toast.success(`Thanh toán thành công ${amount.toLocaleString('vi-VN')} VNĐ`, {
          duration: 5000,
        });
        window.dispatchEvent(new Event('walletBalanceUpdated'));
      } else {
        toast.error('Thanh toán thất bại. Vui lòng thử lại.', {
          duration: 5000,
        });
      }
    }
  }, [searchParams, setSearchParams]);

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
      toast.error(error.message || 'Có lỗi xảy ra khi mua gói điểm.', {
        duration: 5000,
      });
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
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect } from "react"; // Loại bỏ useContext
import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import usePackages from "./usePackages"; // Sử dụng usePackages thay vì context

const PackageDetailsContainer = styled.div`
  background: linear-gradient(135deg, var(--color-grey-0), var(--color-grey-50)); /* Gradient nhẹ */
  border: 1px solid var(--color-grey-100);
  border-radius: 16px; /* Góc bo tròn lớn hơn */
  padding: 2.5rem; /* Tăng padding cho rộng rãi */
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Bóng nổi bật hơn */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Hiệu ứng hover */
  display: ${props => props.isVisible ? 'block' : 'none'}; /* Ẩn/hiện */
  opacity: ${props => props.isVisible ? 1 : 0};
  animation: ${props => props.isVisible ? 'fadeIn 0.3s ease-in' : 'none'};

  &:hover {
    transform: translateY(-5px); /* Nâng lên khi hover */
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const UpgradeNotice = styled.p`
  color: var(--color-orange-700); /* Màu cam đậm hơn */
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem; /* Khoảng cách giữa text và nút */
`;

const StyledTag = styled(Tag)`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
`;

function PackageDetails({ isVisible, onUpgrade, onRenew, onCancel }) {
  const { currentPackage, upgradePackage, renewPackage, cancelPackage } = usePackages();

  if (!currentPackage) return <div>Không có gói hiện tại</div>;

  return (
    <PackageDetailsContainer isVisible={isVisible}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Gói bạn đang sử dụng: {currentPackage.packageName}
      </h2>
      <p><strong>Số điểm hiện có:</strong> {currentPackage.pointsRemaining}</p>
      <p><strong>Thời gian còn lại:</strong> {currentPackage.daysRemaining > 0 ? `${currentPackage.daysRemaining} ngày` : "Hết hạn"}</p>
      <StyledTag type={currentPackage.state === "active" ? "cyan" : currentPackage.isExpired ? "error" : "orange"}>
        {currentPackage.state === "active"
          ? "Hoạt động"
          : currentPackage.isExpired
          ? "Hết hạn"
          : "Không hoạt động"}
      </StyledTag>
      {currentPackage.canUpgrade && (
        <UpgradeNotice>
          Bạn có thể nâng cấp lên gói tiếp theo!
          <Button onClick={() => upgradePackage(currentPackage.id, currentPackage.packageId + 1)}>
            Nâng cấp
          </Button>
        </UpgradeNotice>
      )}
      {currentPackage.daysRemaining <= 30 && currentPackage.state === "active" && (
        <UpgradeNotice>
          Gói của bạn sắp hết hạn!
          <Button onClick={() => renewPackage(currentPackage.id)}>
            Gia hạn
          </Button>
        </UpgradeNotice>
      )}
      {currentPackage.state !== "inactive" && (
        <Button 
          $variation="danger" 
          onClick={() => cancelPackage(currentPackage.id)}
          style={{ marginTop: '1.5rem' }}
        >
          Hủy gia hạn
        </Button>
      )}
    </PackageDetailsContainer>
  );
}

export default PackageDetails;
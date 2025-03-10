import styled from "styled-components";
import { useState, useEffect } from "react"; // Thêm useState để quản lý popup
import Table from "../../ui/Table";
import StackedHeader from "../../ui/StackedHeader";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import usePackages from "./usePackages"; // Sử dụng usePackages thay vì context

const StyledTable = styled(Table)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Đảm bảo góc bo tròn không bị cắt */
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Khoảng cách giữa các nút */
`;

const CustomPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7); /* Nền mờ tối hơn */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* Đảm bảo hiển thị trên cùng */
  overflow: auto;
  animation: fadeIn 0.3s ease-in-out;
`;

const CustomPopupContent = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  padding: 2.5rem;
  max-width: 480px;
  width: 90%;
  position: relative;
  animation: popUp 0.5s ease-out;

  @keyframes popUp {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-grey-500);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-grey-700);
  }
`;

function PackageTable({ searchTerm, filterState, onEdit }) {
  const { packages, isLoading, upgradePackage, renewPackage, cancelPackage } = usePackages(searchTerm, filterState);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [action, setAction] = useState(null); // Lưu hành động cần thực hiện
  const [selectedPackageId, setSelectedPackageId] = useState(null); // Lưu ID gói cần xử lý

  const handleAction = (actionFunc, packageId, newPackageId = null) => {
    setAction(() => () => actionFunc(packageId, newPackageId));
    setSelectedPackageId(packageId);
    setIsConfirmOpen(true);
  };

  const confirmAction = () => {
    if (action) {
      action();
      setIsConfirmOpen(false);
      setAction(null);
      setSelectedPackageId(null);
    }
  };

  const cancelAction = () => {
    setIsConfirmOpen(false);
    setAction(null);
    setSelectedPackageId(null);
  };

  // if (isLoading) return <div>Đang tải...</div>; // Hoặc sử dụng Spinner nếu có

  return (
    <>
      <StyledTable columns="0.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>STT</div>
          <StackedHeader label="Tên gói" onClick={() => {}} />
          <div>Ngày mua</div>
          <div>Ngày nâng cấp/gia hạn</div>
          <div>Điểm đã mua</div>
          <div>Điểm còn lại</div>
          <div>Trạng thái</div>
          <div>Hành động</div>
        </Table.Header>
        <Table.Body
          data={packages || []}
          render={(packageItem, index) => (
            <Table.Row>
              <div>{index + 1}</div>
              <div>{packageItem.packageName}</div>
              <div>{new Date(packageItem.purchaseDate).toLocaleDateString()}</div>
              <div>{packageItem.upgradeDate ? new Date(packageItem.upgradeDate).toLocaleDateString() : "Chưa nâng cấp"}</div>
              <div>{packageItem.pointsPurchased}</div>
              <div>{packageItem.pointsRemaining}</div>
              <Tag type={packageItem.state === "active" ? "cyan" : packageItem.isExpired ? "error" : "orange"}>
                {packageItem.state === "active"
                  ? "Hoạt động"
                  : packageItem.isExpired
                  ? "Hết hạn"
                  : "Không hoạt động"}
              </Tag>
              <ActionButtons>
                {packageItem.canUpgrade && (
                  <Button onClick={() => handleAction(upgradePackage, packageItem.id, packageItem.packageId + 1)}>Nâng cấp</Button>
                )}
                {packageItem.daysRemaining <= 30 && packageItem.state === "active" && (
                  <Button onClick={() => handleAction(renewPackage, packageItem.id)}>Gia hạn</Button>
                )}
                {packageItem.state !== "inactive" && (
                  <Button $variation="danger" onClick={() => handleAction(cancelPackage, packageItem.id)}>
                    Hủy gia hạn
                  </Button>
                )}
                <Button onClick={() => onEdit(packageItem)}>Xem chi tiết</Button>
              </ActionButtons>
            </Table.Row>
          )}
        />
      </StyledTable>

      {isConfirmOpen && (
        <CustomPopupOverlay>
          <CustomPopupContent>
            <CloseButton onClick={cancelAction}>&times;</CloseButton>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#333' }}>
              Xác nhận hành động
            </h2>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>
              Hành động này sẽ ảnh hưởng đến gói điểm của bạn. Bạn có muốn tiếp tục?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Button onClick={confirmAction} style={{ backgroundColor: '#28a745', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px' }}>
                Đồng ý
              </Button>
              <Button $variation="danger" onClick={cancelAction} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px' }}>
                Hủy
              </Button>
            </div>
          </CustomPopupContent>
        </CustomPopupOverlay>
      )}
    </>
  );
}

export default PackageTable;
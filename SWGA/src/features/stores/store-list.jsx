import { Avatar, Spin, Tag, Typography } from "antd";
import { HiEye, HiPencil } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import imgDefaultStore from "../../assets/images/store.png";
import Empty from "../../ui/Empty";
import { ButtonAction } from "../../ui/custom/Button/Button";
import { TableItem } from "../../ui/custom/Table/TableItem";
import {
  formatPhoneNumber,
  formattedHours,
  useImageValidity,
} from "../../utils/helpers";
import { useStore } from "./useStore";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-left: 1rem;
  & span:first-child {
    font-weight: 500;
  }
  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
  margin-left: 1rem;
`;

const StackedTimeFrameAbove = styled.span`
  color: #2ecc71;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
`;

const StyledAvatarGroup = styled(Avatar.Group)`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const StyledTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function StoreList() {
  const { Title } = Typography;
  const {
    isLoading,
    stores,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    setSort,
  } = useStore();
  const navigate = useNavigate();

  // Kiểm tra dữ liệu stores trước khi sử dụng
  const storeImages = stores?.result?.map((store) => store.file) || []; // Sửa từ store.avatar thành store.file
  const isValidImages = useImageValidity(stores?.result || [], storeImages);

  const handleSort = (pagination, filters, sorter) => {
    if (!sorter.field || !sorter.order) return; // Ngăn lỗi khi sorter rỗng
    const sortOrder = sorter.order === "ascend" ? "asc" : "desc";
    switch (sorter.field) {
      case "StoreName":
        setSort(`${sorter.field},${sortOrder}`);
        break;
      case "Hours":
        setSort(`${sorter.field},${sortOrder}`);
        break;
      default:
        break;
    }
  };

  const columns = [
    { title: "STT", dataIndex: "number", key: "number", align: "center" },
    { title: "Cửa hàng", dataIndex: "StoreName", key: "StoreName", sorter: true },
    { title: "Liên hệ", dataIndex: "Contact", key: "Contact" },
    { title: "Thời gian làm việc", dataIndex: "Hours", key: "Hours", sorter: true },
    { title: "Trạng thái", dataIndex: "State", key: "State", align: "center" },
    { title: "Hành động", dataIndex: "action", key: "action", align: "center" },
  ];

  if (isLoading) {
    return (
      <Spin>
        <TableItem columns={columns} dataSource={[]} pagination={false} />
      </Spin>
    );
  }

  // Kiểm tra stores chặt chẽ hơn
  if (!stores || !stores.result || !Array.isArray(stores.result)) {
    return <Empty resourceName="cửa hàng" />;
  }

  const data = stores.result.map((store, index) => {
    const dataIndex = (page - 1) * limit + index + 1;
    const isValid = isValidImages[index];
    const avatarSrc = isValid ? store.file : imgDefaultStore; // Sửa từ store.avatar thành store.file

    const openingHours = store.openingHours || "00:00:00";
    const closingHours = store.closingHours || "00:00:00";

    return {
      key: store.id,
      number: <div className="number-header"><span>{dataIndex}</span></div>,
      StoreName: (
        <StyledAvatarGroup>
          <Avatar className="shape-avatar-product" shape="square" src={avatarSrc} />
          <div className="avatar-info">
            <Title className="title-product-name" level={5}>{store.storeName || "Không tên"}</Title>
            <p className="p-column-table">Khu vực: {store.areaName || "Chưa xác định"}</p>
          </div>
        </StyledAvatarGroup>
      ),
      Contact: (
        <Stacked>
          {store.email === null && store.phone === null ? (
            <span style={{ fontSize: 14 }}>Chưa cập nhật</span>
          ) : (
            <>
              <span>{store.email !== null ? store.email : "Chưa cập nhật Email"}</span>
              <span>{store.phone !== null ? formatPhoneNumber(store.phone) : "Chưa cập nhật số điện thoại"}</span>
            </>
          )}
        </Stacked>
      ),
      Hours: (
        <StackedTime>
          <span>Mở cửa: <StackedTimeFrameAbove>{formattedHours(openingHours)}</StackedTimeFrameAbove></span>
          <span>Đóng cửa: <StackedTimeFrameBelow>{formattedHours(closingHours)}</StackedTimeFrameBelow></span>
        </StackedTime>
      ),
      State: (
        <StyledTagContainer>
          <Tag className="status-tag" color={store.state ? "cyan" : "error"}>
            {store.state ? "Hoạt động" : "Không hoạt động"}
          </Tag>
        </StyledTagContainer>
      ),
      action: (
        <div className="ant-employed-actions">
          <Link className="link-details" to={`/stores/${store.id}`}>
            <ButtonAction><HiEye /></ButtonAction>
          </Link>
          <Link to={`/stores/edit/${store.id}`} state={{ store }}>
            <ButtonAction><HiPencil /></ButtonAction>
          </Link>
        </div>
      ),
    };
  });

  const handleRowClick = (record, event) => {
    if (event.target.tagName === "BUTTON" || event.target.tagName === "svg" || event.target.tagName === "path") {
      return;
    }
    navigate(`/stores/${record.key}`);
  };

  return (
    <Spin spinning={isLoading}>
      <TableItem
        columns={columns}
        dataSource={data}
        handleSort={handleSort}
        limit={limit}
        label=""
        page={page}
        elements={stores.totalCount || 0}
        setPage={handlePageChange}
        setLimit={handleLimitChange}
        handleRowClick={handleRowClick}
      />
    </Spin>
  );
}

export default StoreList;
import { Avatar, Spin, Tag, Typography, Table, Pagination, Select } from "antd";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import imgDefaultStore from "../../assets/images/store.png";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import { ButtonAction } from "../../ui/custom/Button/Button";
import ConfirmDeleteItem from "../../ui/custom/Modal/ModalConfirm";
import {
  formatPhoneNumber,
  formattedHours,
  useImageValidity,
} from "../../utils/helpers";
import { useStore } from "./useStore";
import SetRowsPerPage from "./SetRowsPerPage";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-left: 1rem; /* Added margin-left for alignment */
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
  margin-left: 1rem; /* Consistent margin-left for alignment */
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
  margin-left: 1rem; /* Consistent margin-left for alignment */
`;

const StyledTagContainer = styled.div`
  display: flex;
  justify-content: center; /* Ensure the tag is centered */
  align-items: center;
`;

function StoreList() {
  const { Title } = Typography;
  const {
    isLoading,
    isDeleting,
    stores,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    setSort,
    removeStore,
    isModalVisible,
    setIsModalVisible,
  } = useStore();
  const navigate = useNavigate();

  const storeImages = stores?.result?.map((store) => store.avatar);
  const isValidImages = useImageValidity(stores?.result, storeImages);

  const handleSort = (sorter) => {
    const sortOrder = sorter.order === "ascend" ? "asc" : "desc";
    setSort(`${sorter.field},${sortOrder}`);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "Cửa hàng",
      dataIndex: "StoreName",
      key: "StoreName",
      width: "18%",
      sorter: true,
    },
    {
      title: "Liên hệ",
      dataIndex: "Contact",
      key: "Contact",
    },
    {
      title: "Thời gian làm việc",
      dataIndex: "Hours",
      key: "Hours",
    },
    {
      title: "Trạng thái",
      dataIndex: "State",
      key: "State",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
    },
  ];

  if (isLoading) {
    return <Spin />;
  }

  if (!stores?.result?.length) return <Empty resourceName="cửa hàng" />;

  const dataSource = stores?.result?.map((store, index) => {
    const dataIndex = (page - 1) * limit + index + 1;
    const isValid = isValidImages[index];
    const avatarSrc = isValid ? store.avatar : imgDefaultStore;

    const openingHours = store.openingHours || "00:00:00";
    const closingHours = store.closingHours || "00:00:00";

    return {
      key: store.id,
      number: dataIndex,
      StoreName: (
        <StyledAvatarGroup>
          <Avatar
            className="shape-avatar-product"
            shape="square"
            src={avatarSrc}
          />
          <div className="avatar-info">
            <Title className="title-product-name" level={5}>
              {store.storeName}
            </Title>
            <p className="p-column-table">Khu vực: {store.areaName}</p>
          </div>
        </StyledAvatarGroup>
      ),
      Hours: (
        <StackedTime>
          <span>
            Mở cửa:{" "}
            <StackedTimeFrameAbove>
              {formattedHours(openingHours)}
            </StackedTimeFrameAbove>
          </span>
          <span>
            Đóng cửa:{" "}
            <StackedTimeFrameBelow>
              {formattedHours(closingHours)}
            </StackedTimeFrameBelow>
          </span>
        </StackedTime>
      ),
      Contact: (
        <Stacked>
          {store.email === null && store.phone === null ? (
            <span style={{ fontSize: 14 }}>Chưa cập nhật</span>
          ) : (
            <>
              <span>
                {store.email !== null ? store.email : "Chưa cập nhật Email"}
              </span>
              <span>
                {store.phone !== null
                  ? formatPhoneNumber(store.phone)
                  : "Chưa cập nhật số điện thoại"}
              </span>
            </>
          )}
        </Stacked>
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
          <Link to={`/stores/edit/${store.id}`} state={{ store }}>
            <ButtonAction>
              <HiPencil />
            </ButtonAction>
          </Link>
        </div>
      ),
    };
  });

  return (
    <Spin spinning={isLoading}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        onChange={(pagination, filters, sorter) => handleSort(sorter)}
        rowKey="key"
        onRow={(record) => ({
          onClick: (event) => {
            if (
              event.target.tagName === "BUTTON" ||
              event.target.tagName === "svg" ||
              event.target.tagName === "path"
            ) {
              return;
            }
            navigate(`/stores/${record.key}`);
          },
        })}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <Pagination
          current={page}
          total={stores?.totalCount}
          pageSize={limit}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
        <SetRowsPerPage size={limit} onChange={handleLimitChange} />
      </div>
    </Spin>
  );
}

export default StoreList;
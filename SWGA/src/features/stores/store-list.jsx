// store-list.jsx
import { Avatar, Spin, Tag, Typography } from "antd";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import imgDefaultStore from "../../assets/images/store.png";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import { ButtonAction } from "../../ui/custom/Button/Button";
import ConfirmDeleteItem from "../../ui/custom/Modal/ModalConfirm";
import { TableItem } from "../../ui/custom/Table/TableItem";
import { formatPhoneNumber, formattedHours, useImageValidity } from "../../utils/helpers";
import { useStore } from "./useStore";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

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
`;

const StackedTimeFrameAbove = styled.span`
  color: #2ecc71;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
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

  // Hàm xử lý việc sort store theo corresponding fields
  const handleSort = (pagination, filters, sorter) => {
    const sortOrder = sorter.order === "ascend" ? "asc" : "desc";

    switch (sorter.field) {
      case "StoreName":
        setSort(`${sorter.field},${sortOrder}`);
        break;
      default:
        // Xử lý các trường hợp khác
        break;
    }
  };

  // Table code start
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
      key: "State",
      dataIndex: "State",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "action",
      align: "center",
    },
  ];

  if (isLoading) {
    return (
      <Spin>
        <TableItem columns={columns} dataSource={[]} pagination={false} />
      </Spin>
    );
  }

  if (!stores?.result?.length) return <Empty resourceName="cửa hàng" />;

  const data = stores?.result?.map((store, index) => {
    const dataIndex = (page - 1) * limit + index + 1;
    const isValid = isValidImages[index];
    const avatarSrc = isValid ? store.avatar : imgDefaultStore;

    // Kiểm tra và xử lý giá trị thời gian
    const openingHours = store.openingHours || '00:00:00'; // Giá trị mặc định nếu null/undefined
    const closingHours = store.closingHours || '00:00:00'; // Giá trị mặc định nếu null/undefined

    return {
      key: store.id,
      number: (
        <>
          <div className="number-header">
            <span>{dataIndex}</span>
          </div>
        </>
      ),
      StoreName: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar-product" shape="square" src={avatarSrc} />
            <div className="avatar-info">
              <Title className="title-product-name" level={5}>
                {store.storeName}
              </Title>
              <p className="p-column-table">Khu vực: {store.areaName}</p>
            </div>
          </Avatar.Group>
        </>
      ),
      Hours: (
        <>
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
        </>
      ),
      Contact: (
        <>
          <Stacked>
            {store.email === null && store.phone === null ? (
              <span style={{ fontSize: 14 }}>Chưa cập nhật</span>
            ) : (
              <>
                <span>{store.email !== null ? store.email : "Chưa cập nhật Email"}</span>
                <span>
                  {store.phone !== null ? formatPhoneNumber(store.phone) : "Chưa cập nhật số điện thoại"}
                </span>
              </>
            )}
          </Stacked>
        </>
      ),
      State: (
        <>
          <Tag className="status-tag" color={store.state ? "cyan" : "error"}>
            {store.state ? "Hoạt động" : "Không hoạt động"}
          </Tag>
        </>
      ),
      action: (
        <>
          <div className="ant-employed-actions">
            <Link to={`/stores/edit/${store.id}`} state={{ store }}>
              <ButtonAction>
                <HiPencil />
              </ButtonAction>
            </Link>
            <div>
              <Modal>
                <Modal.Open opens="delete">
                  <ButtonAction>
                    <HiTrash />
                  </ButtonAction>
                </Modal.Open>
                <Modal.Window name="delete">
                  <ConfirmDeleteItem
                    resourceName="cửa hàng"
                    disabled={isDeleting}
                    onConfirm={() => {
                      removeStore(store.id);
                    }}
                    visible={isModalVisible}
                    setVisible={setIsModalVisible}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>
        </>
      ),
    };
  });

  const handleRowClick = (record, columnKey) => {
    if (
      columnKey.target.tagName === "BUTTON" ||
      columnKey.target.tagName === "svg" ||
      columnKey.target.tagName === "path"
    ) {
      return; // Không thực hiện chuyển hướng
    }

    navigate(`/stores/${record.key}`);
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <TableItem
          columns={columns}
          dataSource={data}
          handleSort={handleSort}
          limit={limit}
          label="Cửa hàng / Trang"
          page={page}
          elements={stores?.totalCount}
          setPage={handlePageChange}
          setLimit={handleLimitChange}
          handleRowClick={handleRowClick}
        />
      </Spin>
    </>
  );
}

export default StoreList;
import { Avatar, Spin, Tag, Typography } from "antd";
import { HiPencil } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import imgDefaultCampus from "../../../assets/images/campus.png";
import Empty from "../../../ui/Empty";
import Modal from "../../../ui/Modal";
import { ButtonAction } from "../../../ui/custom/Button/Button";
import { TableItem } from "../../../ui/custom/Table/TableItem";
import { formatDate, formatPhoneNumber, useImageValidity } from "../../../utils/helpers";
import { useCampuses } from "./useCampuses";
import CampusFormUpdate from "../ModalCampusUpdate/campus-form-update";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.4rem;
`;

function CampusList() {
  const { Title } = Typography;
  const {
    isLoading,
    campuses,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    setSort,
  } = useCampuses();
  const navigate = useNavigate();

  // Sửa từ campuses.result thành campuses.items
  const campusImages = campuses?.items?.map((campus) => campus.image);
  const isValidImages = useImageValidity(campuses?.items, campusImages);

  // Handle sorting for campuses
  const handleSort = (pagination, filters, sorter) => {
    const sortOrder = sorter.order === "ascend" ? "asc" : "desc";
    switch (sorter.field) {
      case "CampusName":
        setSort(`${sorter.field},${sortOrder}`);
        break;
      default:
        break;
    }
  };

  const columns = [
    { title: "STT", dataIndex: "number", key: "number", align: "center" },
    { title: "Campus", dataIndex: "CampusName", key: "CampusName", width: "18%", sorter: true },
    { title: "Liên hệ", dataIndex: "Contact", key: "Contact" },
    { title: "Ngày tạo", dataIndex: "DateCreated", key: "DateCreated", align: "center" },
    { title: "Trạng thái", key: "State", dataIndex: "State", align: "center" },
    { title: <div className="header-login">Hành động</div>, key: "action", dataIndex: "action" },
  ];

  if (isLoading) {
    return (
      <Spin>
        <TableItem columns={columns} dataSource={[]} pagination={false} />
      </Spin>
    );
  }

  // Sửa từ campuses.result thành campuses.items
  if (!campuses?.items?.length) return <Empty resourceName="campus" />;

  // Sửa từ campuses.result thành campuses.items
  const data = campuses?.items?.map((campus, index) => {
    const dataIndex = (page - 1) * limit + index + 1;
    const isValid = isValidImages[index];
    const avatarSrc = isValid ? campus.image : imgDefaultCampus;

    return {
      key: campus.id,
      number: (
        <div className="number-header">
          <span>{dataIndex}</span>
        </div>
      ),
      CampusName: (
        <Avatar.Group>
          <Avatar className="shape-avatar-product" shape="square" src={avatarSrc} />
          <div className="avatar-info">
            <Title className="title-product-name" level={5}>
              {campus.campusName}
            </Title>
          </div>
        </Avatar.Group>
      ),
      Contact: (
        <Stacked>
          {campus.email === null && campus.phone === null ? (
            <p className="style-p-contact">Chưa cập nhật</p>
          ) : (
            <>
              <p className="style-p-contact">
                {campus.email !== null ? campus.email : "Chưa cập nhật Email"}
              </p>
              <p>
                {campus.phone !== null
                  ? formatPhoneNumber(campus.phone)
                  : "Chưa cập nhật số điện thoại"}
              </p>
            </>
          )}
        </Stacked>
      ),
      DateCreated: <>{formatDate(campus.dateCreated)}</>,
      State: (
        <Tag className="status-tag" color={campus.state ? "cyan" : "error"}>
          {campus.state ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
      action: (
        <div className="ant-employed-actions">
          <div>
            <Modal>
              <Modal.Open opens="edit">
                <ButtonAction>
                  <HiPencil />
                </ButtonAction>
              </Modal.Open>
              <Modal.Window name="edit">
                <CampusFormUpdate campusToEdit={campus} />
              </Modal.Window>
            </Modal>
          </div>
          <div></div>
        </div>
      ),
    };
  });

  const handleRowClick = (record, columnKey) => {
    if (
      columnKey.target.tagName === "BUTTON" ||
      columnKey.target.tagName === "INPUT" ||
      columnKey.target.tagName === "TEXTAREA" ||
      columnKey.target.tagName === "SELECT" ||
      columnKey.target.tagName === "SPAN" ||
      columnKey.target.tagName === "DIV" ||
      columnKey.target.tagName === "IMG" ||
      columnKey.target.tagName === "svg" ||
      columnKey.target.tagName === "path"
    ) {
      return;
    }
    navigate(`/campus/${record.key}`); // Sửa từ /campuses thành /campus
  };

  return (
    <Spin spinning={isLoading}>
      <TableItem
        columns={columns}
        dataSource={data}
        handleSort={handleSort}
        limit={limit}
        label="Campus / Trang"
        page={page}
        elements={campuses?.total} // Sửa từ totalCount thành total để khớp với dữ liệu API
        setPage={handlePageChange}
        setLimit={handleLimitChange}
        handleRowClick={handleRowClick}
      />
    </Spin>
  );
}

export default CampusList;
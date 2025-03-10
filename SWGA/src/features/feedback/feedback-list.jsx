import { Spin, Tag, Typography } from "antd";
import { HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import { ButtonAction } from "../../ui/custom/Button/Button";
import ConfirmDeleteItem from "../../ui/custom/Modal/ModalConfirm";
import { TableItem } from "../../ui/custom/Table/TableItem";
import { useFeedback } from "./useFeedback";

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

function FeedbackList() {
  const { Title } = Typography;
  const {
    isLoading,
    isDeleting,
    feedbacks,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    removeFeedback,
    isModalVisible,
    setIsModalVisible
  } = useFeedback();
  const navigate = useNavigate();

  const columns = [
    {
      title: "STT",
      dataIndex: "number",
      key: "number",
      align: "center"
    },
    {
      title: "Tiêu đề",
      dataIndex: "FeedbackTitle",
      key: "FeedbackTitle",
      sorter: true
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email"
    },
    {
      title: "Nội dung",
      dataIndex: "Content",
      key: "Content"
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: "Status",
      align: "center"
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center"
    }
  ];

  if (isLoading) {
    return (
      <Spin>
        <TableItem columns={columns} dataSource={[]} pagination={false} />
      </Spin>
    );
  }

  if (!feedbacks?.result?.length) return <Empty resourceName="phản hồi" />;

  const data = feedbacks.result.map((feedback, index) => {
    const dataIndex = (page - 1) * limit + index + 1;
    return {
      key: feedback.id,
      number: (
        <div className="number-header">
          <span>{dataIndex}</span>
        </div>
      ),
      FeedbackTitle: (
        <div>
          <Title level={5}>{feedback.title}</Title>
          <p>Loại: {feedback.categoryName}</p>
        </div>
      ),
      Email: (
        <Stacked>
          <span>{feedback.email || "Chưa cập nhật Email"}</span>
        </Stacked>
      ),
      Content: <span>{feedback.content}</span>,
      Status: (
        <Tag color={feedback.status === "read" ? "cyan" : "error"}>
          {feedback.status === "read" ? "Đã đọc" : "Chưa đọc"}
        </Tag>
      ),
      action: (
        <div className="ant-employed-actions">
          <Modal>
            <Modal.Open opens="delete">
              <ButtonAction>
                <HiTrash />
              </ButtonAction>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDeleteItem
                resourceName="phản hồi"
                disabled={isDeleting}
                onConfirm={() => {
                  removeFeedback(feedback.id);
                }}
                visible={isModalVisible}
                setVisible={setIsModalVisible}
              />
            </Modal.Window>
          </Modal>
        </div>
      )
    };
  });

  const handleRowClick = (record, columnKey) => {
    // Không chuyển hướng nếu click vào button/svg
    if (
      columnKey.target.tagName === "BUTTON" ||
      columnKey.target.tagName === "svg" ||
      columnKey.target.tagName === "path"
    ) {
      return;
    }
    navigate(`/feedback/${record.key}`);
  };

  return (
    <Spin spinning={isLoading}>
      <TableItem
        columns={columns}
        dataSource={data}
        handleRowClick={handleRowClick}
        page={page}
        limit={limit}
        elements={feedbacks.totalCount}
        setPage={handlePageChange}
        setLimit={handleLimitChange}
      />
    </Spin>
  );
}

export default FeedbackList;
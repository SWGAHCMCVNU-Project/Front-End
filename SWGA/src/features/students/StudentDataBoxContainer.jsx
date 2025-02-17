/* eslint-disable no-undef */
import { Switch, Tabs } from "antd";
import { useEffect, useState } from "react";
import { HiMiniCheck, HiMiniXMark } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ConfirmUpdateState from "../../ui/ConfirmUpdateState";
import Modal from "../../ui/Modal";
import ChallengesByStudentId from "./ChallengesByStudentId";
import ConfirmUpdateStateReason from "./ConfirmUpdateStateReason";
import HistoriesByStudentId from "./HistoriesByStudentId";
import OrdersByStudentId from "./OrdersByStudentId";
import StudentDataBoxDetail from "./StudentDataBoxDetail";
import VouchersStudent from "./VouchersStudent";
import WishlistsByStudentId from "./WishlistsByStudentId";
import { useStudentDetails } from "./useStudentDetails";
import Table from "../../ui/Table";
import StudentRow from "./StudentRow";
import Spinner from "../../ui/Spinner";

const StyledStudentDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const ContainerButton = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  color: var(--color-green-600);
  font-weight: 600;
`;

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.5rem;
  font-weight: 500;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;

function StudentDataBoxContainer() {
  const [activeTabKey, setActiveTabKey] = useState("students");
  const { students, isLoading } = useStudentDetails();

  let operations = (
    <Modal>
      <Modal.Open opens="view-students">
        <Button>Xem danh sách sinh viên</Button>
      </Modal.Open>
      
      <Modal.Window name="view-students">
        <Table columns="0.6fr 2fr 1.8fr 2.4fr 1.4fr 1.2fr">
          <Table.Header>
            <div>STT</div>
            <div>Họ và tên</div>
            <div>Mã số</div>
            <div>Email</div>
            <div>Số điện thoại</div>
            <div>Trạng thái</div>
          </Table.Header>

          <Table.Body
            data={students?.result}
            render={(student, index) => (
              <StudentRow 
                student={student} 
                index={index + 1}
              />
            )}
          />
        </Table>
      </Modal.Window>
    </Modal>
  );

  const items = [
    {
      key: "students",
      label: "Thông tin sinh viên",
      children: <StudentDataBoxDetail student={students?.result?.[0]} />,
    },
    {
      key: "orders",
      label: "Đơn hàng",
      children: <OrdersByStudentId />,
    },
    {
      key: "histories",
      label: "Lịch sử",
      children: <HistoriesByStudentId />,
    },
    {
      key: "challenges",
      label: "Thử thách",
      children: <ChallengesByStudentId />,
    },
    {
      key: "vouchers",
      label: "Ưu đãi",
      children: <VouchersStudent />,
    },
    {
      key: "wishlists",
      label: "Yêu thích",
      children: <WishlistsByStudentId />,
    },
  ];

  if (isLoading) return <Spinner />;

  return (
    <StyledStudentDataBox>
      <Section>
        <Guest>
          <Tabs
            defaultActiveKey="students"
            activeKey={activeTabKey}
            onChange={(key) => setActiveTabKey(key)}
            tabBarExtraContent={operations}
            items={items}
          />
        </Guest>
      </Section>
    </StyledStudentDataBox>
  );
}

export default StudentDataBoxContainer;

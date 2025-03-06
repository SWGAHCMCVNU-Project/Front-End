import { Tabs } from "antd";
import styled from "styled-components";
import Heading from "../../ui/Heading";
// import CreateVoucherItemByTemplate from "./CreateVoucherItemByTemplate";
import CreateVoucherItemForm from "./CreateVoucherItemForm";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  margin-bottom: 1rem;
`;

function CreateVoucherItem({ onCloseModal }) {
  const items = [
    {
      key: "auto-generated",
      label: "Tạo",
      children: <CreateVoucherItemForm onCloseModal={onCloseModal} />,
    },
    // {
    //   key: "insert-template",
    //   label: "Nhập file theo mẫu",
    //   children: <CreateVoucherItemByTemplate onCloseModal={onCloseModal} />,
    // },
  ];
  return (
    <>
      <HeadingGroup>
        <Heading as="h2">Tạo phiếu ưu đãi</Heading>
      </HeadingGroup>
      <Tabs defaultActiveKey="auto-generated" items={items} />
    </>
  );
}

export default CreateVoucherItem;

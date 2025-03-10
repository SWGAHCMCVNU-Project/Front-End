import { Tabs } from "antd";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import CreateVoucherForm from "./CreateVoucherForm";
import CreateVoucherTypeForm from "./CreateVoucherTypeForm";
import PropTypes from "prop-types";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  margin-bottom: 1rem;
`;

function CreateVoucher({ onCloseModal }) {
  const items = [
    { key: "create-voucher", label: "Tạo phiếu ưu đãi", children: <CreateVoucherForm onCloseModal={onCloseModal} /> },
    { key: "create-type", label: "Tạo loại ưu đãi", children: <CreateVoucherTypeForm onCloseModal={onCloseModal} /> },
  ];

  return (
    <>
      <HeadingGroup>
        <Heading as="h2">Tạo phiếu ưu đãi</Heading>
      </HeadingGroup>
      <Tabs defaultActiveKey="create-voucher" items={items} />
    </>
  );
}

CreateVoucher.propTypes = {
  onCloseModal: PropTypes.func
};

export default CreateVoucher;
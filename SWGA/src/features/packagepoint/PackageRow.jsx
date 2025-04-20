import { HiPencil } from "react-icons/hi2";
import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import PackageForm from "./PackageForm";
import { useUpdatePointPackage } from "../../hooks/point-package/useUpdatePointPackage";
import PropTypes from "prop-types";
import Tag from "../../ui/Tag";

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-grey-50);
  }
  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const PackageIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #1c5d78;
`;

const PackageName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const PackageValue = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const StyledTableRow = styled(Table.Row)`
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  & > div:nth-child(2) {
    justify-content: flex-start;
  }
`;

const StatusTag = styled.div`
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: ${(props) => 
    props.$status ? "var(--color-cyan-100)" : "var(--color-red-100)"};
  color: ${(props) => 
    props.$status ? "var(--color-cyan-700)" : "var(--color-red-700)"};
`;

function PackageRow({ id, packageName, point, price, status, displayedIndex }) {
  const { update, isUpdating } = useUpdatePointPackage();

  return (
    <StyledTableRow>
      <PackageIndex>{displayedIndex}</PackageIndex>
      <PackageName>{packageName}</PackageName>
      <PackageValue>{point}</PackageValue>
      <PackageValue>{price.toLocaleString()}</PackageValue>
      <div>
      <div>
        <Tag type={status ? "cyan" : "error"}>{status ? "Hoạt động" : "Không hoạt động"}</Tag>
      </div>
      </div>
      <StyledAction>
        <Modal>
          <Modal.Open opens={`edit-${id}`}>
            <StyledButton disabled={isUpdating}>
              <HiPencil />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name={`edit-${id}`}>
            <PackageForm
              packageToEdit={{ id, packageName, point, price, status }}
              onCloseModal={() => {}}
              onSubmit={update}
            />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </StyledTableRow>
  );
}

PackageRow.propTypes = {
  id: PropTypes.string.isRequired,
  packageName: PropTypes.string.isRequired,
  point: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
  displayedIndex: PropTypes.number.isRequired,
};

export default PackageRow;
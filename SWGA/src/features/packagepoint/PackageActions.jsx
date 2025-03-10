import styled from "styled-components";
import Button from "../../ui/Button";
import { useEffect } from "react"; // Loại bỏ useContext
import usePackages from "./usePackages"; // Sử dụng usePackages thay vì context

const PackageActionsContainer = styled.div`
  margin-bottom: 1.5rem;
  display: ${props => props.isVisible ? 'block' : 'none'};
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`;

const BuyButton = styled(Button)`
  background-color: #28a745;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }
`;

function PackageActions({ isVisible, onAdd }) {
  const { buyPackage } = usePackages(); // Gọi usePackages để lấy buyPackage

  return (
    <PackageActionsContainer isVisible={isVisible}>
      <BuyButton onClick={onAdd}>Mua gói mới</BuyButton>
    </PackageActionsContainer>
  );
}

export default PackageActions;
import { useState, useEffect } from "react"; // Loại bỏ useContext
import styled from "styled-components";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { SelectForm } from "../../ui/custom/Select/SelectBox/SelectForm";
import Button from "../../ui/Button";
import usePackages from "./usePackages"; // Sử dụng usePackages thay vì context

const StyledModal = styled(Modal)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

function PackageForm({ isOpen, onClose, initialData }) {
  const { buyPackage } = usePackages(); // Gọi usePackages để lấy buyPackage
  const [formData, setFormData] = useState(initialData || {
    packageId: mockData.mockPackages[0]?.id || 1,
    campusId: 1, // Giả định campusId = 1
    pointsPurchased: 0,
    pricePaid: 0,
  });

  const handleChange = (value) => {
    const selectedPackage = mockData.mockPackages.find((pkg) => pkg.id === value);
    setFormData({
      packageId: selectedPackage.id,
      campusId: 1,
      pointsPurchased: selectedPackage.points,
      pricePaid: selectedPackage.price,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buyPackage(formData);
    onClose();
  };

  return (
    <StyledModal isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <SelectForm
            options={mockData.mockPackages
              .filter((pkg) => pkg.state === "active")
              .map((pkg) => ({ value: pkg.id, label: `${pkg.name} (${pkg.points} điểm, ${pkg.price} VND)` }))}
            value={formData.packageId}
            onChange={handleChange}
            disabled={false}
            inModal={true}
            style={{
              border: '1px solid var(--color-grey-300)',
              borderRadius: '8px',
              padding: '0.6rem',
            }}
          />
        </FormRow>
        <Button 
          type="submit"
          style={{ backgroundColor: '#28a745', marginTop: '1rem' }}
        >
          Xác nhận
        </Button>
      </Form>
    </StyledModal>
  );
}

// Giả định mockData được import từ mockData.js
import mockData from "./mockData";

export default PackageForm;
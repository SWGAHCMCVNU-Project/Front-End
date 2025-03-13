import { useState } from "react";
import { HiPencil } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { useBrands } from "../../hooks/brand/useBrands"; // Import useBrands

function BrandDetailModal({ brand }) {
  const [formData, setFormData] = useState(brand);
  const { updateBrand } = useBrands(); // Lấy hàm updateBrand từ useBrands

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    updateBrand(formData.id, formData); // Gọi hàm updateBrand
  };

  return (
    <div>
      <h2>Brand Details</h2>
      <input
        type="text"
        name="brandName"
        value={formData.brandName}
        onChange={handleChange}
        placeholder="Brand Name"
      />
      {/* Thêm các trường khác nếu cần */}
      
      <Button onClick={handleSubmit}>
        <HiPencil /> Update
      </Button>
    </div>
  );
}

export default BrandDetailModal;

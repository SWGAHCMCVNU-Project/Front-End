import { useState } from "react"; // Chỉ cần useState, không cần useEffect vì không quản lý dữ liệu
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PackageTable from "../../features/packagepoint/PackageTable";
import PackageFilters from "../../features/packagepoint/PackageFilters";
import PackageForm from "../../features/packagepoint/PackageForm";
import PackageActions from "../../features/packagepoint/PackageActions";
import PackageDetails from "../../features/packagepoint/PackageDetails";
import Heading from "../../ui/Heading";
import Empty from "../../ui/Empty";

const PackagePointContainer = styled.div`
  padding: 2rem;
`;

function PackagePoint() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Không sử dụng bất kỳ dữ liệu hoặc logic nào ở đây, chỉ hiển thị giao diện và truyền props
  // Dữ liệu sẽ được quản lý hoàn toàn trong các component trong features/packagepoint

  return (
    <PackagePointContainer>
      <Heading as="h1">Gói điểm của Campus</Heading>
      <PackageDetails
        currentPackage={null} // Không truyền dữ liệu, để PackageDetails tự xử lý
        onUpgrade={() => {}} // Không truyền callback, để PackageDetails tự xử lý logic
        onRenew={() => {}} // Không truyền callback, để PackageDetails tự xử lý logic
        onCancel={() => {}} // Không truyền callback, để PackageDetails tự xử lý logic
      />
      <PackageFilters onSearch={setSearchTerm} onFilter={setFilterState} />
      <PackageActions onAdd={() => setIsOpenForm(true)} />
      <PackageTable
        searchTerm={searchTerm}
        filterState={filterState}
        packages={[]} // Không truyền dữ liệu, để PackageTable tự xử lý
        onEdit={setSelectedPackage} // Truyền hàm để PackageTable cập nhật selectedPackage
        onUpgrade={() => {}} // Không truyền callback, để PackageTable tự xử lý logic
        onRenew={() => {}} // Không truyền callback, để PackageTable tự xử lý logic
        onCancel={() => {}} // Không truyền callback, để PackageTable tự xử lý logic
      />
      {isOpenForm && (
        <PackageForm
          isOpen={isOpenForm}
          onClose={() => setIsOpenForm(false)}
          onSubmit={() => {}} // Không truyền callback, để PackageForm tự xử lý logic
          initialData={selectedPackage} // Truyền selectedPackage để PackageForm sử dụng
          availablePackages={[]} // Không truyền dữ liệu, để PackageForm tự xử lý
        />
      )}
    </PackagePointContainer>
  );
}

export default PackagePoint;
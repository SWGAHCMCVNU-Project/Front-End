import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import LocationRow from "./LocationRow";
import SetRowsPerPage from "./SetRowsPerPage";
import { useSearchParams } from "react-router-dom";
import useGetLocation from "../../hooks/location/useGetLocation";
import { toast } from "react-hot-toast";
import { Pagination } from "antd";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

function LocationTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;
  const searchTerm = searchParams.get("searchName") || "";

  const { data: locations, error, isLoading } = useGetLocation();

  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage.toString(),
      size: pageSize.toString(),
      ...(searchTerm && { searchName: searchTerm }),
    });
  };

  const handlePageSizeChange = (newSize) => {
    setSearchParams({
      size: newSize.toString(),
      page: "1",
      ...(searchTerm && { searchName: searchTerm }),
    });
  };

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Có lỗi khi tải danh sách địa điểm");
    return null;
  }
  if (!locations || !locations.length) {
    return <Empty resource="địa điểm" />;
  }

  // Apply client-side filtering for search
  let filteredLocations = locations;
  if (searchTerm) {
    filteredLocations = filteredLocations.filter((loc) =>
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply pagination
  const totalCount = filteredLocations.length;
  const paginatedLocations = filteredLocations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <TableContainer>
      {!paginatedLocations.length ? (
        <Empty resource="địa điểm" />
      ) : (
        <Menus>
          <Table columns="0.5fr 2fr 2fr 1fr 1fr 1fr">
            <Table.Header>
              <div>STT</div>
              <div>Tên địa điểm</div>
              <div>Địa chỉ</div>
              <div>Vĩ độ</div>
              <div>Kinh độ</div>
              <div>Hành động</div>
            </Table.Header>

            <Table.Body
              data={paginatedLocations}
              render={(location, index) => (
                <LocationRow
                  key={location.id}
                  {...location}
                  displayedIndex={(currentPage - 1) * pageSize + index + 1}
                />
              )}
            />

            <Table.Footer>
              <FooterContainer>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalCount}
                  onChange={handlePageChange}
                  onShowSizeChange={(current, size) =>
                    handlePageSizeChange(size)
                  }
                />
                <SetRowsPerPage
                  size={pageSize}
                  onChange={handlePageSizeChange}
                />
              </FooterContainer>
            </Table.Footer>
          </Table>
        </Menus>
      )}
    </TableContainer>
  );
}

export default LocationTable;
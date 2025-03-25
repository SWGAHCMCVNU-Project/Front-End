import { useEffect } from 'react';
import styled from 'styled-components';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import PackageRow from './PackageRow';
import SetRowsPerPage from './SetRowsPerPage';
import { useSearchParams } from 'react-router-dom';
import { usePointPackages } from '../../hooks/point-package/usePointPackages';
import { toast } from 'react-hot-toast';
import { Pagination } from 'antd'; // Import Pagination từ Ant Design

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

function PackageTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('size')) || 10;
  const searchTerm = searchParams.get('searchName') || ''; // Đồng bộ với searchName
  const status = searchParams.get('status') || '';

  const { pointPackages, error, isLoading } = usePointPackages({
    page: currentPage,
    size: pageSize,
    searchName: searchTerm,
    status: status === "" ? null : status === "active",
  });


  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage.toString(),
      size: pageSize.toString(),
      ...(searchTerm && { searchName: searchTerm }), // Đồng bộ với searchName
      ...(status && { status }),
    });
  };

  const handlePageSizeChange = (newSize) => {
    setSearchParams({
      size: newSize.toString(),
      page: '1',
      ...(searchTerm && { searchName: searchTerm }), // Đồng bộ với searchName
      ...(status && { status }),
    });
  };

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error('Có lỗi khi tải danh sách gói điểm');
    return null;
  }
  if (!pointPackages || !pointPackages.data) {
    return <Empty resource='gói điểm' />;
  }

  const packages = pointPackages.data.items || [];
  const totalCount = pointPackages.data.total || 0;

  return (
    <TableContainer>
      {!packages.length ? (
        <Empty resource='gói điểm' />
      ) : (
        <Menus>
          <Table columns='0.5fr 2fr 1fr 1.5fr 1fr 1fr'>
            <Table.Header>
              <div>STT</div>
              <div>Tên gói</div>
              <div>Điểm</div>
              <div>Giá (VND)</div>
              <div>Trạng thái</div>
              <div>Hành động</div>
            </Table.Header>

            <Table.Body
              data={packages}
              render={(pointPackage, index) => (
                <PackageRow
                  key={pointPackage.id}
                  {...pointPackage}
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
                  //  
                  onShowSizeChange={(current, size) => handlePageSizeChange(size)}
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

export default PackageTable;  
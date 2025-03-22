import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CampaignTypeRow from './CampaignTypeRow';
import SetRowsPerPage from './SetRowsPerPage';
import { useSearchParams } from 'react-router-dom';
import { useCampaignTypes } from '../../hooks/campaign-type/useCampaignTypes';
import { toast } from 'react-hot-toast';

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function CampaignTypeTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('size')) || 10;
  const [sortOrder] = useState(true);
  const searchTerm = searchParams.get('searchName') || '';

  const { campaignTypes, error, isLoading, totalCount, totalPages } = useCampaignTypes({
    page: currentPage,
    size: pageSize,
    searchName: searchTerm,
    isAsc: sortOrder,
    state: true,
  });

  useEffect(() => {
    if (campaignTypes?.length === 0 && currentPage > 1 && !isLoading) {
      setSearchParams({
        page: (currentPage - 1).toString(),
        size: pageSize.toString(),
        ...(searchTerm && { searchName: searchTerm }),
      });
    }
  }, [campaignTypes, currentPage, pageSize, searchTerm, setSearchParams, isLoading]);

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
      page: '1',
      ...(searchTerm && { searchName: searchTerm }),
    });
  };

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error('Có lỗi khi tải danh sách loại chiến dịch');
    return null;
  }
  if (!campaignTypes) {
    return <Empty resource='loại chiến dịch' />;
  }

  return (
    <TableContainer>
      {!campaignTypes.length ? (
        <Empty resource='loại chiến dịch' />
      ) : (
        <Menus>
          <Table columns='0.5fr 2fr 2fr 1fr 1fr'>
            <Table.Header>
              <div>STT</div>
              <div>Tên loại chiến dịch</div>
              <div>Mô tả</div>
              <div>Trạng thái</div>
              <div>Hành động</div>
            </Table.Header>

            <Table.Body
              data={campaignTypes}
              render={(campaignType, index) => (
                <CampaignTypeRow
                  key={campaignType.id}
                  {...campaignType}
                  displayedIndex={(currentPage - 1) * pageSize + index + 1}
                />
              )}
            />

            <Table.Footer>
              
              <SetRowsPerPage
                pageSize={pageSize}
                onLimitChange={handlePageSizeChange}
              />
              <Pagination
                count={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </Table.Footer>
          </Table>
        </Menus>
      )}
    </TableContainer>
  );
}

export default CampaignTypeTable;
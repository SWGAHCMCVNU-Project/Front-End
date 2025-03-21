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
import { useDebounced } from '../../hooks/useDebounced';
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
  const debouncedSearch = useDebounced(searchTerm, 500);

  useEffect(() => {
    if (searchTerm !== debouncedSearch) {
      setSearchParams(
        new URLSearchParams({
          page: '1',
          size: pageSize.toString(),
          ...(debouncedSearch && { searchName: debouncedSearch }),
        }),
        { replace: true }
      );
    }
  }, [debouncedSearch, searchTerm, pageSize, setSearchParams]);

  const { campaignTypes, error, isLoading } = useCampaignTypes({
    page: currentPage,
    size: pageSize,
    searchName: debouncedSearch,
    isAsc: sortOrder,
    state: true,
  });

  const campaignTypeData = {
    items: Array.isArray(campaignTypes) ? campaignTypes : [],
    total: campaignTypes?.length || 0,
    page: currentPage,
    size: pageSize,
    totalPages: Math.ceil((campaignTypes?.length || 0) / pageSize) || 1,
  };

  useEffect(() => {
    if (campaignTypeData?.items?.length === 0 && currentPage > 1) {
      setSearchParams(
        new URLSearchParams({
          page: (currentPage - 1).toString(),
          size: pageSize.toString(),
          ...(debouncedSearch && { searchName: debouncedSearch }),
        }),
        { replace: true }
      );
    }
  }, [campaignTypeData, currentPage, pageSize, debouncedSearch, setSearchParams]);

  const handlePageChange = (newPage) => {
    const maxPage = Math.max(1, campaignTypeData.totalPages || 1);
    if (newPage > maxPage) return;
    setSearchParams(
      new URLSearchParams({
        page: newPage.toString(),
        size: pageSize.toString(),
        ...(debouncedSearch && { searchName: debouncedSearch }),
      }),
      { replace: true }
    );
  };

  const handlePageSizeChange = (newSize) => {
    setSearchParams(
      new URLSearchParams({
        size: newSize.toString(),
        page: '1',
        ...(debouncedSearch && { searchName: debouncedSearch }),
      }),
      { replace: true }
    );
  };

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error('Có lỗi khi tải danh sách loại chiến dịch');
    return null;
  }
  if (!campaignTypeData || !campaignTypeData.items) {
    return <Empty resource='loại chiến dịch' />;
  }

  return (
    <TableContainer>
      {!campaignTypeData.items.length ? (
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
              data={campaignTypeData.items}
              render={(campaignType, index) => (
                <CampaignTypeRow
                  key={campaignType.id}
                  {...campaignType}
                  displayedIndex={(currentPage - 1) * pageSize + index + 1}
                />
              )}
            />

            <Table.Footer>
              <Pagination
                count={campaignTypeData.total}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              <SetRowsPerPage
                pageSize={pageSize}
                onLimitChange={handlePageSizeChange}
              />
            </Table.Footer>
          </Table>
        </Menus>
      )}
    </TableContainer>
  );
}

export default CampaignTypeTable;
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import ChallengeRow from './ChallengeRow';
import SetRowsPerPage from './SetRowsPerPage';
import { useSearchParams } from 'react-router-dom';
import { useGetAllChallenges } from '../../hooks/challenge/useGetAllChallenges';
import { toast } from 'react-hot-toast';
import { Pagination } from 'antd';

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

function ChallengeTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    page: Number(searchParams.get('page')) || 1,
    size: Number(searchParams.get('size')) || 10,
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || '',
  });

  const { challenges, totalCount, loading: isLoading, error } = useGetAllChallenges({
    page: params.page,
    size: params.size,
    search: params.search,
    status: params.status === '' ? null : params.status === 'active',
  });

  useEffect(() => {
    const currentParams = {
      page: Number(searchParams.get('page')) || 1,
      size: Number(searchParams.get('size')) || 10,
      search: searchParams.get('search') || '',
      status: searchParams.get('status') || '',
    };
    setParams(currentParams);
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage.toString(),
      size: params.size.toString(),
      ...(params.search && { search: params.search }),
      ...(params.status && { status: params.status }),
    });
  };

  const handlePageSizeChange = (newSize) => {
    setSearchParams({
      size: newSize.toString(),
      page: '1',
      ...(params.search && { search: params.search }),
      ...(params.status && { status: params.status }),
    });
  };

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error('Có lỗi khi tải danh sách thử thách');
    return null;
  }
  if (!challenges || !challenges.length) {
    return <Empty resource='thử thách' />;
  }

  return (
    <TableContainer>
      {!challenges.length ? (
        <Empty resource='thử thách' />
      ) : (
        <Menus>
          <Table columns='0.5fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr'>
            <Table.Header>
              <div>STT</div>
              <div>Tên thử thách</div>
              <div>Thưởng</div>
              <div>Điều kiện</div>
              <div>Loại</div>
              <div>Danh mục</div>
              <div>Trạng thái</div>
              <div>Hành động</div>
            </Table.Header>

            <Table.Body
              data={challenges}
              render={(challenge, index) => (
                <ChallengeRow
                  key={challenge.id}
                  {...challenge}
                  displayedIndex={(params.page - 1) * params.size + index + 1}
                />
              )}
            />

            <Table.Footer>
              <FooterContainer>
                <Pagination
                  current={params.page}
                  pageSize={params.size}
                  total={totalCount}
                  onChange={handlePageChange}
                  onShowSizeChange={(current, size) => handlePageSizeChange(size)}
                />
                <SetRowsPerPage
                  size={params.size}
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

export default ChallengeTable;
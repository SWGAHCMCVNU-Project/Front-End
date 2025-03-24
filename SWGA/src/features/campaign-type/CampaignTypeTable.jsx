import { useState } from "react";
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CampaignTypeRow from "./CampaignTypeRow";
import SetRowsPerPage from "./SetRowsPerPage";
import { useSearchParams } from "react-router-dom";
import { useCampaignTypes } from "../../hooks/campaign-type/useCampaignTypes";
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

function CampaignTypeTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPageSize = searchParams.get("size");
  const pageSize =
    rawPageSize && !isNaN(Number(rawPageSize)) ? Number(rawPageSize) : 10;
  const currentPage = Number(searchParams.get("page")) || 1;
  const [sortOrder] = useState(true);
  const searchTerm = searchParams.get("searchName") || "";

  const { campaignTypes, error, isLoading } = useCampaignTypes({
    page: currentPage,
    size: pageSize,
    searchName: searchTerm,
    isAsc: sortOrder,
    state: true,
  });

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    // KHÔNG set lại "size" hoặc các param khác ở đây
    setSearchParams(params, { replace: true }); // Thêm { replace: true } để tránh re-render không cần thiết
  };

  const handlePageSizeChange = (newSize) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", newSize.toString());
    params.set("page", "1"); // Reset về trang đầu tiên
    setSearchParams(params);
  };

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Có lỗi khi tải danh sách loại chiến dịch");
    return null;
  }
  if (!campaignTypes || !campaignTypes.data) {
    return <Empty resource="loại chiến dịch" />;
  }

  const types = campaignTypes.data.items || [];
  const totalCount = campaignTypes.data.total || 0;

  return (
    <TableContainer>
      {!types.length ? (
        <Empty resource="loại chiến dịch" />
      ) : (
        <Menus>
          <Table columns="0.5fr 2fr 2fr 1fr 1fr">
            <Table.Header>
              <div>STT</div>
              <div>Tên loại chiến dịch</div>
              <div>Mô tả</div>
              <div>Trạng thái</div>
              <div>Hành động</div>
            </Table.Header>

            <Table.Body
              data={types}
              render={(campaignType, index) => (
                <CampaignTypeRow
                  key={campaignType.id}
                  {...campaignType}
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
                  showSizeChanger={false}
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

export default CampaignTypeTable;

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
  const pageSize = rawPageSize && !isNaN(Number(rawPageSize)) ? Number(rawPageSize) : 10;
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("searchName") || "";

  const { campaignTypes, error, isLoading, totalCount } = useCampaignTypes({
    page: currentPage,
    size: pageSize,
    searchName: searchTerm,
    isAsc: true,
    state: true,
  });

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Có lỗi khi tải danh sách loại chiến dịch");
    return null;
  }
  if (!campaignTypes.length) {
    return <Empty resource="loại chiến dịch" />;
  }

  return (
    <TableContainer>
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
            <FooterContainer>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalCount}
                onChange={(newPage) => {
                  const params = new URLSearchParams(searchParams);
                  params.set("page", newPage.toString());
                  setSearchParams(params, { replace: true });
                }}
                showSizeChanger={false}
              />
              <SetRowsPerPage
                size={pageSize}
                onChange={(newSize) => {
                  const params = new URLSearchParams(searchParams);
                  params.set("size", newSize.toString());
                  params.set("page", "1");
                  setSearchParams(params);
                }}
              />
            </FooterContainer>
          </Table.Footer>
        </Table>
      </Menus>
    </TableContainer>
  );
}

export default CampaignTypeTable;
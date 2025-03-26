import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import CampaignRow from "./CampaignRow";
import Empty from "./Empty";
import BrandSetRowsPerPage from "./SetRowsPerPage";
import useCampaignsByBrandId from "../../hooks/campaign/useCampaignsByBrandId";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Container = styled.div`
  margin: 2rem auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function CampaignsByBrandId({ brandId }) {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const urlPage = Number(searchParams.get('page')) || 1;
    const urlSize = Number(searchParams.get('size')) || 10;
    
    if (urlPage !== currentPage) setCurrentPage(urlPage);
    if (urlSize !== pageSize) setPageSize(urlSize);
  }, [searchParams]);



  const { campaigns, loading: campaignsLoading, error, pagination, refetch } = useCampaignsByBrandId(
    brandId,
    {
      page: currentPage,
      size: pageSize,
      searchName: "",
    }
  );

  console.log("CampaignsByBrandId - campaigns:", campaigns);

  const onLimitChange = (newLimit) => {
    setPageSize(newLimit);
    setCurrentPage(1);
    refetch({ size: newLimit, page: 1 });
  };

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
    refetch({ sort: `${clickedColumn}:${sortOrder === "asc" ? "desc" : "asc"}`, page: 1 });
  };

  if (campaignsLoading) return <Spinner />;
  if (error) return <div>Có lỗi xảy ra khi tải danh sách chiến dịch: {error}</div>;
  if (!Array.isArray(campaigns) || campaigns.length === 0) return <Empty resourceName="chiến dịch" />;

  return (
    <>
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h2">Danh sách chiến dịch tổ chức</Heading>
          </HeadingGroup>
        </Row>
        <Menus>
          <Table columns="0.5fr 2fr 1.5fr 1.2fr 0.8fr">
            <Table.Header>
              <StyledHeader>STT</StyledHeader>
              <StackedHeader
                label="Tên chiến dịch"
                onClick={() => handleStackedClick("CampaignName")}
                $ascending={sortField === "CampaignName" && sortOrder === "asc"}
                $active={sortField === "CampaignName"}
              />
              <div style={{ marginLeft: "80px" }}>Thời gian diễn ra</div>
              <div>Tổng chi phí</div>
              <StyledHeader>Trạng thái</StyledHeader>
            </Table.Header>

            <Table.Body
              data={campaigns}
              render={(campaign, index) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                  index={index + 1}
                  displayedIndex={
                    (pagination.currentPage - 1) * pageSize + index + 1
                  }
                />
              )}
            />
            <Table.Footer>
              <Pagination
                count={pagination.totalItems}
                currentPage={pagination.currentPage}
                pageSize={pageSize}
                pageCount={pagination.totalPages}
                totalCount={pagination.totalItems}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  refetch({ page });
                }}
              />
              <BrandSetRowsPerPage
                pageSize={pageSize}
                onLimitChange={onLimitChange}
              />
            </Table.Footer>
          </Table>
        </Menus>
      </Container>
    </>
  );
}

export default CampaignsByBrandId;
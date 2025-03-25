// import { useState } from "react";
// import styled from "styled-components";
// import Heading from "../../ui/Heading";
// import Menus from "../../ui/Menus";
// import Pagination from "../../ui/Pagination";
// import Row from "../../ui/Row";
// import Spinner from "../../ui/Spinner";
// import StackedHeader from "../../ui/StackedHeader";
// import Table from "../../ui/Table";
// import CampaignRow from "./CampaignRow";
// import Empty from "./Empty";
// import SetRowsPerPage from "./SetRowsPerPage";
// import  {useCampaignsByBrandId}  from "./useCampaignsByBrandId";

// const HeadingGroup = styled.div`
//   display: flex;
//   gap: 2.4rem;
//   align-items: center;
// `;

// const Container = styled.div`
//   margin: 2rem auto 3rem;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
// `;

// const StyledHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// function CampaignsByBrandId() {
//   const [limit, setLimit] = useState();
//   const [sortField, setSortField] = useState("Id");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const { campaignsByBrandId, isLoading: campaignsLoading } =
//     useCampaignsByBrandId(limit, sortField, sortOrder);

//   const [currentPage, setCurrentPage] = useState(1);
//   const onLimitChange = (newLimit) => {
//     setLimit(newLimit);
//     setCurrentPage(1);
//   };
//   if (campaignsLoading) return <Spinner />;
//   if (!campaignsByBrandId?.result?.length)
//     return <Empty resourceName="chiến dịch" />;

//   const handleStackedClick = (clickedColumn) => {
//     setSortField(clickedColumn);
//     setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
//   };

//   return (
//     <>
//       <Container>
//         <Row type="horizontal">
//           <HeadingGroup>
//             <Heading as="h2">Danh sách chiến dịch tổ chức</Heading>
//           </HeadingGroup>
//         </Row>
//         <Menus>
//           <Table columns="0.7fr 3.2fr 1.6fr 1.2fr 1.1fr">
//             <Table.Header>
//               <StyledHeader>STT</StyledHeader>
//               <StackedHeader
//                 label="Tên chiến dịch"
//                 onClick={() => handleStackedClick("CampaignName")}
//                 $ascending={sortField === "CampaignName" && sortOrder === "asc"}
//                 $active={sortField === "CampaignName"}
//               />
//               <div>Thời gian diễn ra</div>
//               <div>Tổng chi phí</div>

//               <StyledHeader>Trạng thái</StyledHeader>
//             </Table.Header>

//             <Table.Body
//               data={campaignsByBrandId?.result}
//               render={(campaign, index) => (
//                 <CampaignRow
//                   key={campaign.id}
//                   campaign={campaign}
//                   index={index + 1}
//                   displayedIndex={
//                     (campaignsByBrandId.currentPage - 1) *
//                       campaignsByBrandId.pageSize +
//                     index +
//                     1
//                   }
//                 />
//               )}
//             />
//             <Table.Footer>
//               <Pagination
//                 count={campaignsByBrandId?.rowCount}
//                 currentPage={currentPage}
//                 pageSize={campaignsByBrandId?.pageSize}
//                 pageCount={campaignsByBrandId?.pageCount}
//                 totalCount={campaignsByBrandId?.totalCount}
//               />
//               <SetRowsPerPage
//                 pageSize={campaignsByBrandId?.pageSize}
//                 onLimitChange={onLimitChange}
//               />
//             </Table.Footer>
//           </Table>
//         </Menus>
//       </Container>
//     </>
//   );
// }

// export default CampaignsByBrandId;

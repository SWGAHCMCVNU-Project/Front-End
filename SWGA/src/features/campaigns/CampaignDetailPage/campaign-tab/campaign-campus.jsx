// import { Avatar, Spin, Tag, Typography } from "antd";
// import styled from "styled-components";
// import imgDefaultCampus from "../../../../assets/images/campus.png";
// import Empty from "../../../../ui/Empty";
// import { TableItem } from "../../../../ui/custom/Table/TableItem";
// // import { formatPhoneNumber, formattedHours, useImageValidity } from "../../../../utils/helpers";
// // import { useCampaignCampus } from "../useCampaignCampus";
// import "./scss/campaign-campus.scss";

// const Stacked = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.2rem;
//   font-size: 1.4rem;

//   & span:first-child {
//     font-weight: 500;
//   }

//   & span:last-child {
//     color: var(--color-grey-500); 
//   }
// `;

// const StackedTime = styled.span`
//   display: flex;
//   flex-direction: column;
//   gap: 0.2rem;
//   font-weight: 500;
// `;

// const StackedTimeFrameAbove = styled.span`
//   color: #2ecc71;
// `;

// const StackedTimeFrameBelow = styled.span`
//   color: red;
// `;

// function CampaignCampus() {
//     const { Title } = Typography;
//     // const {
//     //     isLoading,
//     //     campaignCampuses,
//     //     page,
//     //     limit,
//     //     handlePageChange,
//     //     handleLimitChange,
//     //     setSort,
//     // } = useCampaignCampus();

//     // const campusImages = campaignCampuses?.result?.map(campus => campus.image);
//     // const isValidImages = useImageValidity(campaignCampuses?.result, campusImages);

//     const handleSort = () => {}; // Hàm rỗng để tránh lỗi khi chưa có API

//     const columns = [
//         { title: "STT", dataIndex: "number", key: "number", align: "center" },
//         { title: "Cơ sở", dataIndex: "CampusName", key: "CampusName", width: "18%", sorter: true },
//         { title: "Thời gian làm việc", dataIndex: "Hours", key: "Hours" },
//         { title: "Liên hệ", dataIndex: "Contact", key: "Contact" },
//         { title: "Địa chỉ", key: "Address", dataIndex: "Address" },
//         { title: "Trạng thái", key: "State", dataIndex: "State", align: "center" },
//     ];

//     // Dữ liệu mẫu để hiển thị UI
//     const mockData = [
//         {
//             key: 1,
//             number: <div className="number-header"><span>1</span></div>,
//             CampusName: (
//                 <Avatar.Group>
//                     <Avatar className="shape-avatar-product" shape="square" src={imgDefaultCampus} />
//                     <div className="avatar-info">
//                         <Title className="title-product-name" level={5}>Cơ sở 1</Title>
//                         <p className="p-column-table">Đại học ABC tại Hà Nội</p>
//                     </div>
//                 </Avatar.Group>
//             ),
//             Hours: (
//                 <StackedTime>
//                     <span>Mở cửa: <StackedTimeFrameAbove>08:00</StackedTimeFrameAbove></span>
//                     <span>Đóng cửa: <StackedTimeFrameBelow>17:00</StackedTimeFrameBelow></span>
//                 </StackedTime>
//             ),
//             Contact: <Stacked><span>abc@example.com</span><span>0123 456 789</span></Stacked>,
//             Address: <div className="campaign-item-address">123 Đường Láng, Hà Nội</div>,
//             State: <Tag className="status-tag" color="cyan">Hoạt động</Tag>,
//         },
//     ];

//     return (
//         <Spin spinning={false}>
//             <TableItem
//                 columns={columns}
//                 dataSource={mockData}
//                 handleSort={handleSort}
//                 limit={5}
//                 label="Cơ sở / Trang"
//                 page={1}
//                 elements={1}
//                 setPage={() => {}}
//                 setLimit={() => {}}
//             />
//         </Spin>
//     );
// }

// export default CampaignCampus;
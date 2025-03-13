
// import {
//     Avatar,
//     Card,
//     Col,
//     Descriptions,
//     List,
//     Row
// } from "antd";
// import { HiPencil } from "react-icons/hi2";
// import BgProfile from "../../../assets/images/bg-profile.jpg";
// import Modal from "../../../ui/Modal";
// import Spinner from "../../../ui/Spinner";
// import { ButtonAction } from "../../../ui/custom/Button/Button";
// import AdminModalUpdate from "./admin-modal-update";
// import "./admin-profile.scss";
// import { useAdmin } from "./useAdmin";
// import { useAdminProfile } from "./useAdminProfile";

// function AdminProfile() {
//     const { admin, isLoading } = useAdminProfile();
//     const { admins } = useAdmin();

//     if (isLoading) return <Spinner />;

//     const renderAdminItem = (item) => (
//         <List.Item>
//             <List.Item.Meta
//                 className="list-meta-admin"
//                 avatar={<Avatar shape="square" size={60} src={item.avatar} />}
//                 title={item.fullName}
//                 description={item.email}
//             />
//         </List.Item>
//     );

//     const adminsData = admins?.result?.map(renderAdminItem);


//     return (
//         <>
//             <div
//                 className="profile-nav-bg"
//                 style={{ backgroundImage: "url(" + BgProfile + ")" }}
//             ></div>

//             <Card
//                 className="card-profile-head"
//                 bodyStyle={{ display: "none" }}
//                 title={
//                     <Row justify="space-between" align="middle" gutter={[24, 0]}>
//                         <Col span={24} md={12} className="col-info">
//                             <Avatar.Group>
//                                 <Avatar className="shape-avatar-profile" src={admin.avatar} />

//                                 <div className="avatar-info">
//                                     <h4 className="font-semibold m-0">{admin.fullName}</h4>
//                                     <p className="p-admin-title">Quản trị viên hệ thống</p>
//                                 </div>
//                             </Avatar.Group>
//                         </Col>
//                     </Row>
//                 }
//             ></Card>

//             <Row gutter={[24, 0]}>
//                 <Col span={24} md={16} className="mb-24">
//                     <Card
//                         bordered={false}
//                         title={
//                             <h3 className="font-semibold m-0">
//                                 Thông tin cá nhân
//                             </h3>
//                         }
//                         className="header-solid h-full card-profile-information"
//                         extra={
//                             <Modal>
//                                 <Modal.Open opens="edit">
//                                     <ButtonAction>
//                                         <HiPencil />
//                                     </ButtonAction>
//                                 </Modal.Open>
//                                 <Modal.Window name="edit">
//                                     <AdminModalUpdate adminToEdit={admin} />
//                                 </Modal.Window>
//                             </Modal>
//                         }
//                         bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
//                     >
//                         <p className="description-profile">
//                             {admin.description}
//                         </p>
//                         <hr className="my-25" />
//                         <Descriptions className="layout-description-admin" title="Quản trị viên" >
//                             <Descriptions.Item label="Họ tên" span={3}>
//                                 {admin.fullName}
//                             </Descriptions.Item>
//                             <Descriptions.Item label="Số điện thoại" span={3}>
//                                 {admin.phone}
//                             </Descriptions.Item>
//                             <Descriptions.Item label="Email" span={3}>
//                                 {admin.email}
//                             </Descriptions.Item>
//                             <Descriptions.Item label="Nơi làm việc" span={3}>
//                                 Việt Nam
//                             </Descriptions.Item>
//                         </Descriptions>
//                     </Card>
//                 </Col>
//                 <Col span={24} md={8} className="mb-24">
//                     <Card
//                         bordered={false}
//                         title={
//                             <h3 className="font-semibold m-0">
//                                 Danh sách quản trị viên
//                             </h3>
//                         }
//                         className="header-solid h-full"
//                         bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
//                     >
//                         <List
//                             itemLayout="horizontal"
//                             dataSource={adminsData}
//                             split={false}
//                             className="conversations-list"
//                             renderItem={(item) => item}
//                         />
//                     </Card>
//                 </Col>
//             </Row>
//         </>
//     );
// }

// export default AdminProfile;

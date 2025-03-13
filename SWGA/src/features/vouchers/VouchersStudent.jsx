// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import styled from "styled-components";
// import logoDefault from "../../assets/images/coupon.png";
// import greenBean from "../../assets/images/dauxanh.png";
// import Heading from "../../ui/Heading";
// import Row from "../../ui/Row";
// import Spinner from "../../ui/Spinner";
// import Empty from "../brands/Empty";
// import "./VouchersStudent.scss";
// import { useVouchersByStudentId } from "./useVouchersByStudentId";

// const Container = styled.div`
//   margin: 2rem auto 3rem;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
// `;

// const HeadingGroup = styled.div`
//   display: flex;
//   gap: 2.4rem;
//   align-items: center;
// `;

// const Img = styled.img`
//   width: 100%;
//   transition: 0.4s;
//   height: 100%;
//   border-top-left-radius: 12px;
//   border-top-right-radius: 12px;

//   content: url(${(props) => (props.src ? props.src : logoDefault)});
// `;

// function VouchersStudent() {
//   const [limit, setLimit] = useState();
//   const [sortField, setSortField] = useState("Id");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const { vouchersByStudentId, isLoading: ordersLoading } =
//     useVouchersByStudentId(limit, sortField, sortOrder);

//   if (ordersLoading) return <Spinner />;
//   if (!vouchersByStudentId?.result?.length)
//     return <Empty resourceName="voucher" />;

//   return (
//     <>
//       <Container>
//         <Row type="horizontal">
//           <HeadingGroup>
//             <Heading as="h2">Danh sách các khuyến mãi của sinh viên</Heading>
//           </HeadingGroup>
//         </Row>
//         <div className="productContainer">
//           {vouchersByStudentId?.result &&
//             vouchersByStudentId?.result.map((n) => (
//               <div key={n.id} className="product-content">
//                 <div className="card-item-img">
//                   <div className="voucher-image">
//                     <Img
//                       src={n.voucherImage || logoDefault}
//                       alt="Voucher Image"
//                       onError={(e) => {
//                         e.target.src = logoDefault;
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="content-item">
//                   <div className="name-item">{n.voucherName}</div>
//                   <div className="price-item-discount">
//                     <div className="container-price">
//                       <div className="price-voucher">
//                         <div>Giá voucher</div>
//                         <div className="sale-price-green">
//                           {n.price}{" "}
//                           <img
//                             className="shape-avatar-product-bean"
//                             src={greenBean}
//                           ></img>
//                         </div>
//                       </div>
//                       <div className="finish-day">
//                         <div className="sub-title">Tỉ lệ chuyển đổi</div>
//                         <div className="styled-day-finish">x{n.rate}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="container-price">
//                   <div className="amount-items">
//                     <div>Số lượng ite</div>
//                   </div>
//                   <div className="container-number-item">
//                     <div>Còn lại:&nbsp;</div>
//                     <div className="styled-number-item">
//                       {n.numberOfItemsAvailable} / {n.numberOfItems}
//                     </div>
//                     <div>&nbsp;mã</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </Container>
//     </>
//   );
// }

// export default VouchersStudent;

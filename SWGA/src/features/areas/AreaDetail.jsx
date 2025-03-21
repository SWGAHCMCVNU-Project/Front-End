// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import { HiPencil } from "react-icons/hi2";
// import { addHours, format } from "date-fns";
// import { vi } from "date-fns/locale";
// import PropTypes from "prop-types";

// import { useArea } from "../../hooks/areas/useArea";
// import { handleValidImageURL } from "../../utils/helpers";
// import Modal from "../../ui/Modal";
// import CreateAreaForm from "./CreateAreaForm";
// import Tag from "../../ui/Tag";
// import Spinner from "../../ui/Spinner";
// import Empty from "../../ui/Empty";

// import logoDefault from "../../assets/images/plot.png";

// const StyledAreaDetail = styled.div`
//   padding: 2.4rem 4rem;
// `;

// const Container = styled.div`
//   display: flex;
//   gap: 3.2rem;
//   margin-bottom: 3.2rem;
// `;

// const Image = styled.img`
//   display: block;
//   width: 100%;
//   object-fit: cover;
//   object-position: center;
//   aspect-ratio: 3/2;
//   margin-bottom: 1.2rem;
//   border-radius: 7px;
//   content: url(${(props) => (props.src ? props.src : logoDefault)});
// `;

// const DataBox = styled.div`
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//   padding: 2.4rem 2.4rem;
//   width: 100%;
// `;

// const Header = styled.div`
//   background-color: var(--color-grey-0);
// `;

// const Title = styled.div`
//   font-size: 2rem;
//   font-weight: 600;
//   font-family: "Sono";
//   color: var(--color-grey-600);
//   margin-bottom: 0.4rem;
// `;

// const HeaderRow = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 0.4rem;
// `;

// const Price = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1.6rem;
//   color: var(--color-grey-500);
//   font-family: "Sono";
//   font-weight: 600;
// `;

// const Description = styled.p`
//   display: flex;
//   flex-direction: column;
//   gap: 0.4rem;
//   color: var(--color-grey-500);
//   font-size: 1.5rem;
//   margin-bottom: 1.2rem;
// `;

// const Box = styled.div`
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//   padding: 2.4rem 4rem;
//   width: 100%;
// `;

// const StyledButton = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem 0.4rem;
//   font-size: 1.4rem;
//   transition: all 0.2s;

//   &:hover {
//     background-color: var(--color-grey-50);
//     border: 1px solid var(--color-green-600);
//     border-radius: 5px;
//   }

//   & svg {
//     width: 2.2rem;
//     height: 2.2rem;
//     color: var(--color-grey-400);
//     transition: all 0.3s;
//   }

//   & svg:hover {
//     color: var(--color-green-600);
//   }
// `;

// function AreaDataBox({ area }) {
//   const { areaName, image, description, dateCreated, state } = area;
//   const [isValidImage, setIsValidImage] = useState(true);

//   useEffect(() => {
//     handleValidImageURL(image)
//       .then((isValid) => setIsValidImage(isValid))
//       .catch(() => setIsValidImage(false));
//   }, [image]);

//   const statusToTagName = {
//     true: "cyan",
//     false: "error",
//   };

//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         return "Không có dữ liệu";
//       }
//       return format(addHours(date, 7), "dd MMM yyyy", { locale: vi });
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return "Không có dữ liệu";
//     }
//   };

//   return (
//     <DataBox>
//       <Header>
//         <HeaderRow>
//           <Title>{areaName}</Title>
//           <Modal>
//             <Modal.Open opens="edit">
//               <StyledButton>
//                 <HiPencil />
//               </StyledButton>
//             </Modal.Open>
//             <Modal.Window name="edit">
//               <CreateAreaForm areaToEdit={area} />
//             </Modal.Window>
//           </Modal>
//         </HeaderRow>
//         <Description>
//           <span>Ngày tạo: {formatDate(dateCreated)}</span>
//           <span>Trạng thái: <Tag type={statusToTagName[state]}>{state ? "Hoạt động" : "Không hoạt động"}</Tag></span>
//         </Description>
//       </Header>

//       <Image src={isValidImage ? image || "" : logoDefault} />

//       <Price>
//         <span>Mô tả:</span>
//         <span>{description ? description : "Chưa cập nhật mô tả"}</span>
//       </Price>
//     </DataBox>
//   );
// }

// AreaDataBox.propTypes = {
//   area: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     areaName: PropTypes.string.isRequired,
//     image: PropTypes.string,
//     description: PropTypes.string,
//     dateCreated: PropTypes.string.isRequired,
//     state: PropTypes.bool.isRequired,
//   }).isRequired,
// };

// function AreaDetail() {
//   const { isLoading, area } = useArea();

//   if (isLoading) return <Spinner />;
//   if (!area) return <Empty resourceName="khu vực" />;

//   return (
//     <StyledAreaDetail>
//       <Container>
//         <Box>
//           <AreaDataBox area={area} />
//         </Box>
//       </Container>
//     </StyledAreaDetail>
//   );
// }

// export default AreaDetail;

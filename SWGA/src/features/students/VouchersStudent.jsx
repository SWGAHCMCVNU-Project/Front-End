import styled from "styled-components";
import logoDefault from "../../assets/images/coupon.png";
import { useParams } from "react-router-dom";
import { useState } from "react";
import greenBean from "../../assets/images/dauxanh.png";
import { useVouchersByStudentId } from "./useVouchersByStudentId";
import "./VouchersStudent.scss";
import Spinner from "../../ui/Spinner";
import Empty from "../brands/Empty";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";

const Container = styled.div`
  margin: 2rem auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  transition: 0.4s;
  height: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  // If image is empty or null, use logoDefault
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StyledButton = styled.div``;

function VouchersStudent() {
  const { studentId } = useParams();
  // console.log("studentId", studentId);

  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { vouchersByStudentId, isLoading: ordersLoading } =
    useVouchersByStudentId(limit, sortField, sortOrder);

  if (ordersLoading) return <Spinner />;
  if (!vouchersByStudentId?.result?.length)
    return <Empty resourceName="voucher" />;

  return (
    <>
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h2">Danh sách các ưu đãi của sinh viên</Heading>
          </HeadingGroup>
        </Row>

        <div className="productContainer">
          {vouchersByStudentId?.result &&
            vouchersByStudentId?.result.map((n) => (
              <div key={n.id} className="product-content">
                <StyledButton>
                  <div className="card-item-img-brand">
                    <div className="voucher-image-brand">
                      <Img
                        src={n.voucherImage || logoDefault}
                        alt="Voucher Image"
                        onError={(e) => {
                          e.target.src = logoDefault;
                        }}
                      />
                    </div>
                  </div>
                  <div className="content-item">
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        width: "100%",
                        outline: "none",
                      }}
                    >
                      <div className="name-item-voucher">{n.voucherName}</div>
                    </button>

                    <div className="price-item-discount-students">
                      <div className="container-price-brand">
                        <div className="price-voucher">
                          <div>Giá voucher</div>
                          <div className="sale-price-green-bean">
                            {n.price}{" "}
                            <img
                              className="shape-avatar-product-bean"
                              src={greenBean}
                            ></img>
                          </div>
                        </div>
                        <div className="finish-day">
                          <div>Tỉ lệ chuyển đổi</div>
                          <div className="styled-day-finish">x{n.rate}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="container-amount-item">
                    <div className="container-item">
                      <div>Còn lại:&nbsp;</div>
                      <div className="styled-number-item">
                        {n.numberOfItemsAvailable} / {n.numberOfItems}
                      </div>
                      <div>&nbsp;mã</div>
                    </div>
                  </div> */}
                </StyledButton>
              </div>
            ))}
        </div>
      </Container>
    </>
  );
}

export default VouchersStudent;

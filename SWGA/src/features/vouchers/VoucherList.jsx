import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import logoDefault from "../../assets/images/coupon.png";
import greenBean from "../../assets/images/dauxanh.png";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import "./VoucherList.scss";
import { useVouchers } from "./useVouchers";

const Container = styled.div`
  margin: 2rem auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Img = styled.img`
  width: 100%;
  transition: 0.4s;
  height: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const StyledButton = styled.div``;

function VoucherList() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { vouchersByBrandId, isLoading } = useVouchers(
    limit,
    sortField,
    sortOrder
  );

  if (isLoading) return <Spinner />;
  if (!vouchersByBrandId?.result?.length)
    return <Empty resourceName="ưu đãi" />;

  return (
    <>
      <Container>
        <div className="productContainer">
          {vouchersByBrandId?.result &&
            vouchersByBrandId?.result.map((n) => (
              <div key={n.id} className="product-content">
                <StyledButton onClick={() => navigate(`/vouchers/${n.id}`)}>
                  <div className="card-item-img-brand">
                    <div className="voucher-image-brand">
                      <Img
                        src={n.image || logoDefault}
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

                    <div className="price-item-discount">
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
                  <div className="container-amount-item">
                    <div className="container-item">
                      <div>Còn lại:&nbsp;</div>
                      <div className="styled-number-item">
                        {n.numberOfItemsAvailable} / {n.numberOfItems}
                      </div>
                      <div>&nbsp;mã</div>
                    </div>
                  </div>
                </StyledButton>
              </div>
            ))}
        </div>
      </Container>
    </>
  );
}

export default VoucherList;

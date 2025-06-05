import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import logoDefault from "../../assets/images/coupon.png";
import greenBean from "../../assets/images/dauxanh.png";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useVouchers } from "../../hooks/voucher/useVouchers";
import "./VoucherList.scss";

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
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const { vouchers, isLoading } = useVouchers({ search });

  if (isLoading) return <Spinner />;
  if (!vouchers?.data?.items?.length) return <Empty resourceName="ưu đãi" />;

  return (
    <Container>
      <div className="productContainer">
        {vouchers.data.items.map((n) => (
          <div key={n.id} className="product-content">
            <StyledButton onClick={() => navigate(`/vouchers/${n.id}`)}>
              <div className="card-item-img-brand">
                <div className="voucher-image-brand">
                  <Img src={n.image || logoDefault} alt="Voucher Image" />
                </div>
              </div>
              <div className="content-item">
                <button style={{ background: "none", border: "none", width: "100%" }}>
                  <div className="name-item-voucher">{n.voucherName}</div>
                </button>
                <div className="price-item-discount" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div className="container-price-brand">
                    <div className="price-voucher">
                      <div>Giá voucher</div>
                      <div className="sale-price-green-bean">
                        {n.price}{" "}
                        <img className="shape-avatar-product-bean" src={greenBean} alt="bean" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StyledButton>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default VoucherList;
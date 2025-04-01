import { Card } from "antd";
import { useState } from "react";
import { useCampaignVoucher } from "../useCampaignVoucher";
import imgDefaultVoucher from "../../../../assets/images/coupon.png";
import greenBean from "../../../../assets/images/dauxanh.png";
import Empty from "../../../../ui/Empty";
import Modal from "../../../../ui/Modal";
import Spinner from "../../../../ui/Spinner";
import "./scss/campaign-voucher.scss";

function CampaignVoucher() {
  const { isLoading, campaignVouchers, error } = useCampaignVoucher();
  const [voucherId, setVoucherId] = useState(null);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  if (!campaignVouchers?.result?.length) return <Empty resourceName="khuyến mãi" />;

  const handleCardClick = (voucherId) => setVoucherId(voucherId);

  return (
    <Modal>
      <Modal.Open opens="voucher-campaign-details">
        <div className="voucher-container">
          {campaignVouchers.result.map((voucher, index) => (
            <Card key={index} className="voucher-card" onClick={() => handleCardClick(voucher.id)}>
              <div className="voucher-card-item">
                <div className="image-voucher">
                  <img src={voucher.voucherImage || imgDefaultVoucher} alt={voucher.voucherName} />
                </div>
              </div>
              <div>
                <div className="voucher-name-item">{voucher.voucherName}</div>
                <div className="price-voucher-container">
                  <div className="voucher-price-infor">
                    <label>Giá voucher</label>
                    <span className="voucher-price-item">
                      {voucher.price?.toLocaleString("vi-VN") || 0}{" "}
                      <img className="shape-avatar-product-bean" src={greenBean} alt="bean" />
                    </span>
                  </div>
                  <div className="voucher-price-infor">
                    <label>Tỉ lệ chuyển đổi</label>
                    <span className="voucher-price-item">x{voucher.rate || 0}</span>
                  </div>
                </div>
                <div className="container-quantity">
                  <label>Còn lại: </label>
                  <span className="voucher-quantity-item">
                    {voucher.quantityInStock || 0} / {voucher.quantity || 0}
                  </span>
                  <label className="voucher-remaining">mã</label>
                </div>
              </div>
              {/* <div className="container-quantity">
                <span className="voucher-more">Xem thêm</span>
              </div> */}
            </Card>
          ))}
        </div>
      </Modal.Open>
      {/* <Modal.Window name="voucher-campaign-details">
        <p>Chi tiết voucher sẽ hiển thị khi tích hợp useGetVoucherDetailByCampaignId (ID: {voucherId})</p>
      </Modal.Window> */}
    </Modal>
  );
}

export default CampaignVoucher;
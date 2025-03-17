import { Card } from "antd";
import { useState } from "react";
import imgDefaultVoucher from "../../../../assets/images/coupon.png";
import greenBean from "../../../../assets/images/dauxanh.png";
import Empty from "../../../../ui/Empty";
import Modal from "../../../../ui/Modal";
import Spinner from "../../../../ui/Spinner";
// import { useImageValidity } from "../../../../utils/helpers";
// import { useCampaignVoucher } from "../useCampaignVoucher";
import "./scss/campaign-voucher.scss";

function CampaignVoucher() {
    // const { isLoading, campaignVouchers } = useCampaignVoucher();
    const [voucherId, setVoucherId] = useState(null);
    // const voucherImages = campaignVouchers?.result?.map(voucher => voucher.voucherImage);
    // const isValidImages = useImageValidity(campaignVouchers?.result, voucherImages);

    // if (isLoading) return <Spinner />;
    // if (!campaignVouchers?.result?.length) return <Empty resourceName="khuyến mãi" />;

    const handleCardClick = (voucherId) => setVoucherId(voucherId);

    // Dữ liệu mẫu để hiển thị UI
    const mockVouchers = [
        {
            id: 1,
            voucherImage: imgDefaultVoucher,
            voucherName: "Voucher Giảm 50%",
            price: 50000,
            rate: 2,
            quantityInStock: 10,
            quantity: 20,
        },
    ];

    return (
        <Modal>
            <Modal.Open opens="voucher-campaign-details">
                <div className="voucher-container">
                    {mockVouchers.map((voucher, index) => (
                        <Card key={index} className="voucher-card" onClick={() => handleCardClick(voucher.id)}>
                            <div className="voucher-card-item">
                                <div className="image-voucher">
                                    <img src={voucher.voucherImage} alt="" />
                                </div>
                            </div>
                            <div>
                                <div className="voucher-name-item">{voucher.voucherName}</div>
                                <div className="price-voucher-container">
                                    <div className="voucher-price-infor">
                                        <label>Giá voucher</label>
                                        <span className="voucher-price-item">
                                            {voucher.price.toLocaleString("vi-VN")}{" "}
                                            <img className="shape-avatar-product-bean" src={greenBean} />
                                        </span>
                                    </div>
                                    <div className="voucher-price-infor">
                                        <label>Tỉ lệ chuyển đổi</label>
                                        <span className="voucher-price-item">x{voucher.rate}</span>
                                    </div>
                                </div>
                                <div className="container-quantity">
                                    <label>Còn lại: </label>
                                    <span className="voucher-quantity-item">{voucher.quantityInStock} / {voucher.quantity}</span>
                                    <label className="voucher-remaining">mã</label>
                                </div>
                            </div>
                            <div className="container-quantity">
                                <span className="voucher-more">Xem thêm</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </Modal.Open>
            {/* <Modal.Window name="voucher-campaign-details">
                <CampaignVoucherDetails voucherId={voucherId} />
            </Modal.Window> */}
        </Modal>
    );
}

export default CampaignVoucher;
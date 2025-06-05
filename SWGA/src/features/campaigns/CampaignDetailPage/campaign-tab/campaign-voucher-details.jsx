import { Card } from "antd";
import parse from "html-react-parser";
import { useEffect } from "react";
import greenBean from "../../../../assets/images/dauxanh.png";
import Empty from "../../../../ui/Empty";
import Spinner from "../../../../ui/Spinner";
import { useCampaignVoucherDetails } from "../useCampaignVoucherDetails";
import "./scss/campaign-voucher-details.scss";

function CampaignVoucherDetails({ voucherId }) {
    const {
        setVoucherId,
        isLoading,
        campaignVoucher,
    } = useCampaignVoucherDetails();

    useEffect(() => {
        if (voucherId !== null) {
            setVoucherId(voucherId);
        }
    }, [voucherId]);

    if (isLoading) return <Spinner />;

    if (!campaignVoucher) return <Empty resourceName="chi tiết khuyến mãi" />;

    return (
        <>
            <Card className="voucher-details-card">
                <div className="voucher-card-details-item">
                    <div className="image-voucher">
                        <img src={campaignVoucher.voucherImage} alt="" />
                    </div>
                </div>
                <div>
                    <div className="voucher-details-name-item">
                        {campaignVoucher.voucherName}
                    </div>

                    <div className="voucher-details-in-stock">
                        <div>
                            <label className="voucher-label-in-stock">Đã bán: {" "}</label>
                            <span className="voucher-in-stock-item">{campaignVoucher.quantityInBought}</span>
                        </div>
                        <div>
                            <label className="voucher-label-in-stock">Đã dùng: {" "}</label>
                            <span className="voucher-in-stock-item">{campaignVoucher.quantityInUsed}</span>
                        </div>
                    </div>

                    <div className="voucher-details-description">
                        <span>
                            {parse(campaignVoucher.voucherCondition)}
                        </span>
                    </div>

                    <div className="price-voucher-container">
                        <div className="voucher-price-infor">
                            <label>Giá voucher</label>
                            <span className="voucher-price-item">
                                {campaignVoucher.price.toLocaleString("vi-VN")}{" "}
                                <img
                                    className="shape-avatar-product-bean"
                                    src={greenBean}
                                ></img>
                            </span>
                        </div>
                        {/* <div className="voucher-price-infor">
                            <label>Tỉ lệ chuyển đổi</label>
                            <span className="voucher-price-item">
                                x{campaignVoucher.rate}
                            </span>
                        </div> */}
                    </div>

                    <div className="container-quantity">
                        <label>Còn lại: {" "}</label>
                        <span className="voucher-quantity-item">{campaignVoucher.quantityInStock} / {campaignVoucher.quantity}</span>
                        <label className="voucher-remaining">mã</label>
                    </div>
                </div>
            </Card>
        </>
    );
}

export default CampaignVoucherDetails;

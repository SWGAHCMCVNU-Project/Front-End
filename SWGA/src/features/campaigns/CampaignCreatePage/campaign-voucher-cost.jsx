import { Card, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NextPrevContext } from "../../../context/NextPrevContext";
import storageService from "../../../services/storageService";
import { ButtonNextPrev } from "../../../ui/custom/Button/Button";
import CreateCampaignVoucher from "./create-campaign-voucher";

function CampaignVoucherCost() {
    const { current, setCurrent, newCampaign, setNewCampaign } = useContext(NextPrevContext);
    const [selectedItemVouchers, setSelectedItemVouchers] = useState([]);
    const [costCampaign, setCostCampaign] = useState(0);
    const brandId = storageService.getBrandId();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { register, handleSubmit, reset, getValues, setValue, formState } = useForm({
        defaultValues: newCampaign ? newCampaign : {}
    });
    const { errors } = formState;

    // Logic validate
    const validateCampaignVoucherCost = (checkVoucherCost) => {
        const errors = [];

        if (!checkVoucherCost.brandId) {
            errors.push("Brand ID is required");
        }

        if (!checkVoucherCost.campaignDetails || checkVoucherCost.campaignDetails.length === 0) {
            errors.push("Please select at least one voucher");
        }

        if (checkVoucherCost.totalIncome <= 0) {
            errors.push("Campaign cost must be greater than 0");
        }

        return errors.length === 0 ? null : errors;
    };

    function onSubmit(data) {
        const checkVoucherCost = {
            brandId: brandId,
            totalIncome: costCampaign,
            campaignDetails: selectedItemVouchers
        };

        const validationErrors = validateCampaignVoucherCost(checkVoucherCost);
        if (validationErrors) {
            validationErrors.forEach(error => toast.error(error));
            return; // Ngăn không cho tiếp tục nếu có lỗi
        }

        // Cập nhật newCampaign trước khi chuyển bước
        setNewCampaign({
            ...newCampaign,
            campaignDetails: selectedItemVouchers,
            cost: costCampaign
        });

        // Chuyển sang bước tiếp theo
        if (current < 3) {
            setCurrent(current + 1);
        }
    }

    function onSubmitPrev(data) {
        setNewCampaign({
            ...newCampaign,
            campaignDetails: selectedItemVouchers,
            cost: costCampaign
        });
        if (current > 0) {
            setCurrent(current - 1);
        }
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <>
            <div>
                <Card className="card-noti">
                    <label>⚠️ Lưu ý: </label>
                    <span>
                        Những nội dung dưới đây sau khi tạo chiến dịch sẽ
                        <strong className="note-strong"> không thể chỉnh sửa</strong>, vui lòng kiểm tra trước khi
                        <strong className="note-strong"> xác nhận thông tin</strong>.
                    </span>
                </Card>
            </div>
            <div>
                <CreateCampaignVoucher
                    selectVoucher={setSelectedItemVouchers}
                    cost={setCostCampaign}
                    disabled={false}
                />
            </div>
            <div className="btn-next-prev">
                <ButtonNextPrev
                    onClick={handleSubmit(onSubmitPrev, onError)}
                    disabled={false}
                >
                    Quay lại
                </ButtonNextPrev>
                <ButtonNextPrev
                    className="btn-next-form"
                    onClick={handleSubmit(onSubmit, onError)}
                    disabled={false}
                >
                    Tiếp theo
                </ButtonNextPrev>
            </div>
        </>
    );
}

export default CampaignVoucherCost;
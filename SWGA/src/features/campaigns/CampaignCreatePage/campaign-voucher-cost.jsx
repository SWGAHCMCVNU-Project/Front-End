import { Spin } from "antd";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NextPrevContext } from "../../../context/NextPrevContext";
import { ButtonNextPrev } from "../../../ui/custom/Button/Button";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import CampaignVoucher from "./CampaignVoucher";
import "./scss/campaign.scss";
import toast from "react-hot-toast";

function CampaignVoucherCost() {
  const { current, setCurrent, newCampaign, setNewCampaign,completedSteps, setCompletedSteps } = useContext(NextPrevContext);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit } = useForm({
    defaultValues: newCampaign || {}
  });

  const handleVoucherSelect = (vouchers) => {
    setNewCampaign(prev => ({
      ...prev,
      campaignDetails: vouchers
    }));
  };

  const handleCostUpdate = (cost) => {
    setNewCampaign(prev => ({
      ...prev,
      cost: cost
    }));
  };

  const onSubmit = () => {
    setIsLoading(true);
    try {
      if (!newCampaign?.campaignDetails?.length) {
        toast.error("Vui lòng chọn ít nhất một ưu đãi");
        return;
      }
      setCompletedSteps((prev) => [...new Set([...prev, 2])]); // Đánh dấu bước 2 hoàn thành
      setCurrent(current + 1);
    } catch {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsLoading(false);
    }
  };

  const onError = () => {
    toast.error("Vui lòng kiểm tra lại thông tin biểu mẫu!");
  };

  const onSubmitPrev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <div>
        <CampaignVoucher 
          selectVoucher={handleVoucherSelect} 
          cost={handleCostUpdate} 
          disabled={isLoading} 
          mode="create" 
        />
      </div>
      <div className="btn-next-prev">
        <ButtonNextPrev onClick={() => onSubmitPrev()} disabled={isLoading}>
          Quay lại
        </ButtonNextPrev>
        <ButtonCustom
          className="btn-next-form"
          onClick={handleSubmit(onSubmit, onError)}
          disabled={isLoading}
        >
          {isLoading ? <Spin /> : "Tiếp theo"}
        </ButtonCustom>
      </div>
    </>
  );
}

export default CampaignVoucherCost;
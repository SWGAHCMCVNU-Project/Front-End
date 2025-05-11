import { Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NextPrevContext } from "../../../context/NextPrevContext";
import { ButtonNextPrev } from "../../../ui/custom/Button/Button";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import CampaignVoucher from "./CampaignVoucher";
import walletService from "../../../store/api/walletApi";
import "./scss/campaign.scss";
import toast from "react-hot-toast";

function CampaignVoucherCost() {
  const { current, setCurrent, newCampaign, setNewCampaign, completedSteps, setCompletedSteps } = useContext(NextPrevContext);
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);

  const { handleSubmit } = useForm({
    defaultValues: newCampaign || {}
  });

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const walletData = await walletService.getWalletByBrandId();
        setWalletBalance(walletData.balance);
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
        setWalletBalance(0);
        toast.error("Không thể tải số dư ví");
      }
    };

    fetchWalletBalance();
  }, []);

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

      const totalCost = (newCampaign.cost || 0) + (newCampaign.campaignTypeCoin || 0);
      if (walletBalance !== null && totalCost > walletBalance) {
        toast.error(`Số dư ví không đủ! Cần ${totalCost} điểm, nhưng ví chỉ có ${walletBalance} điểm.`);
        return;
      }

      setCompletedSteps((prev) => [...new Set([...prev, 3])]);
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
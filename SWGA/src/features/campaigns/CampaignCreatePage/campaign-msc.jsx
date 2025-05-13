import { Card, Spin } from "antd";
import React, { useEffect, useState,useContext } from "react";
import { useForm } from "react-hook-form";
import { NextPrevContext } from "../../../context/NextPrevContext";
import { ButtonNextPrev } from "../../../ui/custom/Button/Button";
import CampaignStore from "./CampaignStore";
import "./scss/campaign.scss";

function CampaignMSC() {
    const { current, setCurrent, newCampaign, setNewCampaign,completedSteps, setCompletedSteps } = useContext(NextPrevContext);
    const [selectedItemStores, setSelectedItemStores] = useState([]);
    const { register, handleSubmit, reset, getValues, setValue, formState } = useForm({
        defaultValues: newCampaign ? newCampaign : {}
    });
    const { errors } = formState;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Enhanced validation logic
    const validateCampaignMSC = (options) => {
        const errors = [];

        // console.log("Validating with campaignStores:", options.campaignStores); // Debug log
        if (!options.campaignStores || !Array.isArray(options.campaignStores) || options.campaignStores.length === 0) {
            errors.push("Please select at least one store");
        }

        return errors.length === 0 ? null : errors;
    };

    function onSubmit(data) {
        const checkOptionValid = {
          campaignStores: selectedItemStores,
        };
      
        const validationErrors = validateCampaignMSC(checkOptionValid);
        if (validationErrors) {
          return;
        }
      
        setNewCampaign(prev => ({
          ...prev,
          campaignStores: selectedItemStores,
        }));
        setCompletedSteps((prev) => [...new Set([...prev, 1])]); // Đánh dấu bước 1 hoàn thành
        setCurrent(current + 1);
      }

    function onSubmitPrev(data) {
        setNewCampaign(prev => ({
            ...prev,
            campaignStores: selectedItemStores
        }));
        setCurrent(current - 1);
    }

    function onError(errors) {
    }

    return (
        <>
            <div>
                <Card className="card-noti">
                    <div><label>⚠️ Lưu ý: </label></div>
                    <div>
                        <span>
                            - Những nội dung dưới đây sau khi tạo chiến dịch sẽ
                            <strong className="note-strong"> không thể chỉnh sửa</strong>, vui lòng kiểm tra trước khi
                            <strong className="note-strong"> xác nhận thông tin</strong>.
                        </span>
                    </div>
                </Card>
            </div>
            <div  className="msc-container">
                <CampaignStore
                
                    selectStore={setSelectedItemStores}
                    
                    disabled={false}
                />
            </div>
            <div className="btn-next-prev">
                <ButtonNextPrev onClick={handleSubmit(onSubmitPrev, onError)} disabled={false}>Quay lại</ButtonNextPrev>
                <ButtonNextPrev className="btn-next-form" onClick={handleSubmit(onSubmit, onError)} disabled={false}>Tiếp theo</ButtonNextPrev>
            </div>
        </>
    );
}

export default CampaignMSC;
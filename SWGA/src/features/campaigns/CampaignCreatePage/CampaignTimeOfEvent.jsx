import { Card, Spin } from "antd";
import moment from "moment-timezone";
import { useContext, useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { NextPrevContext } from "../../../context/NextPrevContext";
import { ButtonNextPrev } from "../../../ui/custom/Button/Button";
import { CustomFormRow } from "../../../ui/custom/Form/InputItem/CustomFormItem";
import { FormSelect } from "../../../ui/custom/Select/SelectBox/SelectForm";
import { useCampaignTypes } from "../../../hooks/campaign-type/useCampaignTypes";
import walletService from "../../../store/api/walletApi";
import toast from "react-hot-toast";
import greenBean from "../../../assets/images/dauxanh.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./scss/campaign.scss";

// Set default timezone
moment.tz.setDefault("Asia/Ho_Chi_Minh");

const TimeEventContainer = styled.div`
  margin-bottom: 60px;
  max-height: 400px;
  overflow-y: auto;

  .react-calendar {
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 14px;
  }

  .react-calendar__tile--active {
    background: #1890ff;
    color: #fff;
    border-radius: 50%;
  }

  .react-calendar__tile--now {
    background: #e6f7ff;
  }

  .react-calendar--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Header = styled.header`
  color: #1c5d78;
  font-size: 1.7rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.7rem;
    margin-bottom: 10px;
  }
`;

const TotalCost = styled.div`
  color: #1c5d78;
  font-weight: 600;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

function CampaignTimeOfEvent() {
  const { campaignTypes, isLoading: typesLoading } = useCampaignTypes({
    state: true,
  });
  const [campaignTypesOptions, setCampaignTypesOptions] = useState([]);
  const [typeError, setTypeError] = useState("");
  const {
    newCampaign,
    setNewCampaign,
    current,
    setCurrent,
    completedSteps,
    setCompletedSteps,
  } = useContext(NextPrevContext);
  const isMounted = useRef(false);
  const [walletBalance, setWalletBalance] = useState(null);
  const [selectedCampaignType, setSelectedCampaignType] = useState(null);

  const { register, handleSubmit, setValue, control, formState, watch } =
    useForm({
      defaultValues: newCampaign
        ? {
            typeId: newCampaign.typeId,
            startOn: newCampaign.startOn
              ? moment(newCampaign.startOn, "YYYY-MM-DD")
              : null,
            endOn: newCampaign.endOn
              ? moment(newCampaign.endOn, "YYYY-MM-DD")
              : null,
          }
        : { typeId: null, startOn: null, endOn: null },
    });
  const { errors } = formState;
  const typeId = watch("typeId");
  const startOn = watch("startOn");

  useEffect(() => {
    isMounted.current = true;
    window.scrollTo(0, 0);
  }, []);

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

  useEffect(() => {
    if (campaignTypes && Array.isArray(campaignTypes)) {
      const filteredCampaignTypes = campaignTypes.filter((c) => c.state);
      setCampaignTypesOptions(
        filteredCampaignTypes.map((c) => ({
          value: c.id,
          label: c.typeName,
          coin: c.coin,
          duration: c.duration,
        }))
      );
      if (newCampaign?.typeId) {
        const selectedType = filteredCampaignTypes.find(
          (c) => c.id === newCampaign.typeId
        );
        setSelectedCampaignType(selectedType);
      }
    }
  }, [campaignTypes, newCampaign]);

  useEffect(() => {
    if (typeId && campaignTypes) {
      const selectedType = campaignTypes.find((c) => c.id === typeId);
      setSelectedCampaignType(selectedType);
      if (startOn && selectedType?.duration) {
        const monthsToAdd = Math.floor(selectedType.duration / 30); // Use selectedType instead
        let newEndDate = moment(startOn).add(monthsToAdd, "months").subtract(1, "day");

        const startDay = startOn.date();
        const targetMonthEnd = moment(newEndDate).endOf("month").date();
        if (startDay > targetMonthEnd) {
          newEndDate = moment(newEndDate).endOf("month").subtract(1, "day");
        } else if (startDay === moment(startOn).endOf("month").date()) {
          newEndDate = moment(newEndDate).endOf("month").subtract(1, "day");
        }

        setValue("endOn", newEndDate);
      }
    }
  }, [typeId, campaignTypes, startOn, setValue]);

  useEffect(() => {
    if (newCampaign?.typeId && isMounted.current) {
      setValue("typeId", newCampaign.typeId);
    }
  }, [newCampaign, setValue]);

  const handleCampaignTypesOption = (value) => {
    if (isMounted.current) {
      setValue("typeId", value, { shouldDirty: true, shouldValidate: true });
    }
  };

  const validateCampaign = (typeId, timeRange, campaignType) => {
    const errors = [];
    if (!campaignType) {
      errors.push("Vui lòng chọn loại chiến dịch");
      setTypeError("Vui lòng chọn loại chiến dịch");
    }
    if (!typeId) {
      errors.push("Type ID is required");
      setTypeError("Vui lòng chọn loại chiến dịch");
    } else {
      setTypeError("");
    }
    if (!timeRange.startOn || !timeRange.endOn) {
      errors.push("Vui lòng chọn ngày bắt đầu");
    } else {
      const start = moment(timeRange.startOn);
      const end = moment(timeRange.endOn);
      const today = moment().startOf("day");
      if (!start.isValid() || !end.isValid()) {
        errors.push("Ngày không hợp lệ");
      } else if (end.isBefore(start)) {
        errors.push("Ngày kết thúc phải sau ngày bắt đầu");
      } else if (start.isBefore(today)) {
        errors.push("Ngày bắt đầu phải là ngày hiện tại hoặc sau đó");
      }
    }
    if (
      campaignType?.coin &&
      walletBalance !== null &&
      campaignType.coin > walletBalance
    ) {
      errors.push(
        `Số dư ví không đủ! Cần ${campaignType.coin} điểm, nhưng ví chỉ có ${walletBalance} điểm.`
      );
    }
    return errors.length === 0 ? null : errors;
  };

  const onSubmit = (data) => {
    const formattedStartOn = data.startOn?.format("YYYY-MM-DD");
    const formattedEndOn = data.endOn?.format("YYYY-MM-DD");
    if (!formattedStartOn || !formattedEndOn) {
      toast.error("Vui lòng chọn ngày bắt đầu");
      return;
    }
    const timeRange = { startOn: formattedStartOn, endOn: formattedEndOn };
    const validationErrors = validateCampaign(
      data.typeId,
      timeRange,
      selectedCampaignType
    );
    if (validationErrors) {
      validationErrors.forEach((error) => toast.error(error));
      return;
    }
    if (isMounted.current) {
      setNewCampaign({
        ...newCampaign,
        typeId: data.typeId,
        startOn: formattedStartOn,
        endOn: formattedEndOn,
        campaignTypeCoin: selectedCampaignType?.coin || 0,
      });
      setCompletedSteps((prev) => [...new Set([...prev, 2])]);
      setCurrent(current + 1);
    }
  };

  const onSubmitPrev = () => setCurrent(current - 1);
  const onError = () =>
    toast.error("Vui lòng kiểm tra lại thông tin biểu mẫu!");

  const footer = () => {
    if (typesLoading) return null;
    const currentType = campaignTypes?.find((c) => c.id === typeId);
    const coinValue = currentType?.coin || 0;
    return (
      <div className="cost-container">
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <label className="cost-label">Chi phí loại chiến dịch: </label>
          <TotalCost>
            {coinValue.toLocaleString("vi-VN")}
            <img className="shape-avatar-campaign-bean" src={greenBean} alt="bean" />
          </TotalCost>
        </div>
      </div>
    );
  };

  const tileDisabled = ({ date, view }) => {
    if (view !== "month") return false;
    const today = moment().startOf("day");
    const maxFutureDate = moment().add(1, "year");
    const momentDate = moment(date);

    if (momentDate.isBefore(today)) return true;
    if (momentDate.isAfter(maxFutureDate)) return true;

    return false;
  };

  const handleDateChange = (date, fieldName) => {
    const momentDate = moment(date);
    setValue(fieldName, momentDate);
    if (fieldName === "startOn" && momentDate.isValid() && selectedCampaignType?.duration) {
      const monthsToAdd = Math.floor(selectedCampaignType.duration / 30);
      let newEndDate = moment(momentDate).add(monthsToAdd, "months").subtract(1, "day");

      const startDay = momentDate.date();
      const targetMonthEnd = moment(newEndDate).endOf("month").date();
      if (startDay > targetMonthEnd) {
        newEndDate = moment(newEndDate).endOf("month").subtract(1, "day");
      } else if (startDay === moment(momentDate).endOf("month").date()) {
        newEndDate = moment(newEndDate).endOf("month").subtract(1, "day");
      }

      setValue("endOn", newEndDate);
    }
  };

  return (
    <>
      <div>
        <Card className="card-noti">
          <div>
            <label>⚠️ Lưu ý: </label>
          </div>
          <div className="notification-create">
            <span>
              - Loại chiến dịch và thời gian diễn ra sau khi xác nhận sẽ không
              thể chỉnh sửa.
            </span>
          </div>
        </Card>
      </div>
      <TimeEventContainer>
        <Spin spinning={typesLoading}>
          <Card>
            <Header>
              <div>Loại chiến dịch và thời gian diễn ra</div>
            </Header>
            <CustomFormRow label="Loại chiến dịch" error={typeError}>
              <FormSelect
                id="typeId"
                placeholder="Chọn thể loại"
                {...register("typeId", {
                  required: "Vui lòng chọn loại chiến dịch",
                })}
                disabled={typesLoading || !campaignTypesOptions.length}
                onChange={handleCampaignTypesOption}
                options={campaignTypesOptions}
              />
            </CustomFormRow>
            <CustomFormRow
              label="Ngày bắt đầu"
              error={errors?.startOn?.message}
            >
              <Controller
                name="startOn"
                control={control}
                render={({ field }) => (
                  <Calendar
                    onChange={(date) => handleDateChange(date, "startOn")}
                    value={field.value ? field.value.toDate() : null}
                    tileDisabled={tileDisabled}
                    minDate={new Date()}
                    maxDate={moment().add(1, "year").toDate()}
                    disabled={typesLoading}
                  />
                )}
                rules={{ required: "Vui lòng chọn ngày bắt đầu" }}
              />
            </CustomFormRow>
            <CustomFormRow label="Ngày kết thúc" error={errors?.endOn?.message}>
              <Controller
                name="endOn"
                control={control}
                render={({ field }) => (
                  <Calendar
                    value={field.value ? field.value.toDate() : null}
                    minDate={startOn ? startOn.toDate() : new Date()}
                    maxDate={
                      startOn && selectedCampaignType?.duration
                        ? moment(startOn)
                            .add(Math.floor(selectedCampaignType.duration / 30), "months")
                            .toDate()
                        : moment().add(1, "year").toDate()
                    }
                    disabled={true}
                  />
                )}
                rules={{ required: "Ngày kết thúc không hợp lệ" }}
              />
            </CustomFormRow>
            <footer>{footer()}</footer>
          </Card>
        </Spin>
      </TimeEventContainer>
      <div className="btn-next-prev">
        <ButtonNextPrev onClick={onSubmitPrev} disabled={typesLoading}>
          Quay lại
        </ButtonNextPrev>
        <ButtonNextPrev
          className="btn-next-form"
          onClick={handleSubmit(onSubmit, onError)}
          disabled={typesLoading}
        >
          {typesLoading ? <Spin /> : "Tiếp theo"}
        </ButtonNextPrev>
      </div>
    </>
  );
}

export default CampaignTimeOfEvent;
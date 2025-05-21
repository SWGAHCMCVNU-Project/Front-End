import { Card, Spin, Popover } from "antd";
import moment from "moment-timezone";
import {
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
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

moment.tz.setDefault("Asia/Ho_Chi_Minh");

const TimeEventContainer = styled.div`
  margin-bottom: 60px;
  max-height: 400px;
  overflow-y: auto;

  .react-calendar {
    width: 280px;
    border: none;
    font-size: 14px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
  }

  .react-calendar__tile--active {
    background: #1890ff;
    color: #fff;
    border-radius: 4px;
  }

  .react-calendar__tile--now {
    background: #e6f7ff;
  }

  .react-calendar__tile--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .calendar-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    background: #fff;
    &:hover {
      border-color: #1890ff;
    }
    &:focus {
      border-color: #1890ff;
      outline: none;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
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
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const { register, handleSubmit, setValue, control, formState, watch } =
    useForm({
      defaultValues: {
        typeId: newCampaign?.typeId || null,
        startOn: newCampaign?.startOn ? moment(newCampaign.startOn) : null,
        endOn: newCampaign?.endOn ? moment(newCampaign.endOn) : null,
      },
    });
  const { errors } = formState;
  const typeId = watch("typeId");
  const startOn = watch("startOn");

  // Initialize component
  useEffect(() => {
    isMounted.current = true;
    window.scrollTo(0, 0);

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const walletData = await walletService.getWalletByBrandId();
        if (isMounted.current) {
          setWalletBalance(walletData.balance);
        }
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
        if (isMounted.current) {
          setWalletBalance(0);
          toast.error("Không thể tải số dư ví");
        }
      }
    };
    fetchWalletBalance();
  }, []);

  // Update campaign types options
  useEffect(() => {
    if (campaignTypes && Array.isArray(campaignTypes)) {
      const options = campaignTypes.map((c) => ({
        value: c.id,
        label: c.typeName,
        coin: c.coin,
        duration: c.duration,
      }));
      if (isMounted.current) {
        setCampaignTypesOptions(options);
      }
    }
  }, [campaignTypes]);

  // Set initial typeId if none exists
  useEffect(() => {
    if (
      campaignTypesOptions.length > 0 &&
      !newCampaign?.typeId &&
      isMounted.current
    ) {
      const firstOption = campaignTypesOptions[0].value;
      const selectedType = campaignTypes.find((c) => c.id === firstOption);
      setValue("typeId", firstOption);
      setSelectedCampaignType(selectedType);
      setNewCampaign((prev) => ({
        ...prev,
        typeId: firstOption,
        campaignTypeCoin: selectedType?.coin || 0,
      }));
    }
  }, [campaignTypesOptions, campaignTypes, setValue, setNewCampaign]);

  // Update selectedCampaignType when typeId changes
  useEffect(() => {
    if (typeId && campaignTypes) {
      const selectedType = campaignTypes.find((c) => c.id === typeId);
      if (isMounted.current) {
        setSelectedCampaignType(selectedType);
      }
    }
  }, [typeId, campaignTypes]);

  const handleCampaignTypesOption = useCallback(
    (value) => {
      if (isMounted.current) {
        const selectedType = campaignTypes?.find((c) => c.id === value);
        setValue("typeId", value);
        setSelectedCampaignType(selectedType);
        setNewCampaign((prev) => ({
          ...prev,
          typeId: value,
          campaignTypeCoin: selectedType?.coin || 0,
        }));
      }
    },
    [campaignTypes, setNewCampaign, setValue]
  );

  const validateCampaign = useCallback(
    (typeId, timeRange, campaignType) => {
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
        errors.push("Vui lòng chọn ngày bắt đầu và ngày kết thúc");
      } else {
        const start = moment(timeRange.startOn);
        const end = moment(timeRange.endOn);
        const today = moment().startOf("day");
        const maxEndDate = moment(start).add(
          campaignType?.duration || 30,
          "days"
        );
        if (!start.isValid() || !end.isValid()) {
          errors.push("Ngày không hợp lệ");
        } else if (end.isBefore(start)) {
          errors.push("Ngày kết thúc phải sau ngày bắt đầu");
        } else if (start.isBefore(today)) {
          errors.push("Ngày bắt đầu phải là ngày hiện tại hoặc sau đó");
        } else if (end.isAfter(maxEndDate)) {
          errors.push(
            `Ngày kết thúc không được vượt quá ${campaignType?.duration} ngày kể từ ngày bắt đầu`
          );
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
    },
    [walletBalance]
  );

  const handleDateChange = useCallback(
    (date, fieldName) => {
      const momentDate = moment(date);
      setValue(fieldName, momentDate);
      setNewCampaign((prev) => ({
        ...prev,
        [fieldName]: momentDate.format("YYYY-MM-DD"),
      }));
      if (fieldName === "startOn") {
        const currentEndDate = watch("endOn");
        if (currentEndDate) {
          const maxEndDate = moment(momentDate).add(
            selectedCampaignType?.duration || 30,
            "days"
          );
          if (moment(currentEndDate).isAfter(maxEndDate)) {
            setValue("endOn", null);
            setNewCampaign((prev) => ({
              ...prev,
              endOn: null,
            }));
          }
        }
        setStartOpen(false);
      } else if (fieldName === "endOn") {
        setEndOpen(false);
      }
    },
    [setValue, setNewCampaign, selectedCampaignType?.duration, watch]
  );

  const onSubmit = useCallback(
    (data) => {
      const formattedStartOn = data.startOn?.format("YYYY-MM-DD");
      const formattedEndOn = data.endOn?.format("YYYY-MM-DD");
      if (!formattedStartOn || !formattedEndOn) {
        toast.error("Vui lòng chọn ngày bắt đầu và ngày kết thúc");
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
        setNewCampaign((prev) => ({
          ...prev,
          typeId: data.typeId,
          startOn: formattedStartOn,
          endOn: formattedEndOn,
          campaignTypeCoin: selectedCampaignType?.coin || 0,
        }));
        setCompletedSteps((prev) => [...new Set([...prev, 2])]);
        setCurrent(current + 1);
      }
    },
    [
      validateCampaign,
      selectedCampaignType,
      setNewCampaign,
      setCompletedSteps,
      current,
      setCurrent,
    ]
  );

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
            <span style={{ marginRight: "1px",marginTop: "11px" }} /> {/* Thêm khoảng cách */}
            {coinValue.toLocaleString("vi-VN")}
            <img
              className="shape-avatar-campaign-bean"
              src={greenBean}
              alt="bean"
            />
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

  const tileDisabledEnd = useMemo(() => {
    return ({ date, view }) => {
      if (view !== "month") return false;
      const momentDate = moment(date);
      const minEndDate = startOn
        ? moment(startOn).add(1, "day")
        : moment().startOf("day");
      const maxEndDate =
        startOn && selectedCampaignType?.duration
          ? moment(startOn).add(selectedCampaignType.duration, "days")
          : moment().add(1, "year");

      if (momentDate.isBefore(minEndDate)) return true;
      if (momentDate.isAfter(maxEndDate)) return true;

      return false;
    };
  }, [startOn, selectedCampaignType?.duration]);

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
              <Controller
                name="typeId"
                control={control}
                rules={{ required: "Vui lòng chọn loại chiến dịch" }}
                render={({ field }) => (
                  <FormSelect
                    {...field}
                    id="typeId"
                    placeholder="Chọn thể loại"
                    disabled={typesLoading || !campaignTypesOptions.length}
                    options={campaignTypesOptions}
                    onChange={(value) => {
                      field.onChange(value);
                      handleCampaignTypesOption(value);
                    }}
                  />
                )}
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
                  <Popover
                    content={
                      <Calendar
                        onChange={(date) => handleDateChange(date, "startOn")}
                        value={field.value ? field.value.toDate() : null}
                        tileDisabled={tileDisabled}
                        minDate={new Date()}
                        maxDate={moment().add(1, "year").toDate()}
                      />
                    }
                    trigger="click"
                    open={startOpen}
                    onOpenChange={setStartOpen}
                    disabled={typesLoading}
                  >
                    <div className="calendar-input">
                      {field.value
                        ? field.value.format("DD/MM/YYYY")
                        : "Chọn ngày"}
                    </div>
                  </Popover>
                )}
                rules={{ required: "Vui lòng chọn ngày bắt đầu" }}
              />
            </CustomFormRow>
            <CustomFormRow label="Ngày kết thúc" error={errors?.endOn?.message}>
              <Controller
                name="endOn"
                control={control}
                render={({ field }) => (
                  <Popover
                    content={
                      <Calendar
                        onChange={(date) => handleDateChange(date, "endOn")}
                        value={field.value ? field.value.toDate() : null}
                        tileDisabled={tileDisabledEnd}
                        minDate={startOn ? startOn.toDate() : new Date()}
                        maxDate={
                          startOn && selectedCampaignType?.duration
                            ? moment(startOn)
                                .add(selectedCampaignType.duration, "days")
                                .toDate()
                            : moment().add(1, "year").toDate()
                        }
                      />
                    }
                    trigger="click"
                    open={endOpen}
                    onOpenChange={setEndOpen}
                    disabled={typesLoading || !startOn}
                  >
                    <div className="calendar-input">
                      {field.value
                        ? field.value.format("DD/MM/YYYY")
                        : "Chọn ngày"}
                    </div>
                  </Popover>
                )}
                rules={{ required: "Vui lòng chọn ngày kết thúc" }}
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

import { Card, DatePicker, Spin } from "antd";
import moment from "moment-timezone";
import { useContext, useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { NextPrevContext } from "../../../context/NextPrevContext";
import storageService from "../../../services/storageService";
import FileInput from "../../../ui/FileInput";
import Input from "../../../ui/Input";
import { ButtonNextPrev } from "../../../ui/custom/Button/Button";
import { CustomFormEditorRow, CustomFormRow } from "../../../ui/custom/Form/InputItem/CustomFormItem";
import MyEditor from "../../../ui/custom/Form/TextEditor/MyEditor";
import { FormSelect, SelectForm } from "../../../ui/custom/Select/SelectBox/SelectForm";
import { ReviewImageUpload } from "../../../ui/custom/Upload/UploadImage";
import { useCampaignTypes } from "../../../hooks/campaign-type/useCampaignTypes";

const StyledDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  padding: 2.4rem 4rem;
  overflow: hidden;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
`;

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding-bottom: 2px;
    `}
  overflow: hidden;
  font-size: 1.4rem;
`;

const Header = styled.header`
  color: var(--color-green-600);
  font-size: 1.7rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.7rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const CampaignFormContainer = styled.div`
  display: flex;
  gap: 3rem;
`;

const LeftFormHalf = styled.div`
  flex: 4;
`;

const RightFormHalf = styled.div`
  flex: 2;
`;

function CampaignBasicInformation() {
    const { campaignTypes, isLoading: typesLoading } = useCampaignTypes({ state: true });
    const [campaignTypesOptions, setCampaignTypesOptions] = useState([]);
    const [typeError, setTypeError] = useState("");
    const [fileCard, setFileCard] = useState(null);
    const { newCampaign, setNewCampaign, current, setCurrent,completedSteps, setCompletedSteps } = useContext(NextPrevContext);
    const brandId = storageService.getLoginId();
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        window.scrollTo(0, 0);
        return () => {
            isMounted.current = false;
        };
    }, []);

    const currentDate = moment().startOf('day');

    const disabledDate = (current) => {
        return current && current < currentDate;
    };

    useEffect(() => {
        if (campaignTypes && Array.isArray(campaignTypes)) {
            const filteredCampaignTypes = campaignTypes.filter(c => c.state);
            if (filteredCampaignTypes.length > 0) {
                setCampaignTypesOptions(filteredCampaignTypes.map(c => ({ value: c.id, label: c.typeName })));
            } else {
                setCampaignTypesOptions([]);
            }
        } else {
            setCampaignTypesOptions([]);
        }
    }, [campaignTypes]);

    const { register, handleSubmit, getValues, setValue, control, formState, watch } =
        useForm({
            defaultValues: newCampaign
                ? {
                      ...newCampaign,
                      startOn: newCampaign.startOn ? moment(newCampaign.startOn, 'YYYY-MM-DD') : null,
                      endOn: newCampaign.endOn ? moment(newCampaign.endOn, 'YYYY-MM-DD') : null,
                  }
                : {
                      startOn: null,
                      endOn: null,
                  }
        });
    const { errors } = formState;

    const startOn = watch('startOn');
    const endOn = watch('endOn');

    useEffect(() => {
      
    }, [startOn, endOn, typesLoading]);

    useEffect(() => {
        if (newCampaign?.typeId !== undefined && isMounted.current) {
            setValue('typeId', newCampaign?.typeId);
        }
    }, [newCampaign]);

    const handleCampaignTypesOption = (value) => {
        if (isMounted.current) {
            setValue("typeId", value, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    };

    const handleCampaignTypesOptionUpdate = (selectedOption) => {
        if (isMounted.current) {
            setValue("typeId", selectedOption, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    };

    const handleAvatarChange = (event) => {
        const selectedFile = event.target.files[0];
        setFileCard(selectedFile);
    };

    const handleAvatarRemove = () => {
        setFileCard(null);
        if (isMounted.current) {
            setValue("image", newCampaign?.image ? newCampaign?.image : null);
        }
    };

    const handleDescriptionChange = (htmlContent) => {
        if (isMounted.current) {
            setValue("description", htmlContent);
        }
    };

    const handleConditionChange = (htmlContent) => {
        if (isMounted.current) {
            setValue("condition", htmlContent);
        }
    };

    const validateCampaign = (brandId, typeId, timeRange) => {
        const errors = [];

        if (!brandId) {
            errors.push("Brand ID is required");
        }

        if (!typeId) {
            errors.push("Type ID is required");
            setTypeError("Vui lòng chọn loại chiến dịch");
        } else {
            setTypeError("");
        }

        if (!timeRange.startOn || !timeRange.endOn) {
            errors.push("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc");
        } else {
            const start = moment(timeRange.startOn);
            const end = moment(timeRange.endOn);
            if (!start.isValid() || !end.isValid()) {
                errors.push("Khoảng thời gian không hợp lệ");
            } else if (end.isBefore(start)) {
                errors.push("Ngày kết thúc phải sau ngày bắt đầu");
            } else if (start.isBefore(currentDate, 'day')) {
                errors.push("Ngày bắt đầu phải là ngày hiện tại hoặc sau đó");
            }
        }

        return errors.length === 0 ? null : errors;
    };

    function onSubmit(data) {
        const image = typeof data.image === "string" ? data.image : data.image[0];
        const formattedStartOn = data.startOn ? data.startOn.format("YYYY-MM-DD") : null;
        const formattedEndOn = data.endOn ? data.endOn.format("YYYY-MM-DD") : null;
      
        if (!formattedStartOn || !formattedEndOn) {
          return;
        }
      
        const checkCampaignType = data.typeId;
        const timeRange = {
          startOn: formattedStartOn,
          endOn: formattedEndOn,
        };
      
        const validationErrors = validateCampaign(brandId, checkCampaignType, timeRange);
        if (validationErrors) {
          return;
        }
      
        if (isMounted.current) {
          setNewCampaign({
            ...data,
            brandId: brandId,
            image: image ? image : newCampaign?.image,
            startOn: formattedStartOn,
            endOn: formattedEndOn,
          });
          setCompletedSteps((prev) => [...new Set([...prev, 0])]); // Đánh dấu bước 0 hoàn thành
          setCurrent(current + 1);
        }
      }
    function onError(errors) {
        // console.log("Form errors:", errors);
    }

    return (
        <>
            <div>
                <Card className="card-noti">
                    <div>
                        <label>⚠️ Lưu ý: </label>
                    </div>
                    <div className="notification-create">
                        <span>
                            - Ở bước 2 và 3, để tạo chiến dịch thành công, bạn cần có sẵn cửa hàng và phiếu ưu đãi hợp lệ trên hệ thống.
                            Nếu bạn đã có sẵn, vui lòng bỏ qua thông báo này.
                        </span>
                        <span>
                            - Xem danh sách cửa hàng của bạn <Link className="link-noti" to={'/stores'}> tại đây</Link>.
                        </span>
                        <span>
                            - Xem phiếu ưu đãi của bạn <Link className="link-noti" to={'/voucher-items'}> tại đây</Link>.
                        </span>
                    </div>
                </Card>
            </div>
            <Form
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <CampaignFormContainer>
                    <LeftFormHalf>
                        <StyledDataBox>
                            <Header>
                                <div>Thông tin cơ bản </div>
                            </Header>
                            <CustomFormRow
                                label="Tên chiến dịch"
                                error={errors?.campaignName?.message}>
                                <Input
                                    type="text"
                                    id="campaignName"
                                    disabled={typesLoading}
                                    placeholder="Nhập tên chiến dịch..."
                                    {...register("campaignName", {
                                        required: "Vui lòng nhập tên chiến dịch",
                                        validate: {
                                            noWhiteSpace: (value) =>
                                                value.trim().length >= 3 ||
                                                "Tên chiến dịch ít nhất 3 kí tự"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Tên chiến dịch tối đa 100 kí tự"
                                        }
                                    })}
                                />
                            </CustomFormRow>

                            <CustomFormRow
                                label="Link Website (nếu có)"
                                error={errors?.link?.message}>
                                <Input
                                    type="text"
                                    id="link"
                                    disabled={typesLoading}
                                    placeholder="Nhập link website..."
                                    {...register("link")}
                                />
                            </CustomFormRow>

                            <CustomFormEditorRow
                                label="Mô tả"
                                error={errors?.description?.message}>
                                <MyEditor
                                    id="description"
                                    initialContent={newCampaign?.description ? newCampaign.description : ""}
                                    onContentChange={handleDescriptionChange}
                                    {...register("description", {
                                        required: "Vui lòng nhập mô tả",
                                        validate: {
                                            noWhiteSpace: (value) => {
                                                const cleanedValue = value.replace(/\s| /g, "");
                                                return (
                                                    cleanedValue.length >= 10 ||
                                                    "Mô tả ít nhất 3 kí tự"
                                                );
                                            }
                                        },
                                        maxLength: {
                                            value: 1000,
                                            message: "Mô tả tối đa 1000 kí tự"
                                        }
                                    })}
                                    disabled={typesLoading}
                                />
                            </CustomFormEditorRow>
                        </StyledDataBox>

                        <StyledDataBox>
                            <CustomFormEditorRow
                                label="Thể lệ chiến dịch"
                                error={errors?.condition?.message}>
                                <MyEditor
                                    id="condition"
                                    initialValue={newCampaign?.condition ? newCampaign.condition : ""}
                                    onContentChange={handleConditionChange}
                                    {...register("condition", {
                                        required: "Vui lòng nhập thể lệ",
                                        validate: {
                                            noWhiteSpace: (value) => {
                                                const cleanedValue = value.replace(/\s| /g, "");
                                                return (
                                                    cleanedValue.length >= 10 ||
                                                    "Thể lệ ít nhất 3 kí tự"
                                                );
                                            }
                                        },
                                        maxLength: {
                                            value: 1000,
                                            message: "Thể lệ tối đa 1000 kí tự"
                                        }
                                    })}
                                    disabled={typesLoading}
                                />
                            </CustomFormEditorRow>
                        </StyledDataBox>
                    </LeftFormHalf>

                    <RightFormHalf>
                        <StyledDataBox>
                            <Header>
                                <div>Hình ảnh</div>
                            </Header>
                            <ReviewImageUpload
                                label="Ảnh chiến dịch"
                                error={errors?.image?.message}
                                file={fileCard}
                                fileRemove={handleAvatarRemove}
                                disabled={typesLoading}
                                image={newCampaign?.image}
                                edit={false}
                            >
                                <FileInput
                                    id="image"
                                    accept="image/*"
                                    label="Chọn ảnh"
                                    disabled={typesLoading}
                                    {...register("image", {
                                        required:
                                            !getValues("image") || getValues("image").length === 0
                                                ? "Vui lòng thêm hình ảnh cho chiến dịch"
                                                : false,
                                    })}
                                    onChange={handleAvatarChange}
                                />
                            </ReviewImageUpload>
                        </StyledDataBox>

                        <StyledDataBox>
                            <Header>
                                <div>
                                    Loại chiến dịch
                                </div>
                            </Header>
                            <CustomFormRow error={typeError}>
                                {newCampaign?.typeId ? (
                                    <SelectForm
                                        id="typeId"
                                        value={newCampaign?.typeId ? newCampaign?.typeId : null}
                                        {...register("typeId")}
                                        disabled={typesLoading}
                                        onChange={handleCampaignTypesOptionUpdate}
                                        options={campaignTypesOptions}
                                    />
                                ) : (
                                    <FormSelect
                                        id="typeId"
                                        placeholder='Chọn thể loại'
                                        {...register("typeId")}
                                        disabled={typesLoading}
                                        onChange={handleCampaignTypesOption}
                                        options={campaignTypesOptions}
                                    />
                                )}
                            </CustomFormRow>
                        </StyledDataBox>

                        <StyledDataBox>
                            <Header>
                                <div>
                                    Thời gian diễn ra
                                </div>
                            </Header>
                            <CustomFormRow error={errors?.startOn?.message || errors?.endOn?.message}>
                                <Controller
                                    name="startOn"
                                    control={control}
                                    defaultValue={newCampaign?.startOn ? moment(newCampaign.startOn, 'YYYY-MM-DD') : null}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            value={field.value}
                                            disabledDate={disabledDate}
                                            onChange={(date) => {
                                                if (isMounted.current && date) {
                                                    field.onChange(date);
                                                    setValue('startOn', date, { shouldValidate: true });
                                                    // console.log("Updated startOn:", date.format('YYYY-MM-DD'));
                                                }
                                            }}
                                            disabled={typesLoading}
                                            style={{ marginRight: '8px' }}
                                            format="YYYY-MM-DD"
                                        />
                                    )}
                                    rules={{ required: "Vui lòng chọn ngày bắt đầu" }}
                                />
                                <Controller
                                    name="endOn"
                                    control={control}
                                    defaultValue={newCampaign?.endOn ? moment(newCampaign.endOn, 'YYYY-MM-DD') : null}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            value={field.value}
                                            disabledDate={disabledDate}
                                            onChange={(date) => {
                                                if (isMounted.current && date) {
                                                    field.onChange(date);
                                                    setValue('endOn', date, { shouldValidate: true });
                                                    // console.log("Updated endOn:", date.format('YYYY-MM-DD'));
                                                }
                                            }}
                                            disabled={typesLoading}
                                            format="YYYY-MM-DD"
                                        />
                                    )}
                                    rules={{ required: "Vui lòng chọn ngày kết thúc" }}
                                />
                            </CustomFormRow>
                            {errors.startOn && <p style={{ color: 'red' }}>{errors.startOn.message}</p>}
                            {errors.endOn && <p style={{ color: 'red' }}>{errors.endOn.message}</p>}
                        </StyledDataBox>
                    </RightFormHalf>
                </CampaignFormContainer>
            </Form>

            <div className="btn-next-prev">
                <ButtonNextPrev
                    onClick={handleSubmit(onSubmit, onError)}
                    disabled={typesLoading}>
                    {typesLoading ? <Spin /> : "Tiếp theo"}
                </ButtonNextPrev>
            </div>
        </>
    );
}

export default CampaignBasicInformation;
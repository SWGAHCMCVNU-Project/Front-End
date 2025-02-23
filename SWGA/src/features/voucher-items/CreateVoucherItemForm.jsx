import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import Textarea from "../../ui/Textarea";
import { FormSelect } from "../../ui/custom/Select/SelectBox/SelectForm";
// import { useEditStation } from "../stations/useEditStation";
import ConfirmDownloadFile from "./ConfirmDownloadFile";
import ModalDownloadFileItemForm from "./ModalDownloadFileItemForm";
import { useCreateVoucherItem } from "./useCreateVoucherItem";
import { useVouchersFilter } from "./useVouchersFilter";

const InputPriceUnit = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  align-items: center;
  width: 74%;
`;

function CreateVoucherItemForm({ stationToEdit = {}, onCloseModal }) {
  const { isCreating, createVoucherItem } = useCreateVoucherItem();
  const { isEditing, editStation } = useEditStation();

  const { vouchersFilter } = useVouchersFilter();

  const queryClient = useQueryClient();
  const [filename, setFilename] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = stationToEdit;

  const isEditSession = Boolean(editId);

  const validateQuantity = (value) => {
    if (!value) return "Hãy nhập số lượng";
    if (isNaN(value) || parseInt(value) <= 0)
      return "Số lượng phải là số nguyên dương";
    if (parseInt(value) >= 1000) return "Số lượng không được vượt quá 1000";
    return true;
  };

  const { register, handleSubmit, reset, getValues, setValue, formState } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;
  const [vouchersOptions, setVouchersOptions] = useState([]);
  const [voucherError, setVoucherError] = useState("");

  const getDataSelectBox = () => {
    if (vouchersFilter?.result?.length > 0) {
      setVouchersOptions(
        vouchersFilter.result.map((voucher) => ({
          value: voucher.id,
          label: voucher.voucherName,
        }))
      );
    }
  };

  useEffect(() => {
    getDataSelectBox();
  }, [vouchersFilter]);

  const handleVoucherOptions = (selectedOption) => {
    setValue("voucherId", selectedOption, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setVoucherError("");
  };

  function onSubmit(data) {
    if (!data.voucherId) {
      setVoucherError("Vui lòng chọn ưu đãi");
      return;
    } else {
      setVoucherError("");
    }

    if (isEditSession)
      editStation(
        { newStationData: { ...data }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createVoucherItem(
        { ...data },
        {
          onSuccess: (data) => {
            const cachedFilename = queryClient.getQueryData(["filename"]);
            setFilename(cachedFilename);

            const cachedResponseData = queryClient.getQueryData([
              "responseData",
            ]);
            setResponseData(cachedResponseData);

            if (cachedFilename && cachedFilename.includes("Result")) {
              // onCloseModal?.();
            }
          },
        }
      );
  }
  function onError(errors) {
    // console.log(errors);
  }

  const handleDownload = () => {
    const url = window.URL.createObjectURL(new Blob([responseData]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.xlsx`);
    link.click();
  };

  return (
    <>
      <ButtonGroup>
        {filename && filename.includes("Result") && (
          <ModalDownloadFileItemForm>
            <ModalDownloadFileItemForm.Window name="download-file-result">
              <ConfirmDownloadFile
                resourceName="kết quả"
                disabled={isWorking}
                onConfirm={handleDownload}
              />
            </ModalDownloadFileItemForm.Window>
          </ModalDownloadFileItemForm>
        )}
      </ButtonGroup>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow label="Ưu đãi" error={voucherError}>
          {vouchersFilter && vouchersFilter.result ? (
            <FormSelect
              id="voucherId"
              placeholder="Chọn ưu đãi"
              disabled={isWorking}
              onChange={handleVoucherOptions}
              options={vouchersOptions}
            />
          ) : (
            <SpinnerMini />
          )}
        </FormRow>

        <FormRow label="Số lượng" error={errors?.quantity?.message}>
          <InputPriceUnit
            type="number"
            id="quantity"
            disabled={isWorking}
            placeholder="Ví dụ: 10"
            {...register("quantity", {
              validate: validateQuantity,
            })}
          />
        </FormRow>

        <FormRow label="Mô tả" error={errors?.description?.message}>
          <Textarea
            type="number"
            id="description"
            disabled={isWorking}
            defaultValue=""
            {...register("description", {
              required: "Hãy nhập mô tả",
              maxLength: {
                value: 1000,
                message: "Mô tả tối đa 1000 kí tự",
              },
              validate: {
                noWhiteSpace: (value) =>
                  value.trim().length >= 3 || "Mô tả ít nhất 3 kí tự",
              },
            })}
          />
        </FormRow>

        <FormRow>
          <Button
            $variations="secondary"
            type="reset"
            disabled={isWorking}
            onClick={() => onCloseModal?.()}
          >
            Hủy bỏ
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Chỉnh sửa phiếu ưu đãi" : "Tạo phiếu ưu đãi mới"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateVoucherItemForm;

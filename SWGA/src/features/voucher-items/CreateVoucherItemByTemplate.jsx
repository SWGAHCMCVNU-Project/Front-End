import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowDownTray, HiOutlineDocumentText } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import Textarea from "../../ui/Textarea";
import { FormSelect } from "../../ui/custom/Select/SelectBox/SelectForm";
// import { useEditStation } from "../stations/useEditStation";
import ConfirmDownloadFile from "./ConfirmDownloadFile";
import FileCardEditForm from "./FileCardEditForm";
import ModalDownloadFile from "./ModalDownloadFile";
import { useCreateVoucherItemTemplate } from "./useCreateVoucherItemTemplate";
import { useVouchersFilter } from "./useVouchersFilter";
import { mockGetVoucherItemTemplateUrl } from "./mockVoucherItems";

const StyledContainerDownload = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: flex-start;
`;

const ContentGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.5rem;
  font-weight: 500;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;

const FormContainer = styled.div`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
  margin-bottom: 0.7rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  align-items: center;
  width: 74%;
`;

function CreateVoucherItemByTemplate({ stationToEdit = {}, onCloseModal }) {
  const { isCreating, createVoucherItemTemplate } =
    useCreateVoucherItemTemplate();
  const { isEditing, editStation } = useEditStation();
  const { vouchersFilter } = useVouchersFilter();

  const queryClient = useQueryClient();
  const [filename, setFilename] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = stationToEdit;

  const isEditSession = Boolean(editId);

  const [fileVoucherItem, setFileVoucherItem] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileVoucherItem(selectedFile);
  };

  const handleFileImageRemove = () => {
    setFileVoucherItem(null);
    setValue("template", null);
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
    const template =
      typeof data.template === "string" ? data.template : data.template[0];
    // console.log(data);
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
      createVoucherItemTemplate(
        { ...data, template: template },
        {
          onSuccess: (data) => {
            const cachedFilename = queryClient.getQueryData([
              "createdVoucherItemFilename",
            ]);
            setFilename(cachedFilename);

            const cachedResponseData = queryClient.getQueryData([
              "createdVoucherItemResponseData",
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

  const resetForm = () => {
    reset();
    setFileVoucherItem(null);
  };

  const handleDownload = () => {
    const url = window.URL.createObjectURL(new Blob([responseData]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.xlsx`);
    link.click();
  };

  return (
    <>
      <FormContainer>
        <StyledContainerDownload>
          <ContentGroup>
            <div>Nếu chưa có file bạn có thể sử dụng mẫu dưới đây:</div>

            {filename === "Exception" ? (
              <div>
                Để xem các phiếu ưu đãi không hợp lệ, tải file dưới đây:
              </div>
            ) : null}
          </ContentGroup>
          <ButtonGroup>
            <Button $variations="orange" onClick={mockGetVoucherItemTemplateUrl}>
              <StyledContainerButton>
                <StyledButton>
                  <HiArrowDownTray />
                </StyledButton>
                Tải mẫu xuống
              </StyledContainerButton>
            </Button>

            {filename === "Exception" ? (
              <Button $variations="danger" onClick={handleDownload}>
                <StyledContainerButton>
                  <StyledButton>
                    <HiOutlineDocumentText />
                  </StyledButton>
                  Tệp báo lỗi
                </StyledContainerButton>
              </Button>
            ) : null}

            {filename && filename.includes("Result") && (
              <ModalDownloadFile>
                <ModalDownloadFile.Window name="download-file-result">
                  <ConfirmDownloadFile
                    resourceName="kết quả"
                    disabled={isWorking}
                    onConfirm={handleDownload}
                  />
                </ModalDownloadFile.Window>
              </ModalDownloadFile>
            )}
          </ButtonGroup>
        </StyledContainerDownload>
      </FormContainer>
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

        <FileCardEditForm
          label="File phiếu ưu đãi"
          error={errors?.template?.message}
          file={fileVoucherItem}
          avatar={editValues.template}
          fileRemove={handleFileImageRemove}
        >
          <FileInput
            id="template"
            accept=".xlsx, .xls"
            {...register("template", {
              required:
                !getValues("template") || getValues("template").length === 0
                  ? "Thêm file danh sách phiếu ưu đãi"
                  : false,
            })}
            onChange={handleImageChange}
          />
        </FileCardEditForm>

        <FormRow>
          <Button
            $variations="secondary"
            type="reset"
            disabled={isWorking}
            onClick={() => {
              onCloseModal?.();
              resetForm();
            }}
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

export default CreateVoucherItemByTemplate;

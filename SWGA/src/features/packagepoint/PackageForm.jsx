import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import { useCreatePointPackage } from "../../hooks/point-package/useCreatePointPackage";
import { useUpdatePointPackage } from "../../hooks/point-package/useUpdatePointPackage";

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

const PackageForm = ({ packageToEdit = {}, onCloseModal }) => {
  const { id: editId, packageName, point, price, status } = packageToEdit;
  const isEditSession = Boolean(editId);

  const { create, isLoading: isCreating } = useCreatePointPackage();
  const { update, isLoading: isUpdating } = useUpdatePointPackage();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? {
          packageName: packageName || "",
          point: point || 0,
          price: price || 0,
          status: status ?? true,
        }
      : {
          status: true,
        },
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    const formData = {
      packageName: data.packageName?.trim() || "",
      point: Number(data.point),
      price: Number(data.price),
      status: data.status ?? true,
    };

    if (!formData.packageName) {
      toast.error("Vui lòng nhập tên gói điểm");
      return;
    }

    if (isEditSession) {
      update(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            queryClient.invalidateQueries(["pointPackages"]);
          },
        }
      );
    } else {
      create(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
          queryClient.invalidateQueries(["pointPackages"]);
        },
      });
    }
  };

  const isWorking = isCreating || isUpdating;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Tên gói điểm" error={errors?.packageName?.message}>
        <StyledInput
          type="text"
          id="packageName"
          disabled={isWorking}
          {...register("packageName", {
            required: "Hãy nhập tên gói điểm",
            minLength: {
              value: 3,
              message: "Tên gói điểm ít nhất 3 ký tự",
            },
            maxLength: {
              value: 50,
              message: "Tên gói điểm tối đa 50 ký tự",
            },
          })}
        />
      </FormRow>
      <FormRow label="Điểm" error={errors?.point?.message}>
        <StyledInput
          type="number"
          id="point"
          disabled={isWorking}
          {...register("point", {
            required: "Hãy nhập số điểm",
            min: { value: 0, message: "Điểm phải lớn hơn hoặc bằng 0" },
          })}
        />
      </FormRow>
      <FormRow label="Giá (VND)" error={errors?.price?.message}>
        <StyledInput
          type="number"
          id="price"
          disabled={isWorking}
          {...register("price", {
            required: "Hãy nhập giá",
            min: { value: 0, message: "Giá phải lớn hơn hoặc bằng 0" },
          })}
        />
      </FormRow>
      {isEditSession && (
        <FormRow label="Trạng thái">
          <StyledInput
            type="checkbox"
            id="status"
            disabled={isWorking}
            {...register("status")}
          />
        </FormRow>
      )}
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
          {isEditSession ? "Cập nhật gói điểm" : "Tạo gói điểm mới"}
        </Button>
      </FormRow>
    </Form>
  );
};

PackageForm.propTypes = {
  packageToEdit: PropTypes.shape({
    id: PropTypes.string,
    packageName: PropTypes.string,
    point: PropTypes.number,
    price: PropTypes.number,
    status: PropTypes.bool,
  }),
  onCloseModal: PropTypes.func,
};

export default PackageForm;
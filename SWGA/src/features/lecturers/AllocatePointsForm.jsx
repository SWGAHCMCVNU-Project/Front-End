/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";
import ButtonCustom from "../../ui/custom/Button/ButtonCustom";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import StorageService from "../../services/storageService";
import { useDistributePoints } from "../../hooks/campus/useDistributePoints";

// Ensure FormRow and Input have consistent styling
const StyledFormRow = styled(FormRow)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  & label {
    flex: 0 0 150px; /* Match the label width in LecturerAccountForm */
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-grey-700);
  }

  & > div {
    flex: 1;
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 0.8rem;
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  background-color: var(--color-grey-0);

  &:disabled {
    background-color: var(--color-grey-200);
    cursor: not-allowed;
  }
`;

function AllocatePointsForm({ campusId: propCampusId,lecturerIds, onCloseModal }) {
  // Ensure campusId is a string
  let campusId;
  if (propCampusId && typeof propCampusId === "string") {
    campusId = propCampusId;
  } else if (propCampusId && typeof propCampusId === "object" && propCampusId.id) {
    campusId = propCampusId.id;
  } else {
    campusId = StorageService.getCampusId();
  }

  const { distributePoints, isDistributing, error: apiError } = useDistributePoints();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pointsAllocated: "",
    },
  });

  // Handle API errors


  const handleNumberInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  async function onSubmit(data) {
    if (!campusId) {
      toast.error("Không tìm thấy campusId!");
      return;
    }

    await distributePoints(
      { 
        campusId,
        lecturerIds, // Sử dụng prop lecturerIds
        points: parseInt(data.pointsAllocated) 
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }


  function onError(errors) {
    toast.error("Vui lòng kiểm tra lại thông tin nhập!");
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyDown={handleKeyDown}
      type={onCloseModal ? "modal" : "regular"}
    >
      <StyledFormRow label="Số điểm phân bổ" error={errors?.pointsAllocated?.message}>
        <StyledInput
          type="text"
          id="pointsAllocated"
          placeholder="Nhập số điểm..."
          disabled={isDistributing}
          {...register("pointsAllocated", {
            required: "Vui lòng nhập số điểm",
            pattern: {
              value: /^[0-9]+$/,
              message: "Số điểm phải là số dương",
            },
            validate: (value) => parseInt(value) > 0 || "Số điểm phải lớn hơn 0",
          })}
          onInput={handleNumberInput}
        />
      </StyledFormRow>

      <StyledFormRow>
        <ButtonCustom
          $variations="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isDistributing}
        >
          Hủy bỏ
        </ButtonCustom>
        <ButtonCustom
          type="submit"
          disabled={isDistributing || !campusId}
        >
          Phân bổ điểm
        </ButtonCustom>
      </StyledFormRow>
    </Form>
  );
}

export default AllocatePointsForm;
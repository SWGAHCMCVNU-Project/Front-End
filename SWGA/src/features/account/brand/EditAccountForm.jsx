import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import Input from "../../../ui/Input";
import FormRow from "./FormRow";
import useUpdateAccount from "../../../hooks/account/useUpdateAccount";

const BrandFormContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const FormHalf = styled.div`
  flex: 1;
  padding: 0 10px;
`;

function EditAccountForm({ accountToEdit = {}, onCloseModal }) {
  const { isLoading, updateAccount } = useUpdateAccount(onCloseModal);
  const { id: editId, userName, phone, email } = accountToEdit;

  if (!editId) {
    return <p>Không tìm thấy tài khoản để chỉnh sửa.</p>;
  }

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { userName, phone, email, oldPassword: "" },
  });
  const { errors } = formState;

  function onSubmit(data) {
    const updatedData = {
      userName: data.userName,
      password: data.password,
      phone: data.phone,
      email: data.email,
    };

    console.log("Submitting updated account data:", updatedData);

    updateAccount(editId, data.oldPassword, updatedData);
  }

  function onError(errors) {
    console.log("Validation errors:", errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <BrandFormContainer>
        <FormHalf>
          <FormRow label="Mật khẩu cũ" error={errors?.oldPassword?.message}>
            <Input
              type="password"
              id="oldPassword"
              disabled={isLoading}
              {...register("oldPassword", {
                required: "Hãy nhập mật khẩu cũ",
                minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
              })}
            />
          </FormRow>

          <FormRow label="Tên người dùng" error={errors?.userName?.message}>
            <Input
              type="text"
              id="userName"
              disabled={isLoading}
              {...register("userName", {
                required: "Hãy nhập tên người dùng",
                minLength: { value: 3, message: "Tên ít nhất 3 kí tự" },
                maxLength: { value: 50, message: "Tên tối đa 50 kí tự" },
              })}
            />
          </FormRow>

          <FormRow label="Mật khẩu mới" error={errors?.password?.message}>
            <Input
              type="password"
              id="password"
              disabled={isLoading}
              {...register("password", {
                minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
              })}
            />
          </FormRow>
        </FormHalf>

        <FormHalf>
          <FormRow label="Số điện thoại" error={errors?.phone?.message}>
            <Input
              type="tel"
              id="phone"
              disabled={isLoading}
              {...register("phone", {
                required: "Hãy nhập số điện thoại",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Số điện thoại phải là 10 chữ số",
                },
              })}
            />
          </FormRow>

          <FormRow label="Email" error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              disabled={isLoading}
              {...register("email", {
                required: "Hãy nhập email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ",
                },
              })}
            />
          </FormRow>
        </FormHalf>
      </BrandFormContainer>

      <FormRow>
        <Button
          $variations="secondary"
          type="reset"
          disabled={isLoading}
          onClick={() => onCloseModal()}
        >
          Hủy bỏ
        </Button>
        <Button disabled={isLoading}>Cập nhật tài khoản</Button>
      </FormRow>
    </Form>
  );
}

export default EditAccountForm;
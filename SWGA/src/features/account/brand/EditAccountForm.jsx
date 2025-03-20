import { useState } from "react"; // Thêm useState để quản lý tab
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import Input from "../../../ui/Input";
import FormRow from "./FormRow";
import useUpdateAccount from "../../../hooks/account/useUpdateAccount";

// Styled components cho tabbed interface
const BrandFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${(props) =>
    props.active ? "var(--color-brand-600)" : "var(--color-grey-500)"};
  background: none;
  border: none;
  border-bottom: ${(props) =>
    props.active ? "2px solid var(--color-brand-600)" : "none"};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: var(--color-brand-700);
  }
`;

const FormHalf = styled.div`
  flex: 1;
  padding: 0 10px;
`;

function EditAccountForm({ accountToEdit = {}, onCloseModal }) {
  const { isLoading, updateAccount } = useUpdateAccount(onCloseModal);
  const { id: editId, userName, phone, email } = accountToEdit;

  // Quản lý tab đang active
  const [activeTab, setActiveTab] = useState("info"); // Mặc định là tab "Thông tin"

  if (!editId) {
    return <p>Không tìm thấy tài khoản để chỉnh sửa.</p>;
  }

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { phone, email, oldPassword: "", password: "" },
  });
  const { errors } = formState;

  function onSubmit(data) {
    const updatedData = {};
    if (data.password) updatedData.password = data.password;
    if (data.phone) updatedData.phone = data.phone;
    if (data.email) updatedData.email = data.email;

    updatedData.userName = userName;

    console.log("Submitting updated account data:", updatedData);

    updateAccount(editId, data.oldPassword, updatedData, () => {
      console.log("Update successful, calling onCloseModal (refetch)");
      onCloseModal();
    });
  }

  function onError(errors) {
    console.log("Validation errors:", errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      {/* Tab navigation */}
      <TabContainer>
        <TabButton
          type="button"
          active={activeTab === "info"}
          onClick={() => setActiveTab("info")}
        >
          Thông tin
        </TabButton>
        <TabButton
          type="button"
          active={activeTab === "password"}
          onClick={() => setActiveTab("password")}
        >
          Mật khẩu
        </TabButton>
      </TabContainer>

      <BrandFormContainer>
        {/* Tab "Thông tin" */}
        {activeTab === "info" && (
          <>
            <FormHalf>
              <FormRow label="Tên người dùng">
                <Input
                  type="text"
                  id="userName"
                  value={userName}
                  disabled
                />
              </FormRow>

              <FormRow label="Số điện thoại" error={errors?.phone?.message}>
                <Input
                  type="tel"
                  id="phone"
                  disabled={isLoading}
                  {...register("phone", {
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
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
                    },
                  })}
                />
              </FormRow>
            </FormHalf>
          </>
        )}

        {/* Tab "Mật khẩu" */}
        {activeTab === "password" && (
          <>
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
          </>
        )}
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
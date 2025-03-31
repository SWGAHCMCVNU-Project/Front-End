import { useForm } from "react-hook-form";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import { useCreateCampusAccount } from "../../../hooks/campus/useCreateAccountCampus";

function CampusAccountForm({ campusId, campusName, onCloseModal }) {
  const { createCampusAccount, isCreating } = useCreateCampusAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
      email: "",
      phone: "",
    },
  });

  const handlePhoneInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  async function onSubmit(data) {
    createCampusAccount(
      { formData: data, campusId },
      {
        onSuccess: (response) => {
          if (response.success) {
            reset();
            onCloseModal?.();
          }
        },
        onError: (error) => {
          console.error("Tạo tài khoản thất bại:", error);
        },
      }
    );
  }

  function onError(errors) {
    console.log("Lỗi validation form:", errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyDown={handleKeyDown}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Campus">
        <Input
          type="text"
          id="campusName"
          value={campusName}
          disabled
        />
      </FormRow>

      <FormRow label="Tên đăng nhập" error={errors?.userName?.message}>
        <Input
          type="text"
          id="userName"
          placeholder="Nhập tên đăng nhập..."
          disabled={isCreating}
          {...register("userName", {
            required: "Vui lòng nhập tên đăng nhập",
            minLength: {
              value: 3,
              message: "Tên đăng nhập phải chứa ít nhất 3 ký tự",
            },
            maxLength: {
              value: 50,
              message: "Tên đăng nhập tối đa 50 ký tự",
            },
          })}
        />
      </FormRow>

      <FormRow label="Mật khẩu" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          placeholder="Nhập mật khẩu..."
          disabled={isCreating}
          {...register("password", {
            required: "Vui lòng nhập mật khẩu",
            minLength: {
              value: 6,
              message: "Mật khẩu phải chứa ít nhất 6 ký tự",
            },
            maxLength: {
              value: 50,
              message: "Mật khẩu tối đa 50 ký tự",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          placeholder="Nhập địa chỉ email..."
          disabled={isCreating}
          {...register("email", {
            pattern: {
              value: /^(?!\.)[a-zA-Z0-9]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
              message: "Định dạng email không hợp lệ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Số điện thoại" error={errors?.phone?.message}>
        <Input
          type="tel"
          id="phone"
          placeholder="Ví dụ: 0909339779"
          disabled={isCreating}
          {...register("phone", {
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: "Số điện thoại hợp lệ phải từ 10 đến 11 số",
            },
          })}
          onInput={handlePhoneInput}
        />
      </FormRow>

      <FormRow>
        <ButtonCustom
          $variations="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCreating}
        >
          Hủy bỏ
        </ButtonCustom>
        <ButtonCustom type="submit" disabled={isCreating}>
          Tạo tài khoản
        </ButtonCustom>
      </FormRow>
    </Form>
  );
}

export default CampusAccountForm;
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import ButtonCustom from "../../ui/custom/Button/ButtonCustom";
import { useRegisterLecturer } from "../../hooks/lecturer/useRegisterLecturer";
import StorageService from "../../services/storageService";

function LecturerAccountForm({ campusId: propCampusId, onCloseModal }) {
  const { registerLecturer, isCreating, error: apiError } = useRegisterLecturer();

  // Log the raw propCampusId to understand its structure

  // Ensure campusId is a string
  let campusId;
  if (propCampusId && typeof propCampusId === "string") {
    campusId = propCampusId;
  } else if (propCampusId && typeof propCampusId === "object" && propCampusId.id) {
    campusId = propCampusId.id; // If propCampusId is an object with an id property
  } else {
    campusId = StorageService.getCampusId(); // Fallback to localStorage
  }


  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      userName: "",
      password: "",
      email: "",
      phone: "",
    },
  });

  // Handle API errors for form validation
  useEffect(() => {
    if (apiError) {
      if (apiError === "Tên tài khoản đã tồn tại!") {
        setError("userName", { type: "manual", message: apiError });
      }
    }
  }, [apiError, setError]);

  const handlePhoneInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  async function onSubmit(data) {
    if (!campusId) {
      toast.error("Không tìm thấy campusId. Vui lòng chọn một campus trước khi tạo giảng viên!");
      return;
    }

    await registerLecturer({ formData: data, campusId }, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  function onError(errors) {}

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyDown={handleKeyDown}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Họ và tên" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          placeholder="Nhập họ và tên giảng viên..."
          disabled={isCreating}
          {...register("fullName", {
            required: "Vui lòng nhập họ và tên",
            minLength: {
              value: 2,
              message: "Họ và tên phải chứa ít nhất 2 ký tự",
            },
            maxLength: {
              value: 100,
              message: "Họ và tên tối đa 100 ký tự",
            },
          })}
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
            required: "Vui lòng nhập email",
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
            required: "Vui lòng nhập số điện thoại",
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
        <ButtonCustom type="submit" disabled={isCreating || !campusId}>
          Tạo tài khoản giảng viên
        </ButtonCustom>
      </FormRow>
    </Form>
  );
}

function CreateAccountLecturer({ campusId, onCloseModal }) {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <LecturerAccountForm campusId={campusId} onCloseModal={onCloseModal} />
    </>
  );
}

export default CreateAccountLecturer;
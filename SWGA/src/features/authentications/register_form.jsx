import { PlusOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import signupbg from "../../assets/images/ảnh ví.png";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { RegisterButton } from "../../ui/custom/Button/Button";
import { CustomFormRow } from "../../ui/custom/Form/InputItem/CustomFormItem";
import { toast } from "react-hot-toast";
import { registerBrandAPI } from "../../store/api/registerAPI";

// Styled components (giữ nguyên)
const StyledDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  padding: 2.4rem 4rem;
  overflow: hidden;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  font-size: 1.4rem;
  background-color: #dcfce7;
  padding-bottom: 20px;
  padding-top: 20px;
`;

const HeaderLogin = styled.div`
  color: var(--color-green-700);
`;

const Header = styled.header`
  color: var(--color-green-600);
  font-size: 1.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
  padding-top: 2rem;
`;

const RegisterFormContainer = styled.div`
  width: 40%;
  gap: 3rem;
`;

const TimeFrameContainer = styled.div`
  display: flex;
  gap: 3rem;
  padding-top: 12px;
`;

const TimeFrameHalf = styled.div`
  flex: 1;
`;

const LeftFormHalf = styled.div`
  flex: 1;
`;

function RegisterBrand() {
  const { Title } = Typography;
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoStorage, setLogoStorage] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoStorage, setCoverPhotoStorage] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;

  const handlePhoneInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleChangeLogo = async ({ file }) => {
    if (file) {
      const base64 = await convertFileToBase64(file);
      setLogo(file);
      setLogoStorage(base64);
    } else {
      setLogo(null);
      setLogoStorage(null);
    }
  };

  const handleChangeCoverPhoto = async ({ file }) => {
    if (file) {
      const base64 = await convertFileToBase64(file);
      setCoverPhoto(file);
      setCoverPhotoStorage(base64);
    } else {
      setCoverPhoto(null);
      setCoverPhotoStorage(null);
    }
  };

  const validateClosingTime = (value) => {
    const openingTime = getValues("openingHours");
    return value > openingTime || "Thời gian đóng cửa phải sau thời gian mở cửa";
  };

  const validatePasswordConfirmation = (value) => {
    const password = getValues("password");
    return value === password || "Mật khẩu không khớp!";
  };

  const onSubmit = async (data) => {
    if (!coverPhotoStorage) {
      toast.error("Vui lòng tải lên ảnh bìa!");
      return;
    }

    setIsLoading(true);
    try {
      // Gọi registerBrandAPI và nhận phản hồi
      const result = await registerBrandAPI(data, coverPhotoStorage, navigate);

      // Kiểm tra nếu đăng ký không thành công
      if (!result.success) {
        // Chỉ kiểm tra lỗi liên quan đến userName
        if (result.message.includes("userName")) {
          toast.error("Tên tài khoản này đã được sử dụng!");
        } else {
          toast.error(result.message || "Đăng ký thất bại!");
        }
      }
      // Nếu thành công, registerBrandAPI đã xử lý toast và navigate, nên không cần làm gì thêm
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (errors) => {
    console.log("Form errors:", errors);
  };

  return (
    <>
      <div className="header-login">
        <Title style={{ color: "#15803d" }}>
          Đăng Kí Tài Khoản Thương Hiệu
        </Title>
      </div>
      <div className="btn-header-signup">
        <ButtonText onClick={moveBack}>← Quay lại đăng nhập</ButtonText>
      </div>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <RegisterFormContainer>
          <LeftFormHalf>
            <StyledDataBox>
              <Header>Thông tin đăng nhập</Header>
              <CustomFormRow label="Tên tài khoản" error={errors?.userName?.message}>
                <Input
                  type="text"
                  id="userName"
                  placeholder="Nhập tên tài khoản..."
                  disabled={isLoading}
                  {...register("userName", {
                    required: "Vui lòng nhập tên tài khoản",
                    maxLength: {
                      value: 50,
                      message: "Tên tài khoản tối đa 50 kí tự",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                      message:
                        "Tên tài khoản phải chứa ít nhất 5 kí tự, bao gồm chữ cái viết thường và ít nhất một chữ số và không có kí tự đặc biệt",
                    },
                  })}
                />
              </CustomFormRow>

              <CustomFormRow label="Mật khẩu" error={errors?.password?.message}>
                <Input
                  type="password"
                  id="password"
                  placeholder="Nhập mật khẩu..."
                  disabled={isLoading}
                  {...register("password", {
                    required: "Vui lòng nhập mật khẩu",
                    minLength: {
                      value: 8,
                      message: "Mật khẩu phải có ít nhất 8 kí tự",
                    },
                    maxLength: {
                      value: 50,
                      message: "Mật khẩu tối đa 50 kí tự",
                    },
                  })}
                />
              </CustomFormRow>

              <CustomFormRow
                label="Xác nhận mật khẩu"
                error={errors?.passwordConfirmed?.message}
              >
                <Input
                  type="password"
                  id="passwordConfirmed"
                  placeholder="Nhập lại mật khẩu..."
                  disabled={isLoading}
                  {...register("passwordConfirmed", {
                    required: "Vui lòng nhập lại mật khẩu",
                    validate: validatePasswordConfirmation,
                  })}
                />
              </CustomFormRow>

              <Header>Thông tin cơ bản</Header>
              <CustomFormRow label="Tên thương hiệu" error={errors?.brandName?.message}>
                <Input
                  type="text"
                  id="brandName"
                  placeholder="Nhập tên thương hiệu..."
                  disabled={isLoading}
                  {...register("brandName", {
                    required: "Vui lòng nhập tên thương hiệu",
                  })}
                />
              </CustomFormRow>

              <CustomFormRow label="Tên viết tắt" error={errors?.acronym?.message}>
                <Input
                  type="text"
                  id="acronym"
                  placeholder="Nhập tên viết tắt..."
                  disabled={isLoading}
                  {...register("acronym", {
                    required: "Vui lòng nhập tên viết tắt",
                  })}
                />
              </CustomFormRow>

              <CustomFormRow label="Số điện thoại" error={errors?.phone?.message}>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Ví dụ: 0909339779"
                  disabled={isLoading}
                  {...register("phone", {
                    required: "Vui lòng nhập số điện thoại",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "Số điện thoại hợp lệ phải từ 10 đến 11 số",
                    },
                  })}
                  onInput={handlePhoneInput}
                />
              </CustomFormRow>

              <CustomFormRow label="Email" error={errors?.email?.message}>
                <Input
                  type="email"
                  id="email"
                  placeholder="Nhập địa chỉ email..."
                  disabled={isLoading}
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^(?!\.)[a-zA-Z0-9]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
                      message: "Định dạng email không hợp lệ",
                    },
                  })}
                />
              </CustomFormRow>

              <CustomFormRow label="Địa chỉ" error={errors?.address?.message}>
                <Input
                  type="text"
                  id="address"
                  placeholder="Số nhà, đường, thôn/xóm/ấp, tổ/khu phố"
                  disabled={isLoading}
                  {...register("address", {
                    required: "Vui lòng nhập địa chỉ",
                    validate: {
                      noWhiteSpace: (value) =>
                        value.trim().length >= 3 || "Địa chỉ không hợp lệ",
                    },
                    maxLength: {
                      value: 200,
                      message: "Địa chỉ tối đa 200 kí tự",
                    },
                  })}
                />
              </CustomFormRow>

              <Header>Thời gian hoạt động</Header>
              <TimeFrameContainer>
                <TimeFrameHalf>
                  <CustomFormRow
                    label="Giờ mở cửa"
                    error={errors?.openingHours?.message}
                  >
                    <Input
                      type="time"
                      id="openingHours"
                      disabled={isLoading}
                      {...register("openingHours", {
                        required: "Vui lòng nhập giờ mở cửa",
                      })}
                    />
                  </CustomFormRow>
                </TimeFrameHalf>
                <TimeFrameHalf>
                  <CustomFormRow
                    label="Giờ đóng cửa"
                    error={errors?.closingHours?.message}
                  >
                    <Input
                      type="time"
                      id="closingHours"
                      disabled={isLoading}
                      {...register("closingHours", {
                        required: "Vui lòng nhập giờ đóng cửa",
                        validate: validateClosingTime,
                      })}
                    />
                  </CustomFormRow>
                </TimeFrameHalf>
              </TimeFrameContainer>

              <Header>Logo</Header>
              <Card className="card-product-media">
                <Upload
                  accept="image/*"
                  id="logo"
                  listType="picture-card"
                  beforeUpload={() => false}
                  onChange={handleChangeLogo}
                  fileList={logo ? [logo] : []}
                  disabled={isLoading}
                >
                  {!logo && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                    </div>
                  )}
                </Upload>
              </Card>

              <Header>Ảnh bìa</Header>
              <Card className="card-product-media">
                <Upload
                  accept="image/*"
                  id="coverPhoto"
                  listType="picture-card"
                  beforeUpload={() => false}
                  onChange={handleChangeCoverPhoto}
                  fileList={coverPhoto ? [coverPhoto] : []}
                  disabled={isLoading}
                >
                  {!coverPhoto && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                    </div>
                  )}
                </Upload>
              </Card>

              <Header>Mô tả thương hiệu</Header>
              <CustomFormRow label="Mô tả" error={errors?.description?.message}>
                <Textarea
                  id="description"
                  placeholder="Nhập mô tả về thương hiệu..."
                  disabled={isLoading}
                  {...register("description", {
                    maxLength: {
                      value: 500,
                      message: "Mô tả tối đa 500 kí tự",
                    },
                  })}
                />
              </CustomFormRow>

              <Header>Liên kết</Header>
              <CustomFormRow label="Link website" error={errors?.link?.message}>
                <Input
                  type="url"
                  id="link"
                  placeholder="Nhập link website (ví dụ: https://example.com)"
                  disabled={isLoading}
                  {...register("link", {
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                      message: "Link không hợp lệ",
                    },
                  })}
                />
              </CustomFormRow>
            </StyledDataBox>
          </LeftFormHalf>
        </RegisterFormContainer>

        <Row className="row-register-button">
          <RegisterButton
            type="submit"
            label="Đăng kí tài khoản"
            isLoading={isLoading}
          />
        </Row>
      </Form>
    </>
  );
}

export default RegisterBrand;
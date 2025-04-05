import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Layout, Row, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faBuilding,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faLink,
  faImage,
  faFileAlt,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { useMoveBack } from "../hooks/useMoveBack";
import ButtonText from "../ui/ButtonText";
import { toast } from "react-hot-toast";
import { registerBrandAPI } from "../store/api/registerAPI";
import { Heading, Text } from "@chakra-ui/react";
import S_WalletLogo from "../assets/images/S_WalletLogo.png";
import backgroundImage from "../assets/images/background.jpg";

const { Content } = Layout;

// Custom styles for the form
const customStyles = `
  /* Full-width form layout */
  .split-form {
    flex: none;
    width: 100%;
    background: #2a3b3c; /* Fallback color */
    position: relative; /* For overlay positioning */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px 20px;
    overflow-y: auto;
    height: 100vh;
  }

  /* Add a semi-transparent overlay to improve text readability */
  .split-form::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .wallet-form-container {
    width: 100%;
    max-width: 400px;
    position: relative;
    z-index: 2; /* Ensure content is above the overlay */
  }

  /* Input field styling */
  .wallet-input {
    border-radius: 8px;
    padding: 12px 40px;
    background: #4a5b5c !important;
    border: 1px solid #2ecc71;
    color: #fff !important;
    transition: all 0.3s ease;
  }

  .wallet-input:focus-within {
    border-color: #27ae60;
    background: #4a5b5c !important;
    box-shadow: 0 0 8px rgba(46, 204, 113, 0.3);
  }

  .wallet-input .ant-input,
  .wallet-input .ant-input-password,
  .wallet-input textarea {
    background: transparent !important;
    color: #fff !important;
  }

  .wallet-input .ant-input::placeholder,
  .wallet-input .ant-input-password::placeholder,
  .wallet-input textarea::placeholder {
    color: #d1d5db !important;
    opacity: 1;
  }

  /* Upload component styling */
  .ant-upload.ant-upload-select-picture-card {
    background: #4a5b5c !important;
    border: 1px solid #2ecc71 !important;
    border-radius: 8px;
  }

  .ant-upload.ant-upload-select-picture-card:hover {
    border-color: #27ae60 !important;
  }

  .ant-upload-list-item {
    background: #4a5b5c !important;
    border: 1px solid #2ecc71 !important;
    border-radius: 8px;
  }

  .ant-upload-list-item-name,
  .ant-upload-list-item-info {
    color: #fff !important;
  }

  /* Validation error messages */
  .ant-form-item-explain-error {
    color: #f0e68c !important;
    font-size: 14px;
    margin-top: 5px;
  }

  /* Card styling for Upload components */
  .card-product-media {
    background: transparent !important;
    border: none !important;
  }

  .btn-header-signup {
    position: absolute;
    top: 20px;
    right: 3S00px;
  }

  .btn-header-signup button {
    color: #2ecc71;
    font-weight: 600;
    background: #4a5b5c;
    border: 1px solid #2ecc71;
    border-radius: 8px;
    padding: 8px 16px;
    transition: all 0.3s ease;
    margin-left: -630px;
  }

  .btn-header-signup button:hover {
   background: #2ecc71;
    color: #fff;
    border-color: #27ae60;
  }

  .header-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .form-label {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }

  .section-header {
    color: #2ecc71;
    font-size: 1.7rem;
    font-weight: 600;
    text-align: center;
    padding: 1.5rem 0;
  }

  .wallet-button {
    background: #2ecc71;
    border: none;
    border-radius: 8px;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .wallet-button:hover {
    background: #27ae60;
    transform: scale(1.05);
  }

  .wallet-icon {
    color: #2ecc71;
    margin-right: 10px;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .split-form {
      flex: none;
      width: 100%;
      padding: 20px;
    }

    .wallet-form-container {
      max-width: 100%;
    }

    .wallet-button {
      height: 45px;
      font-size: 14px;
    }

    .header-row {
      flex-direction: column;
      gap: 10px;
    }
  }

  @media (max-width: 480px) {
    .split-form {
      padding: 15px;
    }

    .wallet-input {
      padding: 10px 35px;
    }
  }
`;

function SignUp() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoStorage, setLogoStorage] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoStorage, setCoverPhotoStorage] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        reject(new Error("Invalid file type"));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleChangeLogo = async ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[fileList.length - 1].originFileObj;
      if (file) {
        const base64 = await convertFileToBase64(file);
        setLogo(file);
        setLogoStorage(base64);
      }
    } else {
      setLogo(null);
      setLogoStorage(null);
    }
  };

  const handleChangeCoverPhoto = async ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[fileList.length - 1].originFileObj;
      if (file) {
        const base64 = await convertFileToBase64(file);
        setCoverPhoto(file);
        setCoverPhotoStorage(base64);
      }
    } else {
      setCoverPhoto(null);
      setCoverPhotoStorage(null);
    }
  };

  const handlePhoneInput = (value) => {
    return value.replace(/\D/g, "");
  };

  const onFinish = async (values) => {
    if (!coverPhotoStorage) {
      toast.error("Vui lòng tải lên ảnh bìa!");
      return;
    }
    if (!logoStorage) {
      toast.error("Vui lòng tải lên logo!");
      return;
    }
  
    setIsLoading(true);
    try {
      const result = await registerBrandAPI(
        {
          userName: values.userName,
          password: values.password,
          passwordConfirmed: values.passwordConfirmed,
          brandName: values.brandName,
          acronym: values.acronym,
          phone: values.phone,
          email: values.email,
          address: values.address,
          openingHours: values.openingHours,
          closingHours: values.closingHours,
          description: values.description,
          link: values.link,
        },
        coverPhotoStorage,
        logoStorage
      );
  
      if (result.success) {
        toast.success(
          "Đăng ký thành công! Vui lòng kiểm tra email để lấy mã xác minh."
        );
        navigate("/sign-in");
      } else {
        if (result.message === "Tên tài khoản đã tồn tại!") {
          form.setFields([
            {
              name: "userName",
              errors: ["Tên tài khoản đã tồn tại!"],
            },
          ]);
        } else {
          toast.error(result.message || "Đăng ký thất bại!");
        }
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}>
      <style>{customStyles}</style>
      <Content className="p-0">
        <div
          className="split-form"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="wallet-form-container">
            <div className="btn-header-signup">
              <ButtonText onClick={moveBack}>← Quay lại đăng nhập</ButtonText>
            </div>
            <Row justify="center" style={{ marginBottom: "20px" }}>
              <Col>
                <div className="logo-container">
                  <img src={S_WalletLogo} alt="S_Wallet Logo" style={{ width: "120px" }} />
                  <Text fontSize="20px" color="#fff" textAlign="center">
                    <FontAwesomeIcon icon={faCoins} style={{ marginRight: "6px", color: "#2ecc71" }} />
                    S_WALLET
                  </Text>
                </div>
              </Col>
            </Row>
            <Row className="header-row">
              <Col>
                <Heading fontSize="28px" color="#2ecc71" textAlign="center" lineHeight="1.2">
                  Đăng Kí Tài Khoản Thương Hiệu
                </Heading>
              </Col>
            </Row>
            <Form
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              style={{ marginTop: "20px" }}
            >
              <div className="section-header">Thông tin đăng nhập</div>
              <Form.Item
                name="userName"
                label={<span className="form-label">Tên tài khoản <span style={{ color: "#ff0000" }}>*</span></span>}
                rules={[
                  { required: true, message: "Vui lòng nhập tên tài khoản" },
                  { max: 50, message: "Tên tài khoản tối đa 50 kí tự" },
                  {
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                    message:
                      "Tên tài khoản phải chứa ít nhất 5 kí tự, bao gồm chữ cái viết thường và ít nhất một chữ số và không có kí tự đặc biệt",
                  },
                ]}
              >
                <Input
                  prefix={<FontAwesomeIcon icon={faUser} className="wallet-icon" />}
                  placeholder="Nhập tên tài khoản..."
                  className="wallet-input"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span className="form-label">Mật khẩu <span style={{ color: "#ff0000" }}>*</span></span>}
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu" },
                  { min: 8, message: "Mật khẩu phải có ít nhất 8 kí tự" },
                  { max: 50, message: "Mật khẩu tối đa 50 kí tự" },
                ]}
              >
                <Input.Password
                  prefix={<FontAwesomeIcon icon={faLock} className="wallet-icon" />}
                  placeholder="Nhập mật khẩu..."
                  className="wallet-input"
                />
              </Form.Item>

              <Form.Item
                name="passwordConfirmed"
                label={<span className="form-label">Xác nhận mật khẩu <span style={{ color: "#ff0000" }}>*</span></span>}
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<FontAwesomeIcon icon={faLock} className="wallet-icon" />}
                  placeholder="Nhập lại mật khẩu..."
                  className="wallet-input"
                />
              </Form.Item>

              <div className="section-header">Thông tin cơ bản</div>
              <Form.Item
                name="brandName"
                label={<span className="form-label">Tên thương hiệu <span style={{ color: "#ff0000" }}>*</span></span>}
                rules={[{ required: true, message: "Vui lòng nhập tên thương hiệu" }]}
              >
                <Input
                  prefix={<FontAwesomeIcon icon={faBuilding} className="wallet-icon" />}
                  placeholder="Nhập tên thương hiệu..."
                  className="wallet-input"
                />
              </Form.Item>

              <Form.Item
                name="acronym"
                label={<span className="form-label">Tên viết tắt <span style={{ color: "#ff0000" }}>*</span></span>}
                rules={[{ required: true, message: "Vui lòng nhập tên viết tắt" }]}
              >
                <Input
                  prefix={<FontAwesomeIcon icon={faBuilding} className="wallet-icon" />}
                  placeholder="Nhập tên viết tắt..."
                  className="wallet-input"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label={<span className="form-label">Số điện thoại <span style={{ color: "#ff0000" }}>*</span></span>}
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Số điện thoại hợp lệ phải từ 10 đến 11 số",
                  },
                ]}
                normalize={handlePhoneInput}
              >
                <Input
                  prefix={<FontAwesomeIcon icon={faPhone} className="wallet-icon" />}
                  placeholder="Ví dụ: 0909339779"
                  className="wallet-input"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={<span className="form-label">Email <span style={{ color: "#ff0000" }}>*</span></span>}
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  {
                    pattern: /^(?!\.)[a-zA-Z0-9]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
                    message: "Định dạng email không hợp lệ",
                  },
                ]}
              >
                <Input
                  prefix={<FontAwesomeIcon icon={faEnvelope} className="wallet-icon" />}
                  placeholder="Nhập địa chỉ email..."
                  className="wallet-input"
                />
              </Form.Item>

              <Form.Item
                name="address"
                label={<span className="form-label">Địa chỉ <span style={{ color: "#ff0000" }}>*</span></span>}
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ" },
                  {
                    validator(_, value) {
                      if (value && value.trim().length >= 3) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Địa chỉ không hợp lệ"));
                    },
                  },
                  { max: 200, message: "Địa chỉ tối đa 200 kí tự" },
                ]}
              >
                <Input
                  prefix={<FontAwesomeIcon icon={faMapMarkerAlt} className="wallet-icon" />}
                  placeholder="Số nhà, đường, thôn/xóm/ấp, tổ/khu phố"
                  className="wallet-input"
                />
              </Form.Item>

              <div className="section-header">Thời gian hoạt động</div>
              <Form.Item
                name="openingHours"
                label={<span className="form-label">Giờ mở cửa <span style={{ color: "#ff0000" }}>*</span></span>}
                rules={[{ required: true, message: "Vui lòng nhập giờ mở cửa" }]}
              >
                <Input
                  type="time"
                  prefix={<FontAwesomeIcon icon={faClock} className="wallet-icon" />}
                  className="wallet-input"
                />
              </Form.Item>

              <Form.Item
                name="closingHours"
                label={<span className="form-label">Giờ đóng cửa <span style={{ color: "#ff0000" }}>*</span></span>}
                dependencies={["openingHours"]}
                rules={[
                  { required: true, message: "Vui lòng nhập giờ đóng cửa" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || !getFieldValue("openingHours")) {
                        return Promise.resolve();
                      }
                      if (value > getFieldValue("openingHours")) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Thời gian đóng cửa phải sau thời gian mở cửa"));
                    },
                  }),
                ]}
              >
                <Input
                  type="time"
                  prefix={<FontAwesomeIcon icon={faClock} className="wallet-icon" />}
                  className="wallet-input"
                />
              </Form.Item>

              <div className="section-header">Logo</div>
              <Card className="card-product-media">
                <Form.Item name="logo" noStyle>
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleChangeLogo}
                    fileList={logo ? [logo] : []}
                    onRemove={() => {
                      setLogo(null);
                      setLogoStorage(null);
                    }}
                    disabled={isLoading}
                    showUploadList={{
                      showPreviewIcon: false,
                      showRemoveIcon: true,
                    }}
                  >
                    {!logo && (
                      <div>
                        <PlusOutlined style={{ color: "#fff" }} />
                        <div style={{ marginTop: 8, color: "#fff" }}>Tải ảnh lên</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Card>

              <div className="section-header">Ảnh bìa</div>
              <Card className="card-product-media">
                <Form.Item name="coverPhoto" noStyle>
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleChangeCoverPhoto}
                    fileList={coverPhoto ? [coverPhoto] : []}
                    onRemove={() => {
                      setCoverPhoto(null);
                      setCoverPhotoStorage(null);
                    }}
                    disabled={isLoading}
                    showUploadList={{
                      showPreviewIcon: false,
                      showRemoveIcon: true,
                    }}
                  >
                    {!coverPhoto && (
                      <div>
                        <PlusOutlined style={{ color: "#fff" }} />
                        <div style={{ marginTop: 8, color: "#fff" }}>Tải ảnh lên</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Card>

              <div className="section-header">Mô tả thương hiệu</div>
              <Form.Item
                name="description"
                label={<span className="form-label">Mô tả</span>}
                rules={[{ max: 500, message: "Mô tả tối đa 500 kí tự" }]}
              >
                <Input.TextArea
                  placeholder="Nhập mô tả về thương hiệu..."
                  className="wallet-input"
                  rows={4}
                  prefix={<FontAwesomeIcon icon={faFileAlt} className="wallet-icon" />}
                />
              </Form.Item>

              <div className="section-header">Liên kết</div>
              <Form.Item
                name="link"
                label={<span className="form-label">Link website</span>}
                rules={[
                  {
                    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                    message: "Link không hợp lệ",
                  },
                ]}
              >
                <Input
                  prefix={<FontAwesomeIcon icon={faLink} className="wallet-icon" />}
                  placeholder="Nhập link website (ví dụ: https://example.com)"
                  className="wallet-input"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  block
                  className="wallet-button"
                >
                  Đăng kí tài khoản
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default SignUp;
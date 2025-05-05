import { Flex, Heading, Text } from "@chakra-ui/react";
import { Button, Col, Form, Input, Layout, Modal, Row } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import S_WalletLogo from "../assets/images/swallet_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faWallet, faCoins } from "@fortawesome/free-solid-svg-icons";
import { login } from "../store/api/authApi";
import { useVerifyAccount } from "../hooks/account/useVerifyAccount";
import storageService from "../services/storageService";
import VerificationCode from "../features/authentications/verification-code";
import { getAccountByIdAPI } from "../store/api/registerAPI";
import backgroundImage from "../assets/images/background.jpg";

const { Content } = Layout;

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { verifyUserAccount, resendVerificationCode, isLoading: isVerifying, error: verifyError } = useVerifyAccount();
  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const response = await login(values.username.trim(), values.password);
      if (response.success) {
        const { role, isVerify, loginId } = response.data;
  
        if (!isVerify) {
          const accountResponse = await getAccountByIdAPI(loginId);
          if (!accountResponse.success) {
            toast.error(accountResponse.message || "Không thể lấy thông tin tài khoản!");
            return;
          }
          setLoginData({
            userName: values.username,
            accountId: loginId,
            email: accountResponse.data.email,
          });
          setShowVerifyModal(true);
        } else {
          toast.success("Đăng nhập thành công!");
          navigate("/dashboard", { replace: true });
        }
      } else {
        toast.error(response.message || "Tài khoản hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("❌ Lỗi đăng nhập:", error);
      toast.error("Lỗi hệ thống, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (verificationCode) => {
    const code = verificationCode?.trim();
    if (!code || code.length < 6) {
      toast.error("Vui lòng nhập mã xác minh đầy đủ!");
      return;
    }
    try {
      const result = await verifyUserAccount(loginData.accountId, loginData.email, code);
      if (result.success) {
        storageService.setNameLogin(loginData.userName);
        setShowVerifyModal(false);
        window.dispatchEvent(new Event("authChange"));
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(result.message || "Xác minh thất bại!");
      }
    } catch (error) {
      console.error("Lỗi xác minh:", error);
      toast.error("Có lỗi xảy ra khi xác minh!");
    }
  };

  const handleSendAgain = async () => {
    if (!loginData?.email) {
      toast.error("Thiếu thông tin email để gửi lại mã!");
      return;
    }
    try {
      const result = await resendVerificationCode(loginData.email);
      if (!result.success) {
        toast.error(result.message || "Không thể gửi lại mã. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi lại mã:", error);
      toast.error("Không thể gửi lại mã. Vui lòng thử lại!");
    }
  };

  const handleCancel = () => {
    setShowVerifyModal(false);
    form.resetFields();
  };

  return (
    <>
      <style>
        {`
          /* Layout and Background */
          .split-background {
            flex: 1;
            background-image: url(${backgroundImage});
            background-size: cover;
            background-position: center;
            position: relative;
          }

          .split-background::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(46, 138, 204, 0.3);
          }

          .split-form {
            flex: 1;
            background: rgba(46, 138, 204, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px;
          }

          /* Form Container */
          .wallet-form-container {
            width: 100%;
            max-width: 400px;
          }

          /* Input Fields */
          .wallet-input {
            border-radius: 8px;
            padding: 12px 40px;
            background: #1c5d78 !important; /* Darker than the form background */
            border: 1px solid #4A86A8;
            color: #fff;
            transition: all 0.3s ease;
          }

          .wallet-input:focus-within {
            border-color: #4A86A8;
            background: #1c5d78 !important;
            box-shadow: 0 0 8px rgba(46, 138, 204, 0.5);
          }

          .wallet-input .ant-input::placeholder {
            color: #A8C8E0;
            opacity: 1;
          }

          .wallet-icon {
            color: #FFFFFF;
            margin-right: 10px;
          }

          /* Button */
          .wallet-button {
            background: #1c5d78;
            border: none;
            border-radius: 8px;
            height: 50px;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .wallet-button:hover {
            background: #1c5d78;
            transform: scale(1.05);
          }

          /* Links */
          .wallet-link {
            color: #1c5d78;
            font-weight: 600;
            transition: color 0.3s ease;
          }

          .wallet-link:hover {
            color: #1c5d78;
          }

          /* Header and Logo */
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

          /* Labels and Errors */
          .form-label {
            color: #1c5d78;
            font-size: 16px;
            font-weight: 500;
          }

          .ant-form-item-explain-error {
            color: #f0e68c;
            font-size: 14px;
            margin-top: 5px;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .split-background {
              display: none;
            }

            .split-form {
              flex: 1;
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
        `}
      </style>
      <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}>
        <div className="split-background" />
        <div className="split-form">
          <div className="wallet-form-container">
            <Row justify="center" style={{ marginBottom: "20px" }}>
              <Col>
                <div className="logo-container">
                  <img src={S_WalletLogo} alt="S_Wallet Logo" style={{ width: "120px" }} />
                  <Text fontSize="20px" color="#1c5d78" textAlign="center">
                    <FontAwesomeIcon icon={faCoins} style={{ marginRight: "6px", color: "#1c5d78" }} />
                    SWALLET
                  </Text>
                </div>
              </Col>
            </Row>
            <Row className="header-row">
              <Col>
                <Heading fontSize="36px" color="#1c5d78">
                  Đăng nhập
                </Heading>
              </Col>
            </Row>
            <Form
              form={form}
              onFinish={handleLogin}
              layout="vertical"
              style={{ marginTop: "20px" }}
            >
              <Form.Item
                name="username"
                label={
                  <span className="form-label">
                    Tài khoản <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                }
                rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
              >
                <Input
                  prefix={<FontAwesomeIcon icon={faUser} className="wallet-icon" />}
                  placeholder="Hãy điền tên tài khoản..."
                  className="wallet-input"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label={
                  <span className="form-label">
                    Mật khẩu <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                }
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  prefix={<FontAwesomeIcon icon={faLock} className="wallet-icon" />}
                  placeholder="Hãy điền mật khẩu..."
                  className="wallet-input"
                />
              </Form.Item>
              <Flex justify="flex-end" style={{ marginBottom: "20px" }}>
                <Text fontSize="14px" color="#1c5d78">
                  Bạn chưa có tài khoản?
                  <NavLink to="/sign-up">
                    <Text as="span" className="wallet-link" marginLeft="5px">
                      Tạo tài khoản mới
                    </Text>
                  </NavLink>
                </Text>
              </Flex>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  block
                  className="wallet-button"
                >
                  <FontAwesomeIcon icon={faWallet} style={{ marginRight: "8px" }} />
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <Modal
          open={showVerifyModal}
          footer={null}
          onCancel={handleCancel}
          centered
          style={{ borderRadius: "12px" }}
        >
          <VerificationCode
            email={loginData?.email}
            isLoading={isVerifying}
            error={verifyError}
            onVerify={handleVerify}
            onSendAgain={handleSendAgain}
            onCancel={handleCancel}
          />
        </Modal>
      </Layout>
    </>
  );
}

export default SignIn;
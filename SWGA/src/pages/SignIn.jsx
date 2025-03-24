import { Flex, Heading, Text } from "@chakra-ui/react";
import { Button, Card, Col, Form, Input, Layout, Modal } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import signinbg from "../assets/images/ảnh ví.png";
import { login } from "../store/api/authApi";
import { useVerifyAccount } from "../hooks/account/useVerifyAccount";
import storageService from "../services/storageService";
import VerificationCode from "../features/authentications/verification-code";
import Row from "../ui/Row";
import { getAccountByIdAPI } from "../store/api/registerAPI";

const { Footer, Content } = Layout;

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
      console.log("🚀 Bắt đầu đăng nhập:", values);

      const response = await login(values.username.trim(), values.password);

      console.log("✅ Kết quả đăng nhập:", response);

      if (response.success) {
        const { role, token, brandId, isVerify, loginId } = response.data;

        // Lưu dữ liệu vào storageService
        localStorage.setItem("roleLogin", role);
        storageService.setAccessToken(token);
        storageService.setNameLogin(values.username);
        if (brandId) storageService.setBrandId(brandId);

        if (!isVerify) {
          const accountResponse = await getAccountByIdAPI(loginId);
          if (!accountResponse.success) {
            toast.error("Không thể lấy thông tin tài khoản!");
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
      setIsLoading(false); // Chỉ reset isLoading trong finally
    }
  };

  const handleVerify = async (verificationCode) => {
    const code = verificationCode?.trim();
    if (!code || code.length < 6) {
      toast.error("Vui lòng nhập mã xác minh đầy đủ!");
      return;
    }

    try {
      const result = await verifyUserAccount(
        loginData.accountId,
        loginData.email,
        code
      );

      if (result.success) {
        storageService.setNameLogin(loginData.userName); // Lưu nameLogin sau khi xác minh
        setShowVerifyModal(false);
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
    <Layout className="layout-default layout-signin">
      <Card className="signin-card-background">
        <Content className="signin-content">
          <Row className="signin-row">
            <Col className="signin-form-login">
              <div className="sign-img">
                <img src={signinbg} alt="Sign In Background" />
              </div>
              <div>
                <Heading className="header-login" fontSize="36px" marginTop="20px">
                  Đăng nhập
                </Heading>
              </div>
              <Form
                form={form}
                onFinish={handleLogin}
                onFinishFailed={(errorInfo) => console.log("Đăng nhập thất bại:", errorInfo)}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  name="username"
                  label="Tài khoản"
                  rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
                >
                  <Input placeholder="Hãy điền tên tài khoản..." />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                >
                  <Input.Password placeholder="Hãy điền mật khẩu..." />
                </Form.Item>

                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="end"
                  maxW="100%"
                >
                  <Text style={{ fontWeight: 600 }} fontSize="13px">
                    Bạn chưa có tài khoản?
                    <NavLink to="/sign-up">
                      <Text color="#506690" as="span" ms="5px" fontWeight="600">
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
                    style={{
                      backgroundColor: "#21b658",
                      height: "40px",
                      marginTop: "10px",
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Card>

      <Modal
        open={showVerifyModal}
        footer={null}
        onCancel={handleCancel}
        centered
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

      <Footer>
        <Text className="copyright">S_WALLET</Text>
      </Footer>
    </Layout>
  );
}

export default SignIn;
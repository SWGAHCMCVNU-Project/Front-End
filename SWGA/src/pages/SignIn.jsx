import { Flex, Heading, Text } from "@chakra-ui/react";
import { Button, Card, Col, Form, Input, Layout, Modal } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import signinbg from "../assets/images/ảnh ví.png";
import { login } from "../store/api/authApi";
import { useVerifyAccount } from "../hooks/account/useVerifyAccount";
import storageService from "../services/storageService";
import VerificationCode from "../features/authentications/verification-code"; // Điều chỉnh path theo thư mục của bạn
import Row from "../ui/Row";

const { Footer, Content } = Layout;

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { verifyUserAccount, isLoading: isVerifying, error: verifyError } = useVerifyAccount();

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const response = await login(values.username.trim(), values.password);

      // console.log("responsefe", response);

      if (response.success) {
        const { role, token, brandId, isVerify, loginId } = response.data;
        
        localStorage.setItem('roleLogin', role);
        storageService.setAccessToken(token);
        if (brandId) storageService.setBrandId(brandId);

        if (!isVerify) {
          setLoginData({ userName: values.username, accountId: loginId });
          setShowVerifyModal(true);
        } else {
          toast.success("Đăng nhập thành công!");
          navigate("/dashboard", { replace: true });
        }
      } else {
        toast.error(response.message || "Tài khoản hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast.error("Lỗi hệ thống, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (verificationCode) => {
    if (!verificationCode || verificationCode.length < 6) {
      toast.error("Vui lòng nhập mã xác minh đầy đủ!");
      return;
    }

    const result = await verifyUserAccount(
      loginData.accountId,
      loginData.userName, // Giả sử username = email
      verificationCode
    );

    if (result.success) {
      storageService.setItem('isVerify', true);
      toast.success("Xác minh thành công!");
      setShowVerifyModal(false);
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(result.message || "Mã xác minh không đúng!");
    }
  };

  const handleSendAgain = async () => {
    // Gọi verifyUserAccount với code = null để gửi lại mã
    const result = await verifyUserAccount(
      loginData.accountId,
      loginData.userName,
      null // Backend xử lý gửi lại mã
    );

    if (result.success) {
      toast.success("Đã gửi lại mã xác minh!");
    } else {
      toast.error(result.message || "Không thể gửi lại mã!");
    }
  };

  const handleCancel = () => {
    setShowVerifyModal(false);
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
          email={loginData?.userName}
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
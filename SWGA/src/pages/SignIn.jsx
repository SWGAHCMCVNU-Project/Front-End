/* eslint-disable no-unused-vars */
import { Flex, Heading, Text } from "@chakra-ui/react";
import { Button, Card, Col, Form, Input, Layout, Row } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import signinbg from "../assets/images/ảnh ví.png";
import { login } from "../store/api/authApi";
import storageService from "../services/storageService"; // Import StorageService
import { notification } from "antd"; // Import notification từ antd
const { Footer, Content } = Layout;

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const response = await login(values.username.trim(), values.password);

      console.log("responsefe", response);

      if (response.success) { // Kiểm tra success thay vì status
        localStorage.setItem('roleLogin', response.data.role);
        storageService.setAccessToken(response.data.token);
    storageService.setBrandId(response.data.brandId); // Lưu brandId
        // toast.success("Đăng nhập thành công!");
        navigate("/dashboard", { replace: true });
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
                <Heading
                  className="header-login"
                  fontSize="36px"
                  marginTop="20px"
                >
                  Đăng nhập
                </Heading>
              </div>
              <Form
                form={form}
                onFinish={handleLogin}
                onFinishFailed={(errorInfo) =>
                  console.log("Đăng nhập thất bại:", errorInfo)
                }
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  name="username"
                  label="Tài khoản"
                  rules={[
                    { required: true, message: "Vui lòng nhập tài khoản!" },
                  ]}
                >
                  <Input placeholder="Hãy điền tên tài khoản..." />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
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
      <Footer>
        <Text className="copyright">S_WALLET</Text>
      </Footer>
    </Layout>
  );
}

export default SignIn;
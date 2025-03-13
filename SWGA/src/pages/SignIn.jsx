/* eslint-disable no-unused-vars */
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Button, Card, Col, Form, Layout, Row } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import signinbg from '../assets/images/ảnh ví.png';
import { HSeparator } from '../components/layout/separator/Separator';
import { CustomFormItemLogin } from '../ui/custom/Form/InputItem/CustomFormItem';
import authService from '../services/authService';
import storageService from '../services/storageService';

const { Footer, Content } = Layout;

function SignIn({ onLogin }) { // Nhận prop onLogin từ App
  const [data, setData] = useState({
    userName: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!data.userName.trim() || !data.password) {
      toast.error('Vui lòng nhập tài khoản và mật khẩu!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({
        userName: data.userName.trim(),
        password: data.password,
      });

      if (response.success) {
        const { role } = response.data;

        // Gọi onLogin để cập nhật role trong App
        if (onLogin) {
          onLogin(role);
        }

        // toast.success('Đăng nhập thành công!');
        navigate('/dashboard');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      toast.error('Lỗi đăng nhập! Vui lòng thử lại.');
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
                <Heading className="header-login" fontSize="36px">
                  Đăng nhập
                </Heading>
              </div>
              <Form
                onFinish={handleLogin}
                layout="vertical"
                className="row-col"
              >
                <CustomFormItemLogin
                  name="userName"
                  label="Tài khoản"
                  type="text"
                  placeholder="Hãy điền tên tài khoản..."
                  onChange={(e) =>
                    setData({
                      ...data,
                      userName: e.target.value.replace(/\s/g, ''),
                    })
                  }
                  disabled={isLoading}
                />
                <CustomFormItemLogin
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  placeholder="Hãy điền mật khẩu..."
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  disabled={isLoading}
                  pass={true}
                />

                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="end"
                  maxW="100%"
                >
                  <Text style={{ fontWeight: 600 }} fontSize="13px">
                    Bạn chưa có tài khoản?
                    <NavLink to="/sign-up">
                      <Text
                        color="#506690"
                        as="span"
                        ms="5px"
                        fontWeight="600"
                      >
                        Tạo tài khoản mới
                      </Text>
                    </NavLink>
                  </Text>
                </Flex>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  block
                  style={{
                    backgroundColor: '#1890ff',
                    height: '40px',
                    marginTop: '10px',
                  }}
                >
                  Đăng nhập
                </Button>
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
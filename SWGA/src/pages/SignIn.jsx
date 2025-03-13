/* eslint-disable no-unused-vars */
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Button, Card, Col, Form, Layout, Row } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import signinbg from '../assets/images/ảnh ví.png';
import { HSeparator } from '../components/layout/separator/Separator';
import { CustomFormItemLogin } from '../ui/custom/Form/InputItem/CustomFormItem';
import { loginAPI } from '../store/api/authApi';
import storageService from '../services/storageService';

const { Footer, Content } = Layout;

function SignIn({ onLogin }) {
  const [data, setData] = useState({
    userName: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // e.preventDefault(); // Ngăn reload trang khi submit

    if (!data.userName.trim() || !data.password) {
      toast.error('Vui lòng nhập tài khoản và mật khẩu!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginAPI({
        userName: data.userName.trim(),
        password: data.password,
      });
      console.log('Response từ loginAPI:', response); // Log để kiểm tra

      if (response.success) {
        const { role } = response.data;

        if (onLogin) {
          onLogin(role);
        }

        toast.success('Đăng nhập thành công và chào mừng bạn đã quay trở lại!');
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'Tài khoản hoặc mật khẩu không đúng, xin vui lòng nhập lại!');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      toast.error('Tài khoản hoặc mật khẩu không đúng, xin vui lòng nhập lại!');
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
                  value={data.userName}
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
                  value={data.password}
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

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    disabled={isLoading}
                    block
                    style={{
                      backgroundColor: '#21b658',
                      height: '40px',
                      marginTop: '10px',
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
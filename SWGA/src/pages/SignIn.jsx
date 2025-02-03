import { Typography } from "antd";
import { Button, Card, Col, Form, Layout, Row, Spin } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import signinbg from "../assets/images/logoUB.png";
// import { HSeparator } from "../components/layout/separator/Separator";
import ButtonText from "../ui/ButtonText";
import { LoginButton } from "../ui/custom/Button/Button";
import { CustomFormItemLogin } from "../ui/custom/Form/InputItem/CustomFormItem";

const { Title, Text } = Typography;
const { Footer, Content } = Layout;

function SignIn() {
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await form.validateFields();
      setIsLoading(true);
      setTimeout(() => {
        toast.success("Đăng nhập thành công");
        navigate('/dashboard');
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoadingGoogle(true);
    setTimeout(() => {
      setIsLoadingGoogle(false);
      toast.success("Đăng nhập Google thành công");
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <Layout className="layout-default layout-signin">
      <Card className="signin-card-background">
        <Content className="signin-content">
          <Row className="signin-row">
            <Col className="signin-form-login">
              <div className="sign-img">
                <img src={signinbg} alt="" />
              </div>
              <div>
                <Title level={2} className="header-login">
                  Đăng nhập
                </Title>
              </div>
              <div>
                <Form
                  form={form}
                  onSubmit={handleLogin}
                  layout="vertical"
                  className="row-col"
                >
                  <CustomFormItemLogin
                    name="userName"
                    label="Tài khoản"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên tài khoản !"
                      }
                    ]}
                    type="text"
                    placeholder="Hãy điền tên tài khoản..."
                    onChange={e => setData({ ...data, userName: e.target.value.replace(/\s/g, '') })}
                    disabled={isLoading || isLoadingGoogle}
                  />
                  <CustomFormItemLogin
                    name="password"
                    label="Mật khẩu"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu !"
                      }
                    ]}
                    type="password"
                    placeholder="Hãy điền mật khẩu..."
                    onChange={e => setData({ ...data, password: e.target.value })}
                    disabled={isLoading || isLoadingGoogle}
                    pass={true}
                  />

                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    width: '100%'
                  }}>
                    <Text strong style={{ fontSize: '13px' }}>
                      Bạn chưa có tài khoản?{' '}
                      <NavLink to="/sign-up">
                        <Text strong style={{ color: '#506690' }}>
                          Tạo tài khoản mới
                        </Text>
                      </NavLink>
                    </Text>
                  </div>

                  <LoginButton
                    isLoading={isLoading}
                    onClick={handleLogin}
                    label="Đăng nhập"
                    disabled={isLoading || isLoadingGoogle}
                  />
                </Form>
              </div>

              <div className="divider">
                <Text style={{ margin: '0 14px', marginTop: '10px' }}>
                  Hoặc
                </Text>
              </div>

              <Button
                block
                icon={<FcGoogle style={{ fontSize: '20px' }} />}
                onClick={handleGoogleSignIn}
                disabled={isLoadingGoogle || isLoading}
                style={{ 
                  backgroundColor: "#F0F8FF",
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {isLoadingGoogle ? <Spin /> : 'Đăng Nhập với Google'}
              </Button>
            </Col>
          </Row>
        </Content>
      </Card>
      <Footer>
        <Text className="copyright">
          Capstone Website Unibean
        </Text>
      </Footer>
    </Layout>
  );
}

export default SignIn;

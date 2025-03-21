import { Flex, Text } from "@chakra-ui/react";
import { Button, Card, Col, Typography } from "antd";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ReactInputVerificationCode from "react-input-verification-code";
import logo from "../../assets/images/logoUB.png";
import ButtonText from "../../ui/ButtonText";
import { VerificationCodeButton } from "../../ui/custom/Button/Button";
import "./scss/verification-code.scss";

const { Title } = Typography;

function VerificationCode({
  email,
  isLoading,
  error,
  onVerify,
  onSendAgain,
  onCancel,
}) {
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút = 600 giây
  const [isCodeExpired, setIsCodeExpired] = useState(false);

  const handleChangeCode = (value) => {
    setVerificationCode(value);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsCodeExpired(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <Card className="card-verification-code">
      <div className="header-login-verification">
        <Col className="signup-img">
          <img src={logo} alt="" />
        </Col>
        <Title level={2}>Xác thực tài khoản</Title>
      </div>
      <p className="header-description-verification">
        Chúng tôi đã gửi một mã OTP đến địa chỉ email <strong>{email}</strong>. Để hoàn tất quá trình xác minh, hãy nhập mã OTP bạn đã nhận được.
      </p>
      <div className="custom-styles-verification">
        <ReactInputVerificationCode
          autoFocus
          placeholder=""
          onChange={handleChangeCode}
          length={6}
          disabled={isCodeExpired || isLoading}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isCodeExpired ? (
        <p style={{ color: 'red' }}>Mã OTP đã hết hạn. Vui lòng gửi lại mã!</p>
      ) : (
        <p>Thời gian còn lại: {formatTime(timeLeft)}</p>
      )}
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxW="100%"
      >
        <Text style={{ fontWeight: 600 }} fontSize="16px">
          Bạn chưa nhận được mã?
          <Button
            className="btn-send-verification"
            disabled={isLoading}
            onClick={onSendAgain}
          >
            Gửi lại
          </Button>
        </Text>
      </Flex>
      <div className="btn-verification-code">
        <ButtonText
          onClick={onCancel}
          disabled={isLoading}
        >
          Quay lại
        </ButtonText>
        <VerificationCodeButton
          isDisabled={isLoading || isCodeExpired}
          isLoading={isLoading}
          onClick={() => onVerify(verificationCode)}
          label="Xác nhận"
        />
      </div>
    </Card>
  );
}

export default VerificationCode;
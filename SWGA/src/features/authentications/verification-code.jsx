import { Flex, Text } from "@chakra-ui/react";
import { Button, Card, Col, Typography } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactInputVerificationCode from "react-input-verification-code";
import logo from "../../assets/images/logoUB.png";
import { useMoveBack } from "../../hooks/useMoveBack";
import storageService from "../../services/storageService";
import ButtonText from "../../ui/ButtonText";
import { VerificationCodeButton } from "../../ui/custom/Button/Button";
import "./scss/verification-code.scss";
import { useRegister } from "./useRegister";
import { useSendVerification } from "./useSendVerification";

function VerificationCode() {
    const { Title } = Typography;
    const [verificationCode, setVerificationCode] = useState('');
    const { isRegistering, registerBrand } = useRegister();
    const { isLoading, sendVerification } = useSendVerification();
    const moveBack = useMoveBack();
    const formRegister = storageService.getFormRegister();

    const convertBase64ToFile = (base64, filename) => {
        if (base64) {
            const arr = base64.split(',');
            const match = arr[0].match(/:(.*?);/);
            if (!match) {
                throw new Error('Invalid base64 data');
            }
            const mime = match[1];
            const ext = mime.split('/')[1];
            const bstr = atob(arr[1]);
            const n = bstr.length;
            const u8arr = new Uint8Array(n);
            for (let i = 0; i < n; i++) {
                u8arr[i] = bstr.charCodeAt(i);
            }
            return new File([u8arr], `${filename}.${ext}`, { type: mime });
        }
    };

    const handleChangeCode = (value) => {
        setVerificationCode(value);
    };

    const handleSend = () => {
        sendVerification(formRegister?.email);
    }

    const handleRegister = () => {
        const logoFile = convertBase64ToFile(formRegister?.logo, 'logo');
        const coverPhotoFile = convertBase64ToFile(formRegister?.coverPhoto, 'coverPhoto');
        if (verificationCode.trim() === '') {
            toast.error('Vui lòng nhập mã xác nhận.');
            return;
        }
        else {
            registerBrand({ ...formRegister, logo: logoFile, coverPhoto: coverPhotoFile, verificationCode: verificationCode });
        }
    };

    return (
        <>
            <Card className="card-verification-code">
                <div className="header-login-verification">
                    <Col className="signup-img">
                        <img src={logo} alt="" />
                    </Col>
                    <Title level={2}>Xác thực tài khoản</Title>
                </div>
                <p className="header-description-verification">
                    Chúng tôi đã gửi một mã OTP đến địa chỉ email <strong>{formRegister?.email}</strong>. Để hoàn tất quá trình đăng kí tài khoản, hãy nhập mã OTP bạn đã nhận được.
                </p>
                <div className="custom-styles-verification">
                    <ReactInputVerificationCode
                        autoFocus
                        placeholder=""
                        onChange={handleChangeCode}
                        length={6}
                    />
                </div>
                <Flex
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    maxW='100%'
                >
                    <Text style={{ fontWeight: 600 }} fontSize='16px'>
                        Bạn chưa nhận được mã?
                        <Button
                            className="btn-send-verification"
                            disabled={isLoading || isRegistering}
                            onClick={handleSend}>
                            Gửi lại
                        </Button>
                    </Text>
                </Flex>

                <div className="btn-verification-code">
                    <ButtonText
                        onClick={moveBack}
                        disabled={isRegistering || isLoading}
                    >Quay lại
                    </ButtonText>
                    <VerificationCodeButton
                        isDisabled={isRegistering || isLoading}
                        isLoading={isRegistering}
                        onClick={handleRegister}
                        label="Xác nhận"
                    />
                </div>
            </Card>

        </>

    );
}

export default VerificationCode;
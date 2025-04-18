/* eslint-disable react/prop-types */
import { SaveOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { HiMiniPlus, HiOutlineUserPlus, HiPencil } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Button.scss";
import ButtonCustom from "./ButtonCustom";

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.2rem
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;

const StyledContainerCampaignButton = styled.button`
    display: flex;
    justify-content:center;
    align-items: center;
    background: none;
    border: none;
    gap: 0.2rem;
`;

const StyledCreateUpdateButton = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-0);
    transition: all 0.3s;
  }
`;


export const ButtonNextPrev = styled.button`
    border-radius: 7px;
    box-shadow: var(--shadow-sm);
    border: none;
    font-size: 1.5rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
    color: var(--color-grey-0);
    background-color: #1c5d78;
  
    &:hover {
    background-color: #1c5d78;
    }
`;

export const ButtonAction = styled.button`
  text-align: left;
  background: none;
  border: none;
  padding: 0.4rem 0.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-50);
    border: 1px solid #1c5d78;
    border-radius: 5px;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  & svg:hover {
    color: var(--color-blue-300);
  }
`;

export const NavigateCreateButton = ({ navigateCreateURL, label }) => {
    return (
        <Link className="link-navigate" to={navigateCreateURL}>
            <ButtonCustom>
                <StyledContainerButton>
                    <StyledButton>
                        <HiMiniPlus />
                    </StyledButton>
                    Thêm {label} mới
                </StyledContainerButton>
            </ButtonCustom>
        </Link>
    );
}

export const NavigateEditButton = ({ navigateURL }) => {
    return (
        <Link className="link-navigate" to={navigateURL}>
            <ButtonCustom>
                <StyledContainerButton>
                    <StyledButton>
                        <HiPencil />
                    </StyledButton>
                    Chỉnh sửa
                </StyledContainerButton>
            </ButtonCustom>
        </Link>
    );
}

export const NavigateEditCampaignButton = ({ navigateURL }) => {
    return (
        <Link className="link-navigate" to={navigateURL}>
            <ButtonCustom>
                <StyledContainerCampaignButton>
                    <StyledButton>
                        <HiPencil />
                    </StyledButton>
                    Chỉnh sửa
                </StyledContainerCampaignButton>
            </ButtonCustom>
        </Link>
    );
}

// eslint-disable-next-line react/prop-types
export const CreateUpdateButton = ({ onClick, isLoading, label }) => {
    return (
        <ButtonCustom className="create-update-btn" onClick={onClick} disabled={isLoading}>
            <StyledContainerButton>
                <StyledCreateUpdateButton>
                    <SaveOutlined />
                </StyledCreateUpdateButton>
                {isLoading ? <Spin /> : label}
            </StyledContainerButton>
        </ButtonCustom>
    );
}

// eslint-disable-next-line react/prop-types
export const LoginButton = ({ onClick, isLoading, label, disabled }) => {
    return (
        <ButtonCustom className="btn-login" onClick={onClick} disabled={disabled}>
            {isLoading ? <Spin /> : label}
        </ButtonCustom>
    );
}

export const RegisterButton = ({ onClick, isLoading, label }) => {
    return (
        <ButtonCustom onClick={onClick} disabled={isLoading}>
            <StyledContainerButton>
                <StyledCreateUpdateButton>
                    <HiOutlineUserPlus />
                </StyledCreateUpdateButton>
                {isLoading ? <Spin /> : label}
            </StyledContainerButton>
        </ButtonCustom>
    );
}

export const VerificationCodeButton = ({ onClick, isLoading, label, isDisabled }) => {
    return (
        <ButtonCustom onClick={onClick} disabled={isDisabled}>
            {isLoading ? <Spin /> : label}
        </ButtonCustom>
    );
}
import { Form, Input, Row } from 'antd';
import React from 'react';
import { AiFillExclamationCircle } from "react-icons/ai";
import styled from "styled-components";
import "./CustomFormItem.scss";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  /* grid-template-columns: 24rem 1.8fr 1.2fr; */
  gap: 1rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    /* border-bottom: 1px solid var(--color-grey-100); */
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const StyledFormRowEditor = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const Label = styled.label`
  font-weight: 600;
`;

const Error = styled.div`
  font-size: 1.4rem;
  color: var(--color-red-700);
  display: flex;
  background: none;
  border: none;
  gap: 0.5rem;
`;

const StyledIcon = styled.div`
  background: none;
  border: none;
  transition: all 0.2s;

  & svg {
    width: 2rem;
    height: 2rem;
    transition: all 0.3s;
  }
`;

export const CustomFormRow = ({ label, error, children }) => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && (
        <Error>
          <StyledIcon>
            <AiFillExclamationCircle />
          </StyledIcon>
          {error}
        </Error>
      )}
    </StyledFormRow>
  );
}

export const CustomFormEditorRow = ({ label, error, children }) => {
  return (
    <StyledFormRowEditor>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && (
        <Error>
          <StyledIcon>
            <AiFillExclamationCircle />
          </StyledIcon>
          {error}
        </Error>
      )}
    </StyledFormRowEditor>
  );
}

export const CustomFormItemLogin = ({ disabled, label, rules, name, type, placeholder, onChange, pass }) => {
  return (
    <Form.Item
      name={name}
      label={<div className='label-login-style'>{label}</div>}
      rules={rules}
    >
      {pass ? (
        <Input.Password
          name={name}
          type={type}
          placeholder={placeholder}
          className={`placeholder-input-ecommerce-password`}
          onChange={onChange}
          disabled={disabled}
        />
      ) : (
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`placeholder-input-ecommerce-userName`}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </Form.Item>
  );
}
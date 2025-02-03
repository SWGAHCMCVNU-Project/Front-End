import { PlusOutlined } from '@ant-design/icons';
import { Row, Upload } from 'antd';
import React from 'react';
import { AiFillExclamationCircle } from "react-icons/ai";
import styled from "styled-components";
import "./UploadImage.scss";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
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

const StyledImagePreview = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 20px;
`;

const DropFilePreviewItem = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  margin-bottom: 20px;
  width: 100%;
  height: 15rem;
`;

const InfoFile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonRemove = styled.button`
  font-weight: 500;
  font-size: 16px;
  color: var(--color-green-600);
  background-color: #fff;
  margin-bottom: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  padding: 1rem 2rem;
  border: 1px solid;
  border-radius: 10px;
`;

export const ReviewImageUpload = ({
  label,
  error,
  children,
  file,
  fileRemove,
  disabled,
  image,
  edit
}) => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {image && !file && (
        <StyledImagePreview>
          <DropFilePreviewItem>
            <InfoFile>
              <StyledImg src={edit === true ? image : URL.createObjectURL(image)} alt="Avatar" />
            </InfoFile>
          </DropFilePreviewItem>
        </StyledImagePreview>
      )}
      {file && (
        <StyledImagePreview>
          <DropFilePreviewItem>
            <InfoFile>
              <StyledImg src={URL.createObjectURL(file)} alt={file.name} />
              <ButtonRemove disabled={disabled} onClick={() => fileRemove(file)}>
                Xóa ảnh
              </ButtonRemove>
            </InfoFile>
          </DropFilePreviewItem>
        </StyledImagePreview>
      )}
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


const UploadImage = React.forwardRef(
  ({ disabled, getImage, name, beforeUpload }, ref) => {
    return (
      <Row className="input-media">
        <Upload
          ref={ref}
          accept="image/*"
          onChange={getImage}
          name={name}
          listType="picture-card"
          beforeUpload={beforeUpload}
          multiple
          disabled={disabled}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
          </div>
        </Upload>
      </Row>
    );
  }
);

export default UploadImage;
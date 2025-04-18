import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
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
  flex-direction: column;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  margin-bottom: 10px;
  width: 100%;
  height: 15rem;
`;

const InfoFile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonRemove = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #1c5d78;
  margin-top: 10px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-radius: 5px;
`;

const CustomFileInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FileInputLabel = styled.label`
  font-size: 1.4rem;
  color: var(--color-no-100);
  background-color: #1c5d78;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #1c5d78;
  border-radius: 5px;
`;

const FileNameText = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

export default function ImageCard({
  label,
  error,
  children,
  file,
  fileRemove,
  avatar,
  initialImage,
  imageName,
}) {
  // Xử lý ảnh hiển thị
  const displayImage = file ? URL.createObjectURL(file) : initialImage || avatar;

  // Trích xuất tên file từ URL hoặc sử dụng imageName
  const getFileName = () => {
    if (file) return file.name; // Nếu là file mới
    if (imageName) return imageName; // Nếu có imageName từ dữ liệu
    if (initialImage || avatar) {
      // Trích xuất tên file từ URL
      const urlParts = (initialImage || avatar).split('/');
      const fileNameFromUrl = urlParts[urlParts.length - 1];
      return fileNameFromUrl || imageName || 'Chưa tệp nào được chọn';
    }
    return imageName || 'Chưa tệp nào được chọn';
  };

  const fileName = getFileName();

  // Kiểm tra và lấy ID từ children an toàn
  const getInputId = () => {
    if (children && typeof children === 'object' && children.props && children.props.id) {
      return children.props.id;
    }
    return `image-${Math.random().toString(36).substr(2, 9)}`; // ID mặc định nếu không có
  };

  const inputId = getInputId();

  // Tùy chỉnh children để đảm bảo không hiển thị "Chưa tệp nào được chọn" mặc định
  const modifiedChildren = React.cloneElement(children, {
    style: { display: 'none' }, // Ẩn input gốc để tùy chỉnh giao diện
  });

  return (
    <StyledFormRow>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <CustomFileInput>
        {modifiedChildren}
        <FileInputLabel htmlFor={inputId}>Chọn tệp</FileInputLabel>
        <FileNameText>{fileName}</FileNameText>
      </CustomFileInput>

      {displayImage && (
        <StyledImagePreview>
          <DropFilePreviewItem>
            <InfoFile>
              <StyledImg src={displayImage} alt={fileName} />
              {file && (
                <ButtonRemove onClick={() => fileRemove(file)}>
                  Xóa ảnh
                </ButtonRemove>
              )}
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
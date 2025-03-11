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
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  margin-bottom: 20px;
  width: 100%;
  /* height: "auto"; */
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
  color: var(--color-green-600);
  margin-bottom: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  padding: 1rem 2rem;
  border: 1px solid;
  border-radius: 10px;
`;

export default function ImageCard({
  label,
  error,
  children,
  file,
  fileRemove,
  image,
}) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}

      {image && !file && (
        <StyledImagePreview>
          <DropFilePreviewItem>
            <InfoFile>
              <StyledImg src={image} alt="Avatar" />
            </InfoFile>
          </DropFilePreviewItem>
        </StyledImagePreview>
      )}
      {file && (
        <StyledImagePreview>
          <DropFilePreviewItem>
            <InfoFile>
              <ButtonRemove onClick={() => fileRemove(file)}>
                Xóa ảnh
              </ButtonRemove>
              <StyledImg src={URL.createObjectURL(file)} alt={file.name} />
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

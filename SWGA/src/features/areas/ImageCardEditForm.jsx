import styled from "styled-components";
import { AiFillExclamationCircle } from "react-icons/ai";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 24rem 1.8fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
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
  border-radius: 20px;
`;

const StyledImg = styled.img`
  width: 10.2rem;
  height: 10.2rem;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;

  transition: border-color 0.3s ease;

  &:hover {
    border-color: #1c5d78;
  }
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
  margin-bottom: 20px;
  cursor: pointer;
  position: absolute;
  right: 67%;
  top: 0;
  background-color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--box-shadow);
  opacity: 0;
  transition: opacity 0.3s ease;
  color: #1c5d78;
  z-index: 1;
  border: 1px solid;

  ${DropFilePreviewItem}:hover & {
    opacity: 1;
  }
`;

export default function ImageCardEditForm({
  label,
  error,
  children,
  file,
  fileRemove,
  avatar,
}) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      <div>
        {children}

        {avatar && !file && (
          <StyledImagePreview>
            <DropFilePreviewItem>
              <InfoFile>
                <StyledImg src={avatar} alt="Avatar" />
              </InfoFile>
            </DropFilePreviewItem>
          </StyledImagePreview>
        )}
        {file && (
          <StyledImagePreview>
            <DropFilePreviewItem>
              <InfoFile>
                <ButtonRemove onClick={() => fileRemove(file)}>x</ButtonRemove>
                <StyledImg src={URL.createObjectURL(file)} alt={file.name} />
              </InfoFile>
            </DropFilePreviewItem>
          </StyledImagePreview>
        )}
      </div>
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
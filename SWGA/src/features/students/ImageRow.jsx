import { AiFillExclamationCircle } from "react-icons/ai";
import styled from "styled-components";
import uploadImg from "../../assets/images/cloud-computing.png";

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

const StyledDropFileInput = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border: 2px dashed var(--border-color);
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--input-bg);

  &:hover {
    opacity: 0.6;
  }
`;

const StyledDropFileInputLabel = styled.div`
  text-align: center;
  color: var(--txt-second-color);
  font-weight: 600;
  padding: 10px;
`;

const StyledDropFileInputImg = styled.img`
  width: 100px;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Error = styled.div`
  font-size: 1.4rem;
  color: var(--color-red-600);
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
  background-color: var(--input-bg);
  padding: 15px;
  border-radius: 20px;
`;

const StyledImg = styled.img`
  margin-right: 20px;
  width: "100px";
  height: "auto";
`;

const InfoFile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonRemove = styled.span`
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: var(--box-shadow);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${DropFilePreviewItem}:hover & {
    opacity: 1;
  }
`;

export default function ImageRow({ label, error, children, file, fileRemove }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      <StyledDropFileInput>
        <StyledDropFileInputLabel>
          <StyledDropFileInputImg src={uploadImg} alt="" />
          <p>Kéo & Thả ảnh của bạn vào đây</p>
        </StyledDropFileInputLabel>
        {children}
      </StyledDropFileInput>
      {file && (
        <StyledImagePreview>
          <DropFilePreviewItem>
            <StyledImg
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: "100px", height: "auto" }}
            />
            <InfoFile>
              <p>{file.name}</p>
              <p>{file.size}B</p>
            </InfoFile>
            <ButtonRemove onClick={() => fileRemove(file)}>x</ButtonRemove>
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

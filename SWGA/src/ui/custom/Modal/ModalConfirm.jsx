import { useEffect } from "react";
import styled from "styled-components";
import Heading from "../../Heading";
import ButtonCustom from "../Button/ButtonCustom";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
    white-space: break-spaces;
    text-align: left;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export default function ConfirmDeleteItem({ resourceName, onConfirm, disabled, onCloseModal, visible, setVisible }) {

    const handleDeleteButtonClick = async () => {
        await onConfirm();
    };

    useEffect(() => {
        if (visible === false) {
            onCloseModal();
            setVisible(true);
        }
    }, [visible]);

    return (
        visible === true &&
        <StyledConfirmDelete>
            <Heading as="h3">Xóa {resourceName}</Heading>
            <p>
                Bạn có chắc chắc muốn xóa {resourceName}?
                Hành động này sẽ không thể hoàn tác.
            </p>

            <div>
                <ButtonCustom
                    $variations="secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    Hủy bỏ
                </ButtonCustom>
                <ButtonCustom $variations="danger" disabled={disabled} onClick={handleDeleteButtonClick}>
                    Tôi chắc chắn
                </ButtonCustom>
            </div>
        </StyledConfirmDelete>
    );
}

export const ConfirmEditImage = ({ onConfirm, disabled, onCloseModal }) => {

    const handleConfirmButtonClick = async () => {
        await onConfirm();
        onCloseModal();
    };

    return (
        <StyledConfirmDelete>
            <Heading as="h3">Xóa toàn bộ hình ảnh cũ</Heading>
            <p>
                Nếu chỉnh sửa hình ảnh sẽ <strong>XÓA TOÀN BỘ</strong> hình ảnh cũ. Bạn có chắc chắc muốn cập nhật hình ảnh mới không?
            </p>

            <div>
                <ButtonCustom
                    $variations="secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    Hủy bỏ
                </ButtonCustom>
                <ButtonCustom disabled={disabled} onClick={handleConfirmButtonClick}>
                    Tôi chắc chắn
                </ButtonCustom>
            </div>
        </StyledConfirmDelete>
    );
}

export const UpdateStateCampaign = ({ labelHeading, content, onConfirm, disabled, onCloseModal, visible, danger, reason }) => {

    const handleButtonClick = async () => {
        await onConfirm();
    };

    return (
        <StyledConfirmDelete>
            <Heading as="h3">{labelHeading}</Heading>
            <p>
                {content}
            </p>

            {reason}

            <div>
                <ButtonCustom
                    $variations="secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    Hủy bỏ
                </ButtonCustom>
                <ButtonCustom $variations={danger === true ? "danger" : "primary"} disabled={disabled} onClick={handleButtonClick}>
                    Tôi chắc chắn
                </ButtonCustom>
            </div>
        </StyledConfirmDelete>
    );
}




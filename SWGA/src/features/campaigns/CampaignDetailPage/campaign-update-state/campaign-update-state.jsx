import { Select } from "antd";
import { useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import storageService from "../../../../services/storageService";
import Textarea from "../../../../ui/Textarea";
import ModalUpdateState from "../../../../ui/custom/Modal/ModalUpdateState";
import  updateCampaignAPI  from "../../../../hooks/campaign/useUpdateCampaign";
import "./campaign-update-state.scss";

const StyledContainerButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.5rem;
  font-weight: 500;
`;

const Error = styled.div`
  font-size: 1.4rem;
  color: var(--color-red-700);
  display: flex !important;
  justify-content: flex-start !important;
  background: none;
  border: none;
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

export const CampaignUpdateState = () => {
    const { isLoading, isEditing,
        campaign, editStateCampaign,
        isModalVisible, setIsModalVisible,
        selectedStates, setSelectedStates
    } = updateCampaignAPI();
    const { campaignId } = useParams();
    const [currentState, setCurrentState] = useState(null);
    const [reason, setReason] = useState('');
    const [reasonError, setReasonError] = useState('');
    const [selectedOptionText, setSelectedOptionText] = useState('');
    const role = storageService.getRoleLogin();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    useEffect(() => {
        if (campaign) {
            setCurrentState(campaign.currentStateId);
            setIsModalVisible(false);
            setReason('');
        }
    }, [campaign, currentState]);

    if (isLoading) return;

    const handleOpenModal = (value, option) => {
        setIsModalVisible(true);
        setSelectedStates(value);
        if (option && option.label) {
            setSelectedOptionText(option.label);
        }
        else {
            setSelectedOptionText('');
            setReasonError('');
        }
    }



    const handleUpdateState = async () => {
        if (selectedStates === 2 && reason === ''
            || selectedStates === 7 && reason === '') {
            setReasonError('Vui lòng nhập lí do');
            return;
        }
        else {
            editStateCampaign({ campaignId: campaignId, stateId: selectedStates, reason: reason ? reason : "" });
            setReasonError('');
        }
    };

    const handleModalOk = () => {
        handleUpdateState();
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const renderUpdateState = (value, label, description, button) => {
        return (
            <Select.Option value={value} label={label}>
                <StyledContainerButton onClick={handleOpenModal}>
                    {button}
                    <div className="div-option-update">
                        <label className="label-option-update">{label}</label>
                        <span className="span-option-update">{description}</span>
                    </div>
                </StyledContainerButton>
            </Select.Option>
        );
    }

    const renderSelectOptions = () => {
        switch (currentState) {
            case 1:
                return (
                    <>
                        {role === "Admin" && (
                            <>
                                {renderUpdateState(
                                    3,
                                    "Duyệt",
                                    "Phê duyệt chiến dịch",
                                    "🟢"
                                )}
                                {renderUpdateState(
                                    2,
                                    "Từ chối",
                                    "Từ chối phê duyệt",
                                    "❌"
                                )}
                                {renderUpdateState(
                                    7,
                                    "Hủy",
                                    "Hủy chiến dịch",
                                    "⚠️"
                                )}
                            </>
                        )}

                        {role === "Brand" && (
                            <>
                                {renderUpdateState(
                                    7,
                                    "Hủy",
                                    "Hủy chiến dịch",
                                    "⚠️"
                                )}
                            </>
                        )}
                    </>
                );
            case 2:
                return (
                    <>
                        {renderUpdateState(
                            7,
                            "Hủy",
                            "Hủy chiến dịch",
                            "⚠️"
                        )}
                    </>
                );
            case 3:
                return (
                    <>
                        {renderUpdateState(
                            4,
                            "Ngừng hoạt động",
                            "Tạm ngừng hoạt động",
                            "⏸"
                        )},
                        {formattedDate >= campaign.startOn && (
                            renderUpdateState(
                                6,
                                "Đóng",
                                "Đóng hoàn toàn",
                                "🚫"
                            )
                        )},
                        {formattedDate < campaign.startOn && (
                            renderUpdateState(
                                7,
                                "Hủy",
                                "Hủy chiến dịch",
                                "⚠️"
                            )
                        )}
                    </>
                );
            case 4:
                return (
                    <>
                        {campaign.totalSpending < campaign.totalIncome && (
                            renderUpdateState(
                                3,
                                "Hoạt động",
                                "Chiến dịch đang chạy",
                                "🟢"
                            )
                        )},
                        {formattedDate >= campaign.startOn && (
                            renderUpdateState(
                                6,
                                "Đóng",
                                "Đóng hoàn toàn",
                                "🚫"
                            )
                        )},
                        {formattedDate < campaign.startOn && (
                            renderUpdateState(
                                7,
                                "Hủy",
                                "Hủy chiến dịch",
                                "⚠️"
                            )
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <ModalUpdateState
                visible={isModalVisible}
                onCloseModal={handleCloseModal}
                onConfirm={handleModalOk}
                content={
                    <span>
                        Bạn có chắc chắc muốn{" "}
                        <strong>{`${selectedOptionText.toUpperCase()}`}</strong> chiến dịch? Hành động này sẽ không thể hoàn tác.
                    </span>}
                reason={
                    (selectedStates === 2 || selectedStates === 7) &&
                    <>
                        <Textarea
                            type="text"
                            id="description"
                            disabled={isEditing}
                            placeholder="Nhập lí do..."
                            onChange={e => setReason(e.target.value)}
                        />
                        {
                            reasonError && (
                                <Error>
                                    <StyledIcon>
                                        <AiFillExclamationCircle />
                                    </StyledIcon>
                                    {reasonError}
                                </Error>
                            )
                        }
                    </>
                }
                disabled={isEditing}
            />

            {
                currentState === 5
                    || currentState === 6
                    || currentState === 7
                    ? (null)
                    : (
                        <Select
                            className="select-update-state"
                            onChange={handleOpenModal}
                            value="Cập nhật trạng thái"
                            optionLabelProp="label"
                        >
                            {renderSelectOptions()}
                        </Select>
                    )
            }
        </>
    );
}
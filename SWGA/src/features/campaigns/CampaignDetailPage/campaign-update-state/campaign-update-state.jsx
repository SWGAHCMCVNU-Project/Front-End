/* eslint-disable react/prop-types */
import { Select } from "antd";
import { useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import storageService from "../../../../services/storageService";
import Textarea from "../../../../ui/Textarea";
import ModalUpdateState from "../../../../ui/custom/Modal/ModalUpdateState";
import { useChangeCampaignStatus } from "../../../../hooks/campaign/useChangeCampaignStatus";
import { toast } from "react-hot-toast";
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

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  font-weight: 500;
  background: ${(props) =>
    props.status === 1
      ? "var(--color-green-100)"
      : props.status === 3
      ? "var(--color-red-100)"
      : "transparent"};
  color: ${(props) =>
    props.status === 1
      ? "var(--color-green-700)"
      : props.status === 3
      ? "var(--color-red-700)"
      : "inherit"};
`;

export const CampaignUpdateState = ({ campaign }) => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(0);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStates, setSelectedStates] = useState(null);
  const [selectedOptionText, setSelectedOptionText] = useState("");
  const role = storageService.getRoleLogin();

  const { mutate: changeCampaignStatus, isLoading: isEditing } =
    useChangeCampaignStatus();

  useEffect(() => {
    if (campaign) {
      setCurrentState(campaign.status || 0);
    }
  }, [campaign]);

  const handleOpenModal = (value, option) => {
    if (campaign?.status !== 2) return;
    setIsModalVisible(true);
    setSelectedStates(value);
    setSelectedOptionText(option?.label || "");
    setReason("");
    setReasonError("");
  };

  const handleUpdateState = async () => {
    if (selectedStates === 3 && !reason.trim()) {
      setReasonError("Vui lòng nhập lý do từ chối");
      return;
    }

    try {
      await changeCampaignStatus(
        {
          campaignId,
          status: selectedStates,
          file: selectedStates === 3 ? reason : null,
        },
        {
          onSuccess: (data) => {
            let message =
              selectedStates === 1
                ? "Chiến dịch đã được duyệt thành công!"
                : `Chiến dịch đã bị từ chối${
                    reason ? ` với lý do: ${reason}` : ""
                  }`;

            // Thêm thông báo hoàn tiền nếu có
            if (selectedStates === 3 && data.refundAmount) {
              message += ` (Đã hoàn trả ${data.refundAmount} điểm về ví brand)`;
            }

            toast.success(message);
            setIsModalVisible(false);
            setReason("");
            setReasonError("");
            setCurrentState(selectedStates);

            if (role === "admin") {
              setTimeout(() => navigate("/campaigns"), 1500);
            }
          },
        }
      );
    } catch (error) {
      console.error("Error:", error);
      setReasonError(
        error.response?.data?.Message || "Có lỗi xảy ra khi cập nhật trạng thái"
      );
      toast.error(
        error.response?.data?.Message || "Cập nhật trạng thái thất bại"
      );
    }
  };

  const renderUpdateState = (value, label, description, button) => (
    <Select.Option key={value} value={value} label={label}>
      <StyledContainerButton>
        <span>{button}</span>
        <div className="div-option-update">
          <label className="label-option-update">{label}</label>
          <span className="span-option-update">{description}</span>
        </div>
      </StyledContainerButton>
    </Select.Option>
  );

  // Hiển thị cho brand khi campaign đã được xử lý
  // Hiển thị cho brand khi campaign đã được xử lý
  if (role === "brand" && [1, 3].includes(currentState)) {
    return (
      <StatusMessage status={currentState}>
        {currentState === 1
          ? "Chiến dịch của bạn đã được duyệt"
          : `Chiến dịch của bạn đã bị từ chối${
              campaign.file ? ` với lý do: ${campaign.file}` : ""
            }${
              campaign.refundAmount
                ? ` (Đã hoàn trả ${campaign.refundAmount} điểm về ví)`
                : ""
            }`}
      </StatusMessage>
    );
  }

  // Hiển thị cho admin khi campaign đang chờ duyệt
  if (role === "admin" && currentState === 2) {
    return (
      <>
        <ModalUpdateState
          visible={isModalVisible}
          onCloseModal={() => setIsModalVisible(false)}
          onConfirm={handleUpdateState}
          content={
            <span>
              Bạn có chắc chắn muốn{" "}
              <strong>{selectedOptionText.toUpperCase()}</strong> chiến dịch?
            </span>
          }
          reason={
            selectedStates === 3 && (
              <>
                <Textarea
                  placeholder="Nhập lý do từ chối..."
                  onChange={(e) => setReason(e.target.value)}
                  disabled={isEditing}
                />
                {reasonError && (
                  <Error>
                    <AiFillExclamationCircle />
                    {reasonError}
                  </Error>
                )}
              </>
            )
          }
          disabled={isEditing}
        />

        <Select
          className="select-update-state"
          onChange={(value, option) => handleOpenModal(value, option)}
          value="Xử lý chiến dịch"
          placeholder="Xử lý chiến dịch"
          optionLabelProp="label"
        >
          {[
            renderUpdateState(1, "Duyệt", "Phê duyệt chiến dịch này", "✅"),
            renderUpdateState(3, "Từ chối", "Từ chối chiến dịch này", "❌"),
          ]}
        </Select>
      </>
    );
  }

  return null;
};

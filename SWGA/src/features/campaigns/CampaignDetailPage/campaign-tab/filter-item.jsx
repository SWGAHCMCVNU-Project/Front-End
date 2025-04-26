import { useState, useEffect } from "react";
import { Select } from "antd";
import { FilterButtonRadio, StyledFilterRadio } from "../../../../ui/custom/Filter/Radio/RadioOptions";
import { useCampaignVoucherItem } from "../useCampaignVoucherItem";
import CampaignVoucherItems from "./campaign-voucher-items";
import "./filter-item.scss";

const filters = [
    <svg
        width="1.5em"
        height="1.5em"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="sliders"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="icon-add-date"
        key={1}
    >
        <path
            fill="gray"
            d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"
        ></path>
    </svg>,
];

function ItemFilter() {
    const {
        voucherGroups,
        selectedVoucherId,
        setSelectedVoucherId,
        isBought,
        isUsed,
        setIsBought,
        setIsUsed,
        handlePageChange,
    } = useCampaignVoucherItem();

    // Hàm ánh xạ isBought/isUsed sang selectedOption
    const getSelectedOption = (isBought, isUsed) => {
        if (isBought === null && isUsed === null) return "all";
        if (isBought === true && isUsed === false) return "bought";
        if (isBought === true && isUsed === true) return "used";
        if (isBought === false && isUsed === false) return "";
        return "all"; // Mặc định nếu không khớp
    };

    const [selectedOption, setSelectedOption] = useState(getSelectedOption(isBought, isUsed));

    // Đồng bộ selectedOption khi isBought hoặc isUsed thay đổi
    useEffect(() => {
        setSelectedOption(getSelectedOption(isBought, isUsed));
    }, [isBought, isUsed]);

    const optionStates = [
        { value: "all", label: "Tất cả" },
        { value: "", label: "Khả dụng" },
        { value: "bought", label: "Đã mua" },
        { value: "used", label: "Đã sử dụng" },
    ];

    const handleChangeState = (selectedOptionState) => {
        setSelectedOption(selectedOptionState);
        if (selectedOptionState === "all") {
            setIsBought(null);
            setIsUsed(null);
        } else if (selectedOptionState === "bought") {
            setIsBought(true);
            setIsUsed(false);
        } else if (selectedOptionState === "used") {
            setIsBought(true);
            setIsUsed(true);
        } else {
            setIsBought(false);
            setIsUsed(false);
        }
        // Reset page to 1 when filter changes
        handlePageChange(1);
    };

    const voucherOptions = Object.entries(voucherGroups).map(([voucherId, groupData]) => ({
        value: voucherId,
        label: `${groupData.voucher?.name || groupData.voucher?.voucherName || 'Chưa có tên voucher'} (${groupData.items.length} items)`,
    }));

    return (
        <>
            <div className="filter-tab">
                <div>
                    <StyledFilterRadio>
                        {optionStates.map((option) => (
                            <FilterButtonRadio
                                key={option.value}
                                onClick={() => handleChangeState(option.value)}
                                $active={option.value === selectedOption}
                                disabled={option.value === selectedOption}
                            >
                                {option.label}
                            </FilterButtonRadio>
                        ))}
                    </StyledFilterRadio>
                </div>
                <div className="custom-select-container-product">
                    {filters}
                    <div>
                        <Select
                            style={{ width: 550 }}
                            placeholder="Chọn voucher để xem danh sách..."
                            options={voucherOptions}
                            value={selectedVoucherId}
                            onChange={setSelectedVoucherId}
                            allowClear
                            onClear={() => setSelectedVoucherId(null)}
                            className="voucher-select"
                        />
                    </div>
                </div>
        </div>
            <div>
                <CampaignVoucherItems />
            </div>
        </>
    );
}

export default ItemFilter;
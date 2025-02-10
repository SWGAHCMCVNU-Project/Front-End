import { useState } from "react";
import { useLocation } from "react-router-dom";
import TableOperations from "../../../../ui/TableOperations";
import { FilterButtonRadio, StyledFilterRadio } from "../../../../ui/custom/Filter/Radio/RadioOptions";
import MyFilter, { MySelectFilter } from "../../../../ui/custom/Select/SelectFilter/MyFilter";
import { useFilterBrand } from "../../../request/useFilterBrand";
import { useFilterCampaignType } from "../../useFilterCampaignTypes";
import { useCampaign } from "../useCampaign";
import "./campaign-filter.scss";

function CampaignFilter() {
    const {
        isLoading,
        statesFilterValue,
        setStatesFilterValue
    } = useCampaign();
    const { pathname } = useLocation();
    const role = pathname.includes('brand') ? 'Brand' 
               : pathname.includes('admin') ? 'Admin'
               : pathname.includes('staff') ? 'Staff'
               : null;
    const { brands } = useFilterBrand();
    const { campaignTypes } = useFilterCampaignType();
    const [selectedOptionBrand, setSelectedOptionBrand] = useState([]);
    const [selectedOptionType, setSelectedOptionType] = useState([]);

    if (isLoading) return;

    const optionStates = [
        {
            id: undefined,
            key: "All",
            value: "Tất cả",
            label: "Tất cả"
        },
        {
            id: "1",
            key: "1",
            value: "Chờ duyệt",
            label: "Chờ duyệt"
        },
        {
            id: "2",
            key: "2",
            value: "Từ chối",
            label: "Từ chối"
        },
        {
            id: "3,4",
            key: "onactive",
            value: "Đang diễn ra",
            label: "Đang diễn ra"
        },
        {
            id: "6",
            key: "closed",
            value: "Đã đóng",
            label: "Đã đóng"
        },
        {
            id: "7",
            key: "canceled",
            value: "Đã hủy",
            label: "Đã hủy"
        }
    ];
    const handleChangeState = (e) => {
        const selectedOptionState = e.target.dataset.id;
        let format;

        if (selectedOptionState === "3,4") {
            format = [3, 4];
        }
        else {
            format = selectedOptionState;
        }

        setStatesFilterValue(format);
    };

    const mockBrands = [
        { id: 1, brandName: "Thương hiệu A" },
        { id: 2, brandName: "Thương hiệu B" }
    ];

    const mockCampaignTypes = [
        { id: 1, typeName: "Loại 1" },
        { id: 2, typeName: "Loại 2" }
    ];

    const optionBrands = mockBrands?.map((brand) => ({
        value: brand.id,
        label: brand.brandName,
    }));

    const optionsCampaignTypes = mockCampaignTypes?.map((type) => ({
        value: type.id,
        label: type.typeName,
    }));

    return (
        <TableOperations>
            <StyledFilterRadio>
                {optionStates.map((option) => (
                    <FilterButtonRadio
                        key={option.key}
                        data-id={option.id}
                        onClick={handleChangeState}
                        $active={
                            Array.isArray(statesFilterValue)
                                ? option.id === "3,4"
                                : statesFilterValue === option.id
                        }
                        disabled={option.id === statesFilterValue}
                    >
                        {option.label}
                    </FilterButtonRadio>
                ))}
            </StyledFilterRadio>

            <MyFilter>
                {role === "Admin" && (
                    <MySelectFilter
                        paramName="brandIds"
                        selectOption={setSelectedOptionBrand}
                        selectName="selectBrand"
                        placeholder="Thương hiệu..."
                        optionFilter={optionBrands}
                        valueFilter={selectedOptionBrand}
                    />
                )}
                <MySelectFilter
                    paramName="campaignTypeIds"
                    selectOption={setSelectedOptionType}
                    selectName="selectCampaignType"
                    placeholder="Loại chiến dịch..."
                    optionFilter={optionsCampaignTypes}
                    valueFilter={selectedOptionType}
                />
            </MyFilter>
        </TableOperations>

    );
};

export default CampaignFilter;
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableOperations from "../../../../ui/TableOperations";
import { FilterButtonRadio, StyledFilterRadio } from "../../../../ui/custom/Filter/Radio/RadioOptions";
import MyFilter, { MySelectFilter } from "../../../../ui/custom/Select/SelectFilter/MyFilter";
import { useBrand } from "../../../../hooks/brand/useBrandId";
import { useCampaignTypeById } from "../../../../hooks/campaign-type/useCampaignTypeById";
import { useCampaign } from "../useCampaign";
import "./campaign-filter.scss";

function CampaignFilter() {
  const {
    isLoading,
    statesFilterValue,
    setStatesFilterValue,
    size, // Đổi từ limit thành size
    handleLimitChange // Đổi tên để đồng bộ
  } = useCampaign();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { brands } = useBrand();
  const { campaignTypes } = useCampaignTypeById();
  const [selectedOptionBrand, setSelectedOptionBrand] = useState([]);
  const [selectedOptionType, setSelectedOptionType] = useState([]);

  if (isLoading) return null;

  const optionStates = [
    { id: undefined, key: "All", value: "Tất cả", label: "Tất cả" },
    { id: "1", key: "1", value: "Chờ duyệt", label: "Chờ duyệt" },
    { id: "2", key: "2", value: "Từ chối", label: "Từ chối" },
    { id: "3,4", key: "onactive", value: "Đang diễn ra", label: "Đang diễn ra" },
    { id: "6", key: "closed", value: "Đã đóng", label: "Đã đóng" },
    { id: "7", key: "canceled", value: "Đã hủy", label: "Đã hủy" }
  ];

  const handleChangeState = (e) => {
    const selectedOptionState = e.target.dataset.id;
    setStatesFilterValue(selectedOptionState);
  };

  const optionBrands = brands?.map((brand) => ({
    value: brand.id,
    label: brand.brandName,
  }));

  const optionsCampaignTypes = campaignTypes?.map((type) => ({
    value: type.id,
    label: type.typeName,
  }));

  const handleBrandChange = (selected) => {
    const ids = selected.map(item => item.value).join(",");
    const currentSearch = new URLSearchParams(window.location.search);
    if (ids) {
      currentSearch.set("brandIds", ids);
    } else {
      currentSearch.delete("brandIds");
    }
    navigate(`${pathname}?${currentSearch.toString()}`, { replace: true });
    setSelectedOptionBrand(selected);
  };

  const handleTypeChange = (selected) => {
    const ids = selected.map(item => item.value).join(",");
    const currentSearch = new URLSearchParams(window.location.search);
    if (ids) {
      currentSearch.set("campaignTypeIds", ids);
    } else {
      currentSearch.delete("campaignTypeIds");
    }
    navigate(`${pathname}?${currentSearch.toString()}`, { replace: true });
    setSelectedOptionType(selected);
  };

  return (
    <TableOperations>
      <StyledFilterRadio>
        {optionStates.map((option) => (
          <FilterButtonRadio
            key={option.key}
            data-id={option.id}
            onClick={handleChangeState}
            $active={statesFilterValue === option.id}
            disabled={statesFilterValue === option.id}
          >
            {option.label}
          </FilterButtonRadio>
        ))}
      </StyledFilterRadio>

      <MyFilter>
        <MySelectFilter
          paramName="brandIds"
          selectOption={handleBrandChange}
          selectName="selectBrand"
          placeholder="Thương hiệu..."
          optionFilter={optionBrands}
          valueFilter={selectedOptionBrand}
        />
        <MySelectFilter
          paramName="campaignTypeIds"
          selectOption={handleTypeChange}
          selectName="selectCampaignType"
          placeholder="Loại chiến dịch..."
          optionFilter={optionsCampaignTypes}
          valueFilter={selectedOptionType}
        />
      </MyFilter>
    </TableOperations>
  );
}

export default CampaignFilter;
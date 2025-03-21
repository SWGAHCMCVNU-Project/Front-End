import { useEffect } from "react";
import { StateOptions } from "../../ui/custom/Filter/Radio/RadioOptions";
import { SelectFilter } from "../../ui/custom/Select/SelectFilter/SelectFilter";
import { useFeedbackCategory } from "./useFeedbackCategory";
import { useFeedback } from "./useFeedback";
import styled from "styled-components";
import FeedbackList from "./feedback-list";

const FilterTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CustomSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Ví dụ icon tương tự store
const filters = [
  <svg
    key={1}
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
  >
    <path
      fill="gray"
      d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"
    ></path>
  </svg>
];

function FeedbackFilter() {
  const { categories } = useFeedbackCategory();
  const { categoryFilter, setCategoryFilter, setCategoryFilterValue, status, setStatus } = useFeedback();

  useEffect(() => {
    // console.log('Running useEffect in FeedbackFilter, categories:', categories, 'categoryFilter:', categoryFilter);
    if (categories && categories.length > 0 && !categoryFilter.length) { // Chỉ set nếu categoryFilter rỗng và categories có dữ liệu
      setCategoryFilter(categories);
    }
  }, [categories]); // Loại bỏ setCategoryFilter khỏi dependencies

  const handleChangeStatus = (selectedOptionStatus) => {
    setStatus(selectedOptionStatus);
  };

  return (
    <>
      <FilterTab>
        <div>
          <StateOptions state={status} onChange={handleChangeStatus} />
        </div>
        <CustomSelectContainer>
          {filters}
          <div>
            <SelectFilter
              width={500}
              label="Phân loại"
              placeholder="Chọn loại phản hồi..."
              optionFilter={categoryFilter}
              optionLabelFilter="categoryName"
              onChange={setCategoryFilterValue}
              onClear={setCategoryFilterValue}
            />
          </div>
        </CustomSelectContainer>
      </FilterTab>
      <div>
        <FeedbackList />
      </div>
    </>
  );
}

export default FeedbackFilter;
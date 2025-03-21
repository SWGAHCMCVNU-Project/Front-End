import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { HiPencil, HiMiniPlus } from "react-icons/hi2";
import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import PropTypes from "prop-types";

import { useDebounced } from "../../hooks/useDebounced";
import { useAreas } from "../../hooks/areas/useAreas";
import { handleValidImageURL } from "../../utils/helpers";

import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import SearchBar from "../../ui/SearchBar";
import Filter from "../../ui/Filter";
import RowPerPage from "../../ui/RowPerPage";
import Tag from "../../ui/Tag";
import StackedHeader from "../../ui/StackedHeader";

import logoDefault from "../../assets/images/plot.png";
import CreateAreaForm from "./CreateAreaForm";

// Styled Components
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  text-align: left;
  background: none;
  border: none;
  padding: 0.4rem 0.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-50);
    border: 1px solid var(--color-green-600);
    border-radius: 5px;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  & svg:hover {
    color: var(--color-green-600);
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  line-height: 1.6rem;
  gap: 0.5rem;
`;

const CategoryName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const CategoryIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-green-400);
  gap: 0.3rem;
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

const Img = styled.img`
  display: block;
  align-items: center;
  width: ${(props) => (props.src ? "50px" : "38px")};
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  margin-left: ${(props) => (props.src ? "2rem" : "0.5rem")};
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const Description = styled.div`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
`;

const StyledFilter = styled(Filter)`
  .filter-buttons {
    display: flex;
    gap: 0.8rem;
  }

  button {
    background: ${(props) => props.$active ? "var(--color-green-100)" : "white"};
    border: 1px solid ${(props) => props.$active ? "var(--color-green-600)" : "var(--color-grey-200)"};
    color: var(--color-grey-600);
    font-weight: 500;
    padding: 0.8rem 1.6rem;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: var(--color-green-100);
      border-color: var(--color-green-600);
    }
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.2rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  font-weight: 500;
  font-size: 1.6rem;
  background: var(--color-green-400);
  border: 1px solid var(--color-green-600);
  color: white

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

// Area Row Component
function AreaRow({ area, displayedIndex }) {
  const { areaName, image, description, dateCreated, state } = area;
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  return (
    <Table.Row>
      <div>
        <CategoryIndex>{displayedIndex}</CategoryIndex>
      </div>
      <div>
        <Category>
          <Img src={isValidImage ? image || "" : logoDefault} />
          <CategoryName>{areaName}</CategoryName>
        </Category>
      </div>
      <div>
        <Description>
          {description ? description : "Chưa cập nhật mô tả "}
        </Description>
      </div>
      <div>
        <Stacked>
          {format(addHours(new Date(dateCreated), 7), "dd MMM yyyy", {
            locale: vi,
          })}
        </Stacked>
      </div>
      <div>
        <Tag type={statusToTagName[state]}>
          {state ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      </div>
      <StyledAction>
        <Modal>
          <Modal.Open opens="edit">
            <StyledButton>
              <HiPencil />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateAreaForm areaToEdit={area} />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </Table.Row>
  );
}

AreaRow.propTypes = {
  area: PropTypes.shape({
    id: PropTypes.string.isRequired,
    areaName: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    dateCreated: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired,
  }).isRequired,
  displayedIndex: PropTypes.number.isRequired,
};

// Main Area Table Component
export default function AreaTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounced(searchTerm, 500);

  const limit = Number(searchParams.get("limit")) || 10;
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (debouncedSearch !== "") {
      searchParams.set("search", debouncedSearch);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }, [debouncedSearch, searchParams, setSearchParams]);

  const { areas } = useAreas({
    page: currentPage,
    size: limit,
    search: searchParams.get("search") || "",
    state: searchParams.get("state") === "true",
    isAsc: sortOrder === "asc",
  });

  const onLimitChange = (newLimit) => {
    searchParams.set("limit", newLimit);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const onPageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  if (!areas?.result?.length) return <Empty resourceName="khu vực" />;

  return (
    <>
      <TopBar>
        <FilterContainer>
          <StyledFilter
            filterField="state"
            options={[
              { value: "all", label: "Tất cả" },
              { value: "true", label: "Hoạt động" },
              { value: "false", label: "Không hoạt động" },
            ]}
          />
        </FilterContainer>

        <RightSection>
          <SearchBar 
            placeholder="Tìm kiếm khu vực" 
            onChange={setSearchTerm}
            value={searchTerm}
          />
          <Modal>
            <Modal.Open opens="area-form">
              <AddButton>
                <HiMiniPlus />
                Thêm khu vực mới
              </AddButton>
            </Modal.Open>
            <Modal.Window name="area-form">
              <CreateAreaForm />
            </Modal.Window>
          </Modal>
        </RightSection>
      </TopBar>
      
      <Table columns="0.4fr 2.1fr 1.9fr 1fr 1.3fr 1fr">
        <Table.Header>
          <StyledHeader>STT</StyledHeader>
          <StackedHeader
            label="Khu vực"
            onClick={() => handleStackedClick("AreaName")}
            ascending={sortField === "AreaName" && sortOrder === "asc"}
            active={sortField === "AreaName"}
          />
          <div>Mô tả</div>
          <StackedHeader
            label="Ngày tạo"
            onClick={() => handleStackedClick("DateCreated")}
            ascending={sortField === "DateCreated" && sortOrder === "asc"}
            active={sortField === "DateCreated"}
          />
          <StyledHeader>Trạng thái</StyledHeader>
          <StyledHeader>Hành động</StyledHeader>
        </Table.Header>

        <Table.Body
          data={areas.result}
          render={(area, index) => (
            <AreaRow
              key={area.id}
              area={area}
              displayedIndex={(currentPage - 1) * limit + index + 1}
            />
          )}
        />

        <Table.Footer>
          <Pagination
            count={areas.totalCount}
            currentPage={currentPage}
            pageSize={limit}
            pageCount={areas.pageCount}
            totalCount={areas.totalCount}
            onPageChange={onPageChange}
          />
          <RowPerPage
            options={[
              { value: "5", label: "5" },
              { value: "10", label: "10" },
              { value: "15", label: "15" },
              { value: "20", label: "20" },
            ]}
            value={limit.toString()}
            onLimitChange={onLimitChange}
          />
        </Table.Footer>
      </Table>
    </>
  );
}

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 5px;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-right: 1.2rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.$active ? " var(--color-green-400)" : "var(--color-grey-50)"};
  color: ${(props) => (props.$active ? " var(--color-green-50)" : "inherit")};
  border: 1px solid var(--color-grey-200);

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 0.7rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-green-400);
    color: var(--color-green-50);
    border: none;
  }
`;

const PaginationNumberPageButton = styled.button`
  background-color: ${(props) =>
    props.$active ? " var(--color-green-400)" : "var(--color-grey-50)"};
  color: ${(props) => (props.$active ? " var(--color-green-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-green-400);
    color: var(--color-green-50);
    border: none;
  }
`;

export default function Pagination({ count, pageCount, totalCount, pageSize }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  function numberPage() {
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

    return pages.map((page) => (
      <PaginationNumberPageButton
        key={page}
        onClick={() => goToPage(page)}
        $active={page === currentPage}
        disabled={page === currentPage}
      >
        {page}
      </PaginationNumberPageButton>
    ));
  }

  function goToPage(page) {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
        </PaginationButton>
        {numberPage()}
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

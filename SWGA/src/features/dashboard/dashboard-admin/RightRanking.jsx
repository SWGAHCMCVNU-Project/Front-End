// RightRanking.jsx
import styled, { css } from "styled-components";
import Spinner from "../../../ui/Spinner";
import DataItem from "./DataItem";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 3 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

const StyledHeading = styled.div`
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.4;
`;

const Heading = styled.h1`
  margin-bottom: 0;
  font-size: 1.9rem;
  font-weight: 550;
  ${(props) =>
    props.as === "h2" &&
    css`
      text-transform: uppercase;
    `}

  ${(props) => props.as === "h3" && css``}
    color: #f9ad14;

  text-align: left;
  line-height: 1.4;
`;

function RightRanking() {
  // Fake data cho student ranking, cập nhật để phù hợp với DataItem
  const fakeStudentRanking = [
    { id: 1, rank: 1, name: "Nguyễn Văn A", image: "", value: 98 },
    { id: 2, rank: 2, name: "Trần Thị B", image: "", value: 92 },
    { id: 3, rank: 3, name: "Lê Văn C", image: "", value: 88 },
    { id: 4, rank: 4, name: "Phạm Thị D", image: "", value: 85 },
  ];

  const studentRankingAdmin = fakeStudentRanking;
  const isLoading = false;

  return (
    <StyledToday>
      <StyledHeading>
        <Heading as="h2">Bảng xếp hạng sinh viên</Heading>
        <Heading as="h3">Số lượng: {studentRankingAdmin?.length}</Heading>
      </StyledHeading>

      {!isLoading ? (
        studentRankingAdmin?.length > 0 ? (
          <TodayList>
            {studentRankingAdmin.map((activity) => (
              <DataItem key={activity.id} activity={activity} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>Không có dữ liệu...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default RightRanking;
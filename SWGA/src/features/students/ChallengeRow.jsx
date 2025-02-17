import styled from "styled-components";
import greenBean from "../../assets/images/dauxanh.png";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import logoDefault from "../../assets/images/logo-slack.svg";
import { formatCurrency } from "../../utils/helpers";

const Station = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  gap: 0.5rem;
  margin-left: ${(props) => (props.$isNullImage ? "2rem" : "0")};
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

const StationName = styled.div`
  margin-left: ${(props) => (props.$isNullImage ? "0.5rem" : "0")};
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
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

const StationIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-green-400);
  gap: 0.3rem;
`;

const StyleGreenWallet = styled.div`
  color: var(--color-green-400);
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
`;

const StyledImageBean = styled.img`
  width: 25px;
  height: 25px;
`;

function ChallengeRow({ challenge, displayedIndex }) {
  const {
    id: challengeId,
    challengeImage,
    challengeName,
    isCompleted,
    challengeTypeName,
    amount,
  } = challenge;

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  return (
    <Table.Row>
      <StationIndex>{displayedIndex}</StationIndex>
      <Station $isNullImage={challengeImage === null}>
        <Img src={challengeImage || ""} />
        <StationName $isNullImage={challengeImage === null}>
          {challengeName}
        </StationName>
      </Station>
      <Stacked>{challengeTypeName}</Stacked>

      <Stacked>
        <StyleGreenWallet>
          {formatCurrency(amount)}{" "}
          <StyledImageBean src={greenBean} alt="dau xanh" />
        </StyleGreenWallet>
      </Stacked>

      <Tag type={statusToTagName[isCompleted]}>
        {isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
      </Tag>
    </Table.Row>
  );
}

export default ChallengeRow;

import { addHours, format, isValid } from "date-fns"; // Thêm isValid
import { vi } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import styled from "styled-components";
import logoDefault from "../../assets/images/plot.png";
import DataItem from "../../ui/DataItem";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import { handleValidImageURL } from "../../utils/helpers";

const StyledAreaDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  background-color: #1c5d78;
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Infor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);
  margin-left: 10%;

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
  font-weight: 500;
`;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Flag = styled.img`
  width: ${(props) => (props.src ? "40rem" : "40rem")};
  border-radius: var(--border-radius-tiny);
  display: block;
  border: ${(props) => (props.src ? "1px solid var(--color-grey-100)" : null)};
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

function AreaDataBox({ area }) {
  const { areaName, dateCreated, description, image, state } = area;

  const statusToTagName = {
    true: "cyan",
    false: "error",
  };

  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    handleValidImageURL(image)
      .then((isValid) => setIsValidImage(isValid))
      .catch(() => setIsValidImage(false));
  }, [image]);

  // Xử lý dateCreated an toàn
  const formattedDate = dateCreated
    ? isValid(new Date(dateCreated))
      ? format(addHours(new Date(dateCreated), 7), "dd MMM yyyy, p", { locale: vi })
      : "Ngày không hợp lệ"
    : "Chưa cập nhật";

  return (
    <StyledAreaDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <span>{areaName}</span>
        </div>
      </Header>

      <Section>
        <Guest>
          <Flag
            src={isValidImage ? image || "" : logoDefault}
            alt={`Image of ${areaName}`}
          />
          <Infor>
            <HeadingGroup>
              <Heading as="h1">{areaName}</Heading>
              <Tag type={statusToTagName[state]}>
                {state ? "Hoạt động" : "Không hoạt động"}
              </Tag>
            </HeadingGroup>

            {description ? (
              <DataItem
                icon={<HiOutlineChatBubbleBottomCenterText />}
                label="Mô tả:"
              >
                {description}
              </DataItem>
            ) : (
              <DataItem
                icon={<HiOutlineChatBubbleBottomCenterText />}
                label="Mô tả:"
              >
                Chưa cập nhật
              </DataItem>
            )}
          </Infor>
        </Guest>
      </Section>

      <Footer>
        <p>
          Ngày tạo: {formattedDate}
        </p>
      </Footer>
    </StyledAreaDataBox>
  );
}

export default AreaDataBox;
import { useEffect, useState } from "react";
import styled from "styled-components";
import { HiPencil } from "react-icons/hi2";
import { addHours, format } from "date-fns";
import { vi } from "date-fns/locale";
import PropTypes from "prop-types";

import { useArea } from "../../hooks/areas/useArea";
import { handleValidImageURL } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import CreateAreaForm from "./CreateAreaForm";
import Tag from "../../ui/Tag";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

import logoDefault from "../../assets/images/plot.png";

const StyledAreaDetail = styled.div`
  padding: 2.4rem 4rem;
`;

const Container = styled.div`
  display: flex;
  gap: 3.2rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
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

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2.4rem;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  border-radius: 7px;
  content: url(${(props) => (props.src ? props.src : logoDefault)});
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 500;
  color: var(--color-grey-600);
  min-width: 12rem;
`;

const Value = styled.span`
  color: var(--color-grey-600);
`;

function AreaDataBox({ area }) {
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

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Không có dữ liệu";
      }
      return format(addHours(date, 7), "dd MMM yyyy", { locale: vi });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Không có dữ liệu";
    }
  };

  return (
    <Box>
      <Header>
        <Title>{areaName}</Title>
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
      </Header>

      <Content>
        <Image src={isValidImage ? image || "" : logoDefault} />
        <Info>
          <Row>
            <Label>Ngày tạo:</Label>
            <Value>{formatDate(dateCreated)}</Value>
          </Row>
          <Row>
            <Label>Trạng thái:</Label>
            <Value>
              <Tag type={statusToTagName[state]}>
                {state ? "Hoạt động" : "Không hoạt động"}
              </Tag>
            </Value>
          </Row>
          <Row>
            <Label>Mô tả:</Label>
            <Value>{description || "Chưa cập nhật mô tả"}</Value>
          </Row>
        </Info>
      </Content>
    </Box>
  );
}

AreaDataBox.propTypes = {
  area: PropTypes.shape({
    id: PropTypes.string.isRequired,
    areaName: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    dateCreated: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired,
  }).isRequired,
};

function AreaDetail() {
  const { isLoading, area } = useArea();

  if (isLoading) return <Spinner />;
  if (!area) return <Empty resourceName="khu vực" />;

  return (
    <StyledAreaDetail>
      <Container>
        <AreaDataBox area={area} />
      </Container>
    </StyledAreaDetail>
  );
}

export default AreaDetail;

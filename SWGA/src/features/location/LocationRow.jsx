import { HiPencil } from "react-icons/hi2";
import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import LocationForm from "./LocationForm";
import useUpdateLocation from "../../hooks/location/useUpdateLocation";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const LocationIndex = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: #1c5d78;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LocationName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const LocationValue = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  font-family: 'Roboto Mono', monospace;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const StyledAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledTableRow = styled(Table.Row)`
  & > div {
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem;
    justify-content: center; /* Default center */
  }

  & > div:nth-child(2),
  & > div:nth-child(3) {
    justify-content: flex-start;
    padding-left: 1rem;
  }

  & > div:nth-child(4) {
    justify-content: flex-start !important;
    padding-left: 1rem;
  }

  & > div:first-child,
  & > div:last-child {
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }

  .longitude {
    justify-content: flex-start !important;
  }
`;


function LocationRow({ id, name, latitue, longtitude, displayedIndex }) {
  const { mutate: update, isLoading: isUpdating } = useUpdateLocation();

  return (
    <StyledTableRow>
      <LocationIndex>{displayedIndex}</LocationIndex>
      <LocationName>{name}</LocationName>
      <LocationValue>{latitue}</LocationValue>
      <LocationValue className="longitude">{longtitude}</LocationValue> {/* ✅ Gán class */}
      <StyledAction>
        <Modal>
          <Modal.Open opens={`edit-${id}`}>
            <StyledButton disabled={isUpdating}>
              <HiPencil />
            </StyledButton>
          </Modal.Open>
          <Modal.Window name={`edit-${id}`}>
            <LocationForm
              locationToEdit={{ id, name, latitue, longtitude }}
              onCloseModal={() => {}}
              onSubmit={update}
            />
          </Modal.Window>
        </Modal>
      </StyledAction>
    </StyledTableRow>
  );
}


LocationRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  latitue: PropTypes.number.isRequired,
  longtitude: PropTypes.number.isRequired,
  displayedIndex: PropTypes.number.isRequired,
};

export default LocationRow;

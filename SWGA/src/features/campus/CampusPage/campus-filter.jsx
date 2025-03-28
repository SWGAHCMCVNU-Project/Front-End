// components/CampusFilter.js
import { StateOptions } from "../../../ui/custom/Filter/Radio/RadioOptions";
import { useCampuses } from "./useCampuses"; // Update to useCampuses

function CampusFilter() {
  const { state, setState } = useCampuses();

  const handleChangeState = (selectedOptionState) => {
    setState(selectedOptionState);
  };

  return (
    <div>
      <StateOptions state={state} onChange={handleChangeState} />
    </div>
  );
}

export default CampusFilter;
import { StateOptions } from "../../../ui/custom/Filter/Radio/RadioOptions";
import { useUniversities } from "./useUniversities";

function UniversityFilter() {
    const {
        state,
        setState
    } = useUniversities();

    const handleChangeState = (selectedOptionState) => {
        setState(selectedOptionState);
    };

    return (
        <>
            <div>
                <StateOptions
                    state={state}
                    onChange={handleChangeState} />
            </div>
        </>
    );
};

export default UniversityFilter;
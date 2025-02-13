import { StateOptions } from "../../../ui/custom/Filter/Radio/RadioOptions";
import { useMajors } from "./useMajors";

function MajorFilter() {
    const {
        state,
        setState
    } = useMajors();

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

export default MajorFilter;
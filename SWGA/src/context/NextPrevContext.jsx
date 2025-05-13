import React, { useState } from "react";

export const NextPrevContext = React.createContext();

export const NextPrevProvider = ({ children }) => {
    const [current, setCurrent] = useState(0);
    const [newCampaign, setNewCampaign] = useState({});
    const [completedSteps, setCompletedSteps] = useState([]); // Thêm trạng thái hoàn thành
    return (
        <NextPrevContext.Provider value={{ current, setCurrent, newCampaign, setNewCampaign,completedSteps, setCompletedSteps }}>
            {children}
        </NextPrevContext.Provider>
    );
};
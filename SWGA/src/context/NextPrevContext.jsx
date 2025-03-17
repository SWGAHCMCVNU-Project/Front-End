import React, { useState } from "react";

export const NextPrevContext = React.createContext();

export const NextPrevProvider = ({ children }) => {
    const [current, setCurrent] = useState(0);
    const [newCampaign, setNewCampaign] = useState(null);

    return (
        <NextPrevContext.Provider value={{ current, setCurrent, newCampaign, setNewCampaign }}>
            {children}
        </NextPrevContext.Provider>
    );
};
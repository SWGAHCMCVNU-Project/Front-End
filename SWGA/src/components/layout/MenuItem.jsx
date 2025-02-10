/* eslint-disable react/prop-types */
import { NavLink, useLocation } from "react-router-dom";

export const MenuItem = ({ linkURL, iconPage, pageName, color, labelPageName }) => {
    const { pathname } = useLocation();
    const page = pathname.replace("/", "");
    const isActive = page === pageName;
    
    const menuItemStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        textDecoration: 'none',
        color: isActive ? color : 'var(--color-grey-600)',
        transition: 'all 0.3s'
    };

    const iconStyle = {
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px',
    };

    const labelStyle = {
        fontSize: '14px',
    };
    
    return (
        <NavLink 
            to={linkURL}
            style={{
                ...menuItemStyle,
                "&:hover": {
                    color: `${color} !important`,
                    textDecoration: 'none'
                }
            }}
            className={({ isActive }) => 
                isActive ? "active" : ""
            }
            onMouseEnter={(e) => {
                e.currentTarget.style.color = color;
                e.currentTarget.querySelector('.icon').style.color = color;
                e.currentTarget.querySelector('.label').style.color = color;
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    e.currentTarget.style.color = 'var(--color-grey-600)';
                    e.currentTarget.querySelector('.icon').style.color = 'var(--color-grey-600)';
                    e.currentTarget.querySelector('.label').style.color = 'var(--color-grey-600)';
                }
            }}
        >
            <span 
                className="icon"
                style={iconStyle}
            >
                {iconPage}
            </span>
            <span 
                className="label"
                style={labelStyle}
            >
                {labelPageName}
            </span>
        </NavLink>
    );
}
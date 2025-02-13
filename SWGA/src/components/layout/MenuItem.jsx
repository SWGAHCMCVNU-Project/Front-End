/* eslint-disable react/prop-types */
import { NavLink, useLocation } from "react-router-dom";

export const MenuItem = ({ linkURL, iconPage, pageName, color, labelPageName }) => {
    const { pathname } = useLocation();
    const page = pathname.replace("/", "");
    
    // Sửa lại logic kiểm tra active
    const isActive = pageName === page || 
                    (pageName === 'dashboard' && page === '') || // Thêm trường hợp trang chủ
                    (pageName === 'dashboard' && page.startsWith('dashboard'));

    return (
        <NavLink to={linkURL}>
            <div>
                <div
                    className="icon"
                    style={{
                        background: isActive ? color : "",
                        color: isActive ? "#fff" : color
                    }}
                >
                    {iconPage}
                </div>
            </div>
            <div
                className="label"
                style={{
                    color: isActive ? color : ""
                }}>
                {labelPageName}
            </div>
        </NavLink>
    );
}
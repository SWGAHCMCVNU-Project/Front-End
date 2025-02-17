/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ProfileOutlined } from "@ant-design/icons";
import {
  faBars,
  faBell,
  faBuildingColumns,
  faCalendarDays,
  faClockRotateLeft,
  faGraduationCap,
  faLocationCrosshairs,
  faLocationDot,
  faPersonWalking,
  faStore,
  faTicket,
  faTrademark,
  faUserGraduate,
  faUserTie,
  faBullhorn,
  faBox,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Menu } from "antd";
import React, { useEffect } from "react";
import { HiMiniTicket } from "react-icons/hi2";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo_justB.png";
import { MenuItem } from "./MenuItem";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const roleLogin = user?.role || "";
  const navigate = useNavigate();

  // Nếu không có user hoặc role, redirect về trang login
  useEffect(() => {
    if (!user || !roleLogin) {
      navigate('/sign-in');
    }
  }, [user, roleLogin]);

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key="dashboard-logo"
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="table-logo"
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="billing-logo"
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signin = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="signin-logo"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  // Menu items chung cho tất cả roles
  const commonMenuItems = [
    {
      type: "group",
      menuSideNav: [
        {
          key: "1",
          linkURL: `/${roleLogin === "admin" ? "dashboard-admin" : 
                     roleLogin === "staff" ? "dashboard-staff" : 
                     "dashboard-brand"}`,
          pageName: "dashboard",
          color: color,
          iconPage: dashboard,
          labelPageName: "Thống kê",
        },
      ],
    },
    {
      type: "divider",
    },
  ];

  // Menu items cho admin
  const adminMenuItems = [
    {
      type: "group",
      menuSideNav: [
        {
          key: "2",
          linkURL: "/students",
          pageName: "students",
          color: color,
          iconPage: <FontAwesomeIcon icon={faUserGraduate} />,
          labelPageName: "Sinh viên",
        },
        {
          key: "3",
          linkURL: "/brands",
          pageName: "brands",
          color: color,
          iconPage: <FontAwesomeIcon icon={faTrademark} />,
          labelPageName: "Thương hiệu",
        },
        {
          key: "4",
          linkURL: "/staffs",
          pageName: "staffs",
          color: color,
          iconPage: <FontAwesomeIcon icon={faUserTie} />,
          labelPageName: "Nhân viên",
        },
        {
          key: "5",
          linkURL: "/campaigns",
          pageName: "campaigns",
          color: color,
          iconPage: <FontAwesomeIcon icon={faBullhorn} />,
          labelPageName: "Chiến dịch",
        },
        {
          key: "6",
          linkURL: "/products",
          pageName: "products",
          color: color,
          iconPage: <FontAwesomeIcon icon={faBox} />,
          labelPageName: "Sản phẩm",
        },
      ]
    },
    {
      type: "divider",
    },
    {
      type: "group",
      menuSideNav: [
        {
          key: "7",
          linkURL: "/universities",
          pageName: "universities",
          color: color,
          iconPage: <FontAwesomeIcon icon={faBuildingColumns} />,
          labelPageName: "Đại học",
        },
        {
          key: "8",
          linkURL: "/majors",
          pageName: "majors",
          color: color,
          iconPage: <FontAwesomeIcon icon={faGraduationCap} />,
          labelPageName: "Chuyên ngành",
        },
        {
          key: "9",
          linkURL: "/areas",
          pageName: "areas",
          color: color,
          iconPage: <FontAwesomeIcon icon={faLocationDot} />,
          labelPageName: "Khu vực",
        },
        {
          key: "10",
          linkURL: "/categories",
          pageName: "categories",
          color: color,
          iconPage: <FontAwesomeIcon icon={faListUl} />,
          labelPageName: "Danh mục",
        },
      ]
    },
    {
      type: "divider",
    },
    {
      type: "group",
      menuSideNav: [
        {
          key: "11",
          linkURL: "/transactions",
          pageName: "transactions",
          color: color,
          iconPage: <FontAwesomeIcon icon={faClockRotateLeft} />,
          labelPageName: "Lịch sử giao dịch",
        },
      ]
    }
  ];

  // Menu items cho brand
  const brandMenuItems = [
    {
      type: "group",
      menuSideNav: [
        {
          key: "15",
          linkURL: "/stores",
          pageName: "stores",
          color: color,
          iconPage: <FontAwesomeIcon icon={faStore} />,
          labelPageName: "Cửa hàng",
        },
        {
          key: "16",
          linkURL: "/vouchers",
          pageName: "vouchers",
          color: color,
          iconPage: <FontAwesomeIcon icon={faTicket} />,
          labelPageName: "Phiếu mẫu",
        },
        {
          key: "17",
          linkURL: "/voucher-items",
          pageName: "voucher-items",
          color: color,
          iconPage: <HiMiniTicket />,
          labelPageName: "Phiếu ưu đãi",
        },
        {
          key: "18",
          linkURL: "/transactions",
          pageName: "transactions",
          color: color,
          iconPage: <FontAwesomeIcon icon={faClockRotateLeft} />,
          labelPageName: "Lịch sử giao dịch",
        },
      ],
    },
  ];

  // Menu items cho staff
  const staffMenuItems = [
    {
      type: "group",
      menuSideNav: [
        {
          key: "20",
          linkURL: "/staff-students",
          pageName: "staff-students",
          color: color,
          iconPage: <FontAwesomeIcon icon={faUserGraduate} />,
          labelPageName: "Quản lý sinh viên",
        },
        {
          key: "21",
          linkURL: "/staff-transactions",
          pageName: "staff-transactions",
          color: color,
          iconPage: <FontAwesomeIcon icon={faClockRotateLeft} />,
          labelPageName: "Lịch sử giao dịch",
        },
      ],
    },
  ];

  // Lấy menu items dựa theo role
  const getMenuItemsByRole = () => {
    switch(roleLogin) {
      case "admin":
        return [...commonMenuItems, ...adminMenuItems];
      case "brand":
        return [...commonMenuItems, ...brandMenuItems];
      case "staff":
        return [...commonMenuItems, ...staffMenuItems];
      default:
        return commonMenuItems;
    }
  };

  const currentMenuItems = getMenuItemsByRole();

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>S_WALLET</span>
      </div>
      <Divider />
      <Menu
        theme="light"
        mode="inline"
        items={currentMenuItems.flatMap((item, index) => {
          if (item.type === "group") {
            return item.menuSideNav.map((menuItem) => ({
              key: menuItem.key,
              label: (
                <MenuItem
                  linkURL={menuItem.linkURL}
                  pageName={menuItem.pageName}
                  color={color}
                  iconPage={menuItem.iconPage}
                  labelPageName={menuItem.labelPageName}
                />
              ),
            }));
          } else if (item.type === "divider") {
            return {
              key: `divider-${index}`,
              label: <Divider />,
            };
          }
          return null;
        })}
      />

      <style>
        {`
          /* Brand styles */
          .brand {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
          }
          
          .brand img {
            width: 35%;
            height: 40%;
            border-radius: 10px;
            margin-right: 10px;
          }
          
          .brand span {
            font-size: 20px;
            color: ${color};
          }

          /* Menu styles */
          .menu-item-link {
            text-decoration: none;
          }

          .menu-item-content {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
          }

          .label {
            font-size: 14px;
          }

          /* Hover & Active states */
          .custom-menu .ant-menu-item:hover {
            color: ${color} !important;
          }
          .custom-menu .ant-menu-item-selected {
            background-color: ${color} !important;
            color: white !important;
          }
          .custom-menu .ant-menu-item-active {
            color: ${color} !important;
          }
          .custom-menu .ant-menu-item::after {
            border-right: 3px solid ${color} !important;
          }
        `}
      </style>
    </>
  );
}

export default Sidenav;
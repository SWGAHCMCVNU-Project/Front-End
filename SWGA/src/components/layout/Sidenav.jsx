import { ProfileOutlined, ShoppingCartOutlined } from "@ant-design/icons";
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
} from "@fortawesome/free-solid-svg-icons";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Menu } from "antd";
import React, { useEffect } from "react";
import { HiMiniTicket } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/swallet_logo.png";
import storageService from "../../services/storageService";
import { MenuItem } from "./MenuItem";

function Sidenav({ color }) {
  const roleLogin = storageService.getRoleLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!storageService.getAccessToken() || !roleLogin) {
      // navigate("/sign-in");
    }
  }, [roleLogin, navigate]);

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
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
        d="M13 10C13 9.44771 13.4477 9 14 9H16C16.5523 9 17 9.44771 17 10V16C17 16.5523 16.5523 17 16 17H14C13.4477 17 13 16.5523 13 16V10Z"
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
      key="tables-logo"
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

  const menuItems = [
    {
      type: "group",
      menuSideNav: [
        {
          key: "1",
          linkURL: "/dashboard",
          pageName: "dashboard",
          color: color,
          iconPage: dashboard,
          labelPageName: "Thống kê",
          allowedRoles: ["admin", "brand", "staff", "campus"],
        },
        {
          key: "2",
          linkURL: "/campaigns",
          pageName: "campaigns",
          color: color,
          iconPage: <FontAwesomeIcon icon={faCalendarDays} />,
          labelPageName: "Chiến dịch",
          allowedRoles: ["admin", "brand"],
        },
        {
          key: "16",
          linkURL: "/voucher-type",
          pageName: "voucher-type",
          color: color,
          iconPage: <FontAwesomeIcon icon={faTicket} />,
          labelPageName: "Thể loại",
          allowedRoles: ["admin"],
        },
        {
          key: "18",
          linkURL: "/campaign-type",
          pageName: "campaign-type",
          color: color,
          iconPage: <FontAwesomeIcon icon={faCalendarDays} />,
          labelPageName: "Loại chiến dịch",
          allowedRoles: ["admin"],
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "group",
      menuSideNav: [
        {
          key: "6",
          linkURL: "/students",
          pageName: "students",
          color: color,
          iconPage: <FontAwesomeIcon icon={faUserGraduate} />,
          labelPageName: "Sinh viên",
          allowedRoles: ["admin"],
        },
        {
          key: "7",
          linkURL: "/brands",
          pageName: "brands",
          color: color,
          iconPage: <FontAwesomeIcon icon={faTrademark} />,
          labelPageName: "Thương hiệu",
          allowedRoles: ["admin"],
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "group",
      menuSideNav: [
        {
          key: "12",
          linkURL: "/campus",
          pageName: "campus",
          color: color,
          iconPage: <FontAwesomeIcon icon={faBuildingColumns} />,
          labelPageName: "Đại học",
          allowedRoles: ["admin"],
        },
        {
          key: "14",
          linkURL: "/areas",
          pageName: "areas",
          color: color,
          iconPage: <FontAwesomeIcon icon={faLocationCrosshairs} />,
          labelPageName: "Khu vực",
          allowedRoles: ["admin"],
        },
        {
          key: "15",
          linkURL: "/point-packages",
          pageName: "point-packages",
          color: color,
          iconPage: <FontAwesomeIcon icon={faTicket} />,
          labelPageName: "Gói điểm",
          allowedRoles: ["admin"],
        },
        {
          key: "25",
          linkURL: "/locations",
          pageName: "locations",
          color: color,
          iconPage: <FontAwesomeIcon icon={faLocationDot} />,
          labelPageName: "Địa điểm",
          allowedRoles: ["admin"],
        },
        {
          key: "22",
          linkURL: "/lucky-prizes",
          pageName: "lucky-prizes",
          color: color,
          iconPage: <FontAwesomeIcon icon={faDice} />,
          labelPageName: "Điểm may mắn",
          allowedRoles: ["admin"],
        },
        {
          key: "23",
          linkURL: "/challenges",
          pageName: "challenges",
          color: color,
          iconPage: <FontAwesomeIcon icon={faPersonWalking} />,
          labelPageName: "Thử thách",
          allowedRoles: ["admin"],
        },
      ],
    },
    {
      type: "group",
      menuSideNav: [
        {
          key: "24",
          linkURL: "/lecturers",
          pageName: "lecturers",
          color: color,
          iconPage: <FontAwesomeIcon icon={faUserTie} />,
          labelPageName: "Giảng viên",
          allowedRoles: ["campus"],
        },
        {
          key: "15",
          linkURL: "/stores",
          pageName: "stores",
          color: color,
          iconPage: <FontAwesomeIcon icon={faStore} />,
          labelPageName: "Cửa hàng",
          allowedRoles: ["brand"],
        },
        {
          key: "17",
          linkURL: "/vouchers",
          pageName: "vouchers",
          color: color,
          iconPage: <HiMiniTicket />,
          labelPageName: "Phiếu mẫu",
          allowedRoles: ["brand"],
        },
        {
          key: "26",
          linkURL: "/transactions",
          pageName: "transactions",
          color: color,
          iconPage: <FontAwesomeIcon icon={faClockRotateLeft} />,
          labelPageName: "Giao dịch",
          allowedRoles: ["brand", "campus"],
        },
        {
          key: "27", // New menu item
          linkURL: "/camp-transactions",
          pageName: "camp-transactions",
          color: color,
          iconPage: <FontAwesomeIcon icon={faClockRotateLeft} />,
          labelPageName: "Lịch sử hoạt động  ",
          allowedRoles: ["brand"],
        },
        {
          key: "21",
          linkURL: "/buy-points",
          pageName: "buy-points",
          color: color,
          iconPage: <ShoppingCartOutlined />,
          labelPageName: "Mua điểm",
          allowedRoles: ["brand", "campus"],
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "group",
      menuSideNav: [
        {
          key: "20",
          linkURL: "/profile",
          pageName: "profile",
          color: color,
          iconPage: <ProfileOutlined />,
          labelPageName: "Thông tin chi tiết",
          allowedRoles: ["brand", "campus"],
        },
      ],
    },
  ];

  return (
    <>
      <div className="brand" key="img-logo">
        <img
          style={{
            width: "60%",
            height: "40%",
            borderRadius: 10,
            marginRight: 20,
            marginLeft: "20px",
          }}
          src={logo}
          alt=""
        />
        <span style={{ fontSize: "20px", marginLeft: "40px" }}>SWALLET</span>
      </div>
      <Divider />
      <Menu
        theme="light"
        mode="inline"
        key="menu-sidenav"
        items={menuItems.flatMap((item, index) => {
          if (item.type === "group") {
            return item.menuSideNav
              .filter((menuItem) => menuItem.allowedRoles.includes(roleLogin))
              .map((menuItem) => ({
                key: menuItem.key,
                label: (
                  <MenuItem
                    linkURL={menuItem.linkURL}
                    pageName={menuItem.pageName}
                    color={menuItem.color}
                    iconPage={menuItem.iconPage}
                    labelPageName={menuItem.labelPageName}
                  />
                ),
              }));
          } else if (item.type === "divider" && roleLogin === "admin") {
            return {
              key: `divider-${index}`,
              label: <Divider />,
            };
          }
          return null;
        })}
      />
    </>
  );
}

export default Sidenav;
import { Affix, Layout } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidenav";

const { Header: AntHeader, Content, Sider } = Layout;

function Main() {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#2ECC71");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""
        } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={270}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
          }`}
        style={{ background: "#fff" }}
      >
        <Sidenav color={sidenavColor} />
      </Sider>
      <Layout>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}
        <Content className="content-ant"><Outlet /></Content>
      </Layout>
    </Layout>
  );
}

export default Main;

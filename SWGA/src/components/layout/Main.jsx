import { Affix, Layout } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import storageService from "../../services/storageService";
import Header from "./Header";
import Sidenav from "./Sidenav";

const { Header: AntHeader, Content, Sider } = Layout;

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = storageService.getAccessToken();
    const nameLogin = storageService.getNameLogin();
    if (token) {
      try {
        const tokenDecode = jwtDecode(token);
        
        if (nameLogin === "" || nameLogin === null) {
          storageService.removeAccessToken();
          storageService.removeNameLogin();
          navigate('/sign-in');
        }
      } catch (error) {
        storageService.removeAccessToken();
        storageService.removeNameLogin();
        navigate('/sign-in');
      }
    } else {
      storageService.removeAccessToken();
      storageService.removeNameLogin();
      navigate('/sign-in');
    }
    
  }, [navigate]);

  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#ff6b00");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  const { pathname } = useLocation();
  const cleanPathname = pathname.replace("/", "");

  useEffect(() => {
    if (cleanPathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [cleanPathname]);

  return (
    <Layout
      className={`layout-dashboard ${cleanPathname === "profile" ? "layout-profile" : ""} 
      ${cleanPathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
        trigger={null}
        width={270}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
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
                name={cleanPathname}
                subName={cleanPathname}
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
              name={cleanPathname}
              subName={cleanPathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}
        <Content className="content-ant">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
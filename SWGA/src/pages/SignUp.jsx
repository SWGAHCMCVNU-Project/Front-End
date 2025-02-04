import {
    Layout
  } from "antd";
  import React from "react";
  import RegisterBrand from "../features/authentications/register_form";

  const { Footer, Content } = Layout;
  
  function SignUp() {
  
    return (
      <>
        <div className="layout-default ant-layout layout-sign-up">
          <Content className="p-0">
            <RegisterBrand />
          </Content>
          <Footer>
            <p className="copyright">
              
            </p>
          </Footer>
        </div>
      </>
    );
  }
  
  export default SignUp;
  
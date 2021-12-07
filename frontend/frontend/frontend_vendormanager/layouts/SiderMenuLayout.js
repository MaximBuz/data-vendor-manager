// state management
import { useState } from "react";

// Styling
import styled from "styled-components";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  BarChartOutlined,
  AppstoreOutlined,
  FileDoneOutlined,
  IdcardOutlined,
  BankOutlined,
} from "@ant-design/icons";

export default function SiderMenuLayout(props) {
  // handle collapsing of sider menu
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const onCollapse = () => {
    setMenuCollapsed(!menuCollapsed);
  };

  // Ant Design Components
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={menuCollapsed} onCollapse={onCollapse}>
        {/* Put the logo here: <div className="logo" /> */}
        <MenuLogo>3B</MenuLogo>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<BarChartOutlined />}>
            Cost Manager
          </Menu.Item>
          <Menu.Item key="3" disabled icon={<FileDoneOutlined />}>
            License Manager
          </Menu.Item>
          <Menu.Item key="4" disabled icon={<IdcardOutlined />}>
            Onboarder
          </Menu.Item>
          <Menu.Item key="5" disabled icon={<BankOutlined />}>
            Vendor Manager
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* Put in Breadcrumbs in here <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>3B ©2021</Footer>
      </Layout>
    </Layout>
  );
}

/* 
--------------------------------
Styled components
--------------------------------
*/


// Logo
const MenuLogo = styled.div`
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2.4rem;
  font-weight: bold;
`
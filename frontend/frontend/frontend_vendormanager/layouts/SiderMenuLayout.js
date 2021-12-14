// Routing
import Link from "next/link";

// state management
import { useState } from "react";

// Components
import TopMenuItems from "./TopMenuItems";

// Styling
import Logo from "./Logo";
import classes from "../styles/SiderMenuLayout.module.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  BarChartOutlined,
  AppstoreOutlined,
  FileDoneOutlined,
  IdcardOutlined,
  BankOutlined,
  ProfileOutlined
} from "@ant-design/icons";

export default function SiderMenuLayout(props) {
  // handle collapsing of sider menu
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const onCollapse = () => {
    setMenuCollapsed(!menuCollapsed);
  };

  // Handle active menu highlighting
  const activeRoute = props.activeRoute.split("/")[1];

  // Ant Design Components
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={menuCollapsed} onCollapse={onCollapse}>
        <div className={classes.logo}>
          3B
          {/* <Logo className={classes.logo} fill="white" size={60}/> */}
        </div>
        <Menu theme="dark" defaultSelectedKeys={[activeRoute]} mode="inline">
          <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
            <Link href="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="cost-manager" icon={<BarChartOutlined />}>
            <Link href="/cost-manager">Cost Manager</Link>
          </Menu.Item>
          <Menu.Item key="license-manager" disabled icon={<FileDoneOutlined />}>
            <Link href="/license-manager">License Manager</Link>
          </Menu.Item>
          <Menu.Item key="onboarder" disabled icon={<IdcardOutlined />}>
            <Link href="/onboarder">Onboarder</Link>
          </Menu.Item>
          <Menu.Item key="vendor-manager" disabled icon={<BankOutlined />}>
            <Link href="/vendor-manager">Vendor Manager</Link>
          </Menu.Item>
          <Menu.Item key="master-data-manager" icon={<ProfileOutlined />} style={{ marginBottom: "40px" }}>
            <Link href="/master-data-manager/organizations">Master Data Manager</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* This Component Manages module specific tabs */}
          <TopMenuItems activeModule={activeRoute} activeRoute={props.activeRoute}></TopMenuItems>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* Put in Breadcrumbs in here:
            <Breadcrumb.Item>User</Breadcrumb.Item>
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

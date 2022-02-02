// Routing
import Link from "next/link";
import { useRouter } from "next/router";

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
  const activeModule = props.activeRoute.split("/")[1];

  // Handle breadcrumbs
  const routeComponents = props.activeRoute.split("/")
  routeComponents.shift() //getting rid of empty value in array
  let id;
  try /* getting dynamic id */ { 
    const router = useRouter();
    const query = router.query;
    id = Object.entries(query)[0][1]
  } catch {}

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
        <Menu theme="dark" defaultSelectedKeys={[activeModule]} mode="inline">
          <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
            <Link href="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="cost-manager" icon={<BarChartOutlined />}>
            <Link href="/cost-manager/usage">Cost Manager</Link>
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
          <TopMenuItems activeModule={activeModule} activeRoute={props.activeRoute}></TopMenuItems>
        </Header>
        <Content style={{ margin: "0 16px", }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* Dynamically render breadcrumbs */}
            {routeComponents.map((path, index) => {
              /* later we have to change this to the actual name of the item instead of id */
              if ( /^\[.*\]$/.test(path) ) {
                path = id ? id : path;
              }
              if (index === routeComponents.length - 1){
                return (
                  <Breadcrumb.Item key={index}>{path}</Breadcrumb.Item>
                )
              } else /* ,if its the last item */{
                return (
                  <Breadcrumb.Item key={index}><Link href={`/${routeComponents[index-1]?.concat("/") || ""}${path}/`}>{path}</Link></Breadcrumb.Item>
                )
              }
            })}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: "20px", minHeight: "100%"}}
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

// Routing
import Link from "next/link";

// state management
import { useState } from "react";
import { Menu } from "antd";

// Styling
import {
    BarChartOutlined,
    AppstoreOutlined,
    UserSwitchOutlined,
    ApartmentOutlined,
    BankOutlined,
    GlobalOutlined
  } from "@ant-design/icons";
import { UilSitemap } from '@iconscout/react-unicons'


export default function TopMenuItems({activeModule, activeRoute}) {
  if(activeModule === "cost-manager") {return (
    <>
      <Menu theme="dark" defaultSelectedKeys={[activeRoute]} mode="horizontal">
        <Menu.Item key="/cost-manager/* Here put it route */" icon={<BarChartOutlined />}>
          <Link href="/cost-manager">Cost Manager</Link>
        </Menu.Item>
      </Menu>
    </>
  );}

  if(activeModule === "dashboard") {return (
    <>
      <Menu theme="dark" defaultSelectedKeys={[activeRoute]} mode="horizontal">
        <Menu.Item key="/dashboard/* Here put in route */" icon={<AppstoreOutlined />}>
          <Link href="/cost-manager">Dashboard</Link>
        </Menu.Item>
      </Menu>
    </>
  );}

  if(activeModule === "master-data-manager") {return (
    <>
      <Menu theme="dark" defaultSelectedKeys={[activeRoute]} mode="horizontal">
        <Menu.Item key="/master-data-manager/organizations" icon={<ApartmentOutlined />}>
          <Link href="/master-data-manager/organizations">Organizations</Link>
        </Menu.Item>
        <Menu.Item key="/master-data-manager/geography" icon={<GlobalOutlined />}>
          <Link href="/master-data-manager/geographies">Geographies</Link>
        </Menu.Item>
        <Menu.Item key="/master-data-manager/employees" icon={<UserSwitchOutlined />}>
          <Link href="/master-data-manager/employees">Employees</Link>
        </Menu.Item>
        <Menu.Item key="/master-data-manager/vendors" icon={<BankOutlined />}>
          <Link href="/master-data-manager/vendors">Vendors</Link>
        </Menu.Item>
      </Menu>
    </>
  );}

  return(
    <>
    </>
  )
}

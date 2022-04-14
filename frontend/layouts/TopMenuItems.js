// Routing
import Link from "next/link";

/* COMPONENTS */
import { Menu, Button} from "antd";

/* API MUTATIONS */
import {useMutation} from "react-query";
import { useQueryClient } from "react-query";

/* AUTHENTICATION */
import logout from "../utils/auth/logout";
import {useRouter} from "next/router";

// Styling
import {
  BarChartOutlined,
  AppstoreOutlined,
  UserSwitchOutlined,
  ApartmentOutlined,
  BankOutlined,
  GlobalOutlined,
  FieldTimeOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { UilSitemap } from "@iconscout/react-unicons";

export default function TopMenuItems({ activeModule, activeRoute }) {

  const router = useRouter()
  const queryClient = useQueryClient();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      // toast.success("Updated Bloomberg Account Number successfully");
      queryClient.invalidateQueries("currentUser");
      router.reload()
    },
    onError: (error) => {
      // toast.error(String(error));
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  }


  return (
      <Menu theme="dark" defaultSelectedKeys={[activeRoute]} mode="horizontal">
        {activeModule === "cost-manager" ? (
            <Menu.Item key="/cost-manager/usage" icon={<FieldTimeOutlined />}>
              <Link href="/cost-manager/usage">Usage Analysis</Link>
            </Menu.Item>
        ) : activeModule === "dashboard" ? (
            <Menu.Item
              key="/dashboard/* Here put in route */"
              icon={<AppstoreOutlined />}
            >
              <Link href="/cost-manager">Dashboard</Link>
            </Menu.Item>
        ) : activeModule === "master-data-manager" ? (
          <>
            <Menu.Item
              key="/master-data-manager/organizations"
              icon={<ApartmentOutlined />}
            >
              <Link href="/master-data-manager/organizations">
                Organizations
              </Link>
            </Menu.Item>
            <Menu.Item
              key="/master-data-manager/geography"
              icon={<GlobalOutlined />}
            >
              <Link href="/master-data-manager/geographies">Geographies</Link>
            </Menu.Item>
            <Menu.Item
              key="/master-data-manager/employees"
              icon={<UserSwitchOutlined />}
            >
              <Link href="/master-data-manager/employees">Employees</Link>
            </Menu.Item>
            <Menu.Item
              key="/master-data-manager/vendors"
              icon={<BankOutlined />}
            >
              <Link href="/master-data-manager/vendors">Vendors</Link>
            </Menu.Item>
          </>
        ) : (
          <></>
        )}
        <div style={{position: "absolute", top: "0", right: "20px"}}>
          <Button onClick={handleLogout} type="primary" shape="round" icon={<LogoutOutlined />}>Logout</Button>
        </div>
      </Menu>
  );
}

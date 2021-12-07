import "../styles/globals.css";
import "antd/dist/antd.css";

// Routing
import { useRouter } from "next/router";

// Layouts
import SiderMenuLayout from "../layouts/SiderMenuLayout";

function MyApp({ Component, pageProps }) {
  // get current route for menu highlighting
  const router = useRouter();

  return (
    <SiderMenuLayout activeRoute={router.route}>
      <Component {...pageProps} />
    </SiderMenuLayout>
  );
}

export default MyApp;



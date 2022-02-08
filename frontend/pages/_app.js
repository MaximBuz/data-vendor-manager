import '../styles/globals.css';
import 'antd/dist/antd.css';

// React
import { useState } from 'react';

// Routing
import { useRouter } from 'next/router';

// Layouts
import SiderMenuLayout from '../layouts/SiderMenuLayout';

// Data Fetching
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Authentication
import _AppContainer from './_AppContainer';

function MyApp({ Component, pageProps }) {
 // Instantiate a query client for React Query
 const [queryClient] = useState(
  () =>
   new QueryClient({
    defaultOptions: {
     queries: {
      staleTime: 15000,
     },
    },
   })
 );

 // get current route for menu highlighting
 const router = useRouter();

 return (
  <QueryClientProvider client={queryClient}>
   <_AppContainer>
    <Hydrate state={pageProps.dehydratedState}>
     <SiderMenuLayout activeRoute={router.route}>
      <Component {...pageProps} />
      <ToastContainer />
     </SiderMenuLayout>
    </Hydrate>
   </_AppContainer>
   <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
  </QueryClientProvider>
 );
}

export default MyApp;

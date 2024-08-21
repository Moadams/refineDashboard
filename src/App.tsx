import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import {authProvider, dataProvider, liveProvider} from "./providers"
import {Home, ForgotPassword, Login, Register} from './pages'

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";


function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "RxB6Y3-JRNgS9-mWa9xd",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route element={<Layout>
                    <Outlet />
                  </Layout>}>
                    <Route index element={<Home />} />
                  </Route>
                  <Route index path="/register" element={<Register />} />
                  <Route index path="/login" element={<Login />} />
                  <Route index path="/forgot-password" element={<ForgotPassword />} />
                  <Route element={<Authenticated key="authenticated-layout" fallback={<CatchAllNavigate to="/login" />}> 
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>}>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

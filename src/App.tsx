import {
  Refine,
  GitHubBanner,
  WelcomePage,
  Authenticated,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { MuiInferencer } from "@refinedev/inferencer/mui";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { dataProvider } from "rest-data-provider";
import BlogPostList from "pages/blog-posts/list";
import BlogPostEdit from "pages/blog-posts/edit";
import BlogPostShow from "pages/blog-posts/show";
import BlogPostCreate from "pages/blog-posts/create";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "fY1RxZ-IudykQ-J2o429",
                }}
                resources={[
                  {
                    name: "blog_posts",
                    list: "/blog-posts",
                    show: "/blog-posts/show/:id",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
              >
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                    <Route path="blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="create" element={<BlogPostCreate />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

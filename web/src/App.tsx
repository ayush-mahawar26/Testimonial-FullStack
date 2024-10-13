import "./App.css";
import {
  Router,
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BasePage } from "./pages/base.page";
import { SigninPage } from "./pages/auth/signin";
import { SignUpPage } from "./pages/auth/signup";
import { RecoilRoot } from "recoil";
import { DashBoard } from "./pages/dashboard";
import { AddProject } from "./pages/Addproject";
import { ProjectView } from "./pages/Project";
import { AddReviewPage } from "./pages/AddReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
  },
  {
    path: "/auth/signin",
    element: <SigninPage />,
  },
  {
    path: "/auth/signup",
    element: <SignUpPage />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
  {
    path: "/add/project",
    element: <AddProject />,
  },
  {
    path: "/project/:id",
    element: <ProjectView />,
  },
  {
    path: "/review/:id",
    element: <AddReviewPage />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;

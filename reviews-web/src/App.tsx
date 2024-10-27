import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BasePage } from "./Basepage";
import { RecoilRoot } from "recoil";
import { TestPage } from "./Testpage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BasePage />,
    },
    {
      path: "/test/:id",
      element: <TestPage />,
    },
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;

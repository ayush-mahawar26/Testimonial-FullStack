import "./App.css";
import { BasePage } from "./pages/BasePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { TestPage } from "./pages/Testpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
  },
  {
    path: "/test",
    element: <TestPage />,
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

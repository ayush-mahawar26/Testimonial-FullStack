import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { BasePage } from "./Basepage";
import { RecoilRoot } from "recoil";

function App() {
  const router = createHashRouter([
    {
      path: "/:id",
      element: <BasePage />,
    },
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;

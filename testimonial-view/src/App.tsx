import "./App.css";
import { BasePage } from "./BasePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <BasePage />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  );
}

export default App;

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BasePage } from "./Basepage";
import { RecoilRoot } from "recoil";

function App() {
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

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

function TestPage() {
  return <div>test page</div>;
}

export default App;

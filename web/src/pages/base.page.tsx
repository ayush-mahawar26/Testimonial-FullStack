import { useEffect } from "react";
import { useNavigate } from "react-router";

export function BasePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/auth/signin");
    }
  });

  return <div></div>;
}

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { baseurl } from "../webconst";

export function BasePage() {
  const navigate = useNavigate();

  async function getValidToken(token: string) {
    const url = baseurl + "/auth/checktoken";
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      if (res.status > 200) return false;

      if (res.data.statusCode > 200) return false;

      return res.data.data;
    } catch (error) {
      return false;
    }
  }
  async function handleToken() {
    const token = localStorage.getItem("token");
    const isValid: Boolean = await getValidToken(token!);
    if (token && isValid === true) {
      navigate("/dashboard");
    } else {
      navigate("/auth/signin");
    }
  }

  useEffect(() => {
    handleToken();
  });

  return <div></div>;
}

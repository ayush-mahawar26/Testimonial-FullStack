import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { baseurl } from "../webconst";

export function BasePage() {
  const navigate = useNavigate();
  const [reset, setReset] = useState(true);

  async function getValidToken(token: string) {
    const url = baseurl + "/auth/checktoken";
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: token,
          "Access-Control-Allow-Origin": "*",
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
    // const isValid: Boolean = true;

    if (token && isValid === true) {
      navigate("/dashboard");
    } else {
      localStorage.removeItem("token");
      setReset(!reset);
      navigate("/auth/signin");
    }
  }

  useEffect(() => {
    handleToken();
  });

  return <div></div>;
}

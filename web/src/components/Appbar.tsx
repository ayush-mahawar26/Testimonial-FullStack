import axios from "axios";
import { useEffect, useState } from "react";
import { baseurl } from "../webconst";

export function AppBar() {
  const [name, setName] = useState("");

  async function getUserInfo() {
    const res = await axios
      .get(baseurl + "/auth", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .catch(() => {
        return;
      });

    setName(res!.data.data.user.username.toUpperCase());
  }

  useEffect(() => {
    getUserInfo();
  });

  return (
    <div>
      <div className="flex justify-between px-20 py-5 items-center">
        <div className="text-slate-100 text-xl font-semibold">Reviewer.IO</div>

        <div className="text-slate-100 rounded-full bg-slate-600 px-1">
          <p className="p-2">{name.substring(0, 2)}</p>
        </div>
      </div>
      <hr className="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
    </div>
  );
}

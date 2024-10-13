import { nativeSelectClasses } from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import { formatDate } from "../utils/dateformat";

export function ProjectCard({ item }: { item: any }) {
  const nav = useNavigate();

  return (
    <div
      className="shadow-md bg-sec-text my-3 rounded-md hover:cursor-pointer"
      onClick={() => {
        nav(`/project/${item["id"]}`);
      }}
    >
      <p className="px-4 py-2">{item["projectname"]}</p>
      <div className="flex justify-between px-4 pb-3">
        <p className="text-sm text-slate-500">CreatedAt</p>
        <div className="w-[100%] flex justify-end">
          <p className="text-sm text-slate-500 font-semibold">
            {formatDate(item["createdAt"])}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProjectCardShimmer() {
  return (
    <div className="shadow-md bg-sec-text my-3 rounded-md animate-pulse">
      <div className="px-4 py-2">
        <div className="h-4 bg-slate-700 rounded-md w-3/4"></div>
      </div>
      <div className="flex justify-between px-4 pb-3">
        <div className="h-3 bg-slate-700 rounded-md w-1/4"></div>
        <div className="h-3 bg-slate-700 rounded-md w-1/3"></div>
      </div>
    </div>
  );
}

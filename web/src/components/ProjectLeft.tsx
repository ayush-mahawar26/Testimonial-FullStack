import { useState } from "react";
import { useRecoilState } from "recoil";
import { inboxIndexAtom } from "../atoms/projectatom";

export function ProjectLeft() {
  const list = ["All", "Liked", "Archieved"];
  const color = ["bg-blue-400", "bg-slate-300", "bg-red-400"];

  const [index, setIndex] = useRecoilState(inboxIndexAtom);

  return (
    <div className="w-[25%] text-white">
      <p className="font-medium text-xl pb-2 text-slate-300">Reviews</p>
      {list.map((e) => {
        return (
          <div
            className={`py-2 flex items-center px-3 hover:cursor-pointer ${
              index === list.indexOf(e) ? "bg-slate-600 rounded-lg" : ""
            }`}
            onClick={() => {
              setIndex(list.indexOf(e));
            }}
          >
            <div
              className={`w-2 h-2  ${color[list.indexOf(e)]} rounded-full`}
            ></div>
            <p className="pl-2">{e}</p>
          </div>
        );
      })}
    </div>
  );
}

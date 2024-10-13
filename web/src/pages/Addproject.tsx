import { useState } from "react";
import { AddProjectLeft } from "../components/addproject_left"
import { AddProjectRight } from "../components/addproject_right"


export function AddProject() {
    return <div className="flex min-h-screen justify-center bg-slate-600">
        <MidCard />
    </div>
}

function MidCard() {
    return <div className="w-[70%] h-[100%] my-5 shadow-lg bg-slate-100 p-10 rounded-lg flex">
        <AddProjectLeft />
        <AddProjectRight />
    </div>
}
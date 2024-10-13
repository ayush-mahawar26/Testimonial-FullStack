import { useEffect } from "react";
import { AppBar } from "../components/Appbar";
import { ProjectComponent } from "../components/Projectcompo";
import { useNavigate } from "react-router";


export function DashBoard() {

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth/signin')
        }
    })

    return <div className="min-h-screen w-screen bg-primary-black">
        <AppBar />
        <div className="">
            <ProjectComponent />
        </div>
    </div>
}
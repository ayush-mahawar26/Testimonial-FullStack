import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { projectAtom } from "../atoms/projectatom";
import { useEffect } from "react";
import axios from "axios";
import { baseurl } from "../webconst";
import { loadingatom, messageAtom, openAtom } from "../atoms/utilatoms";
import { CustomSnackbar } from "./Snackbar";
import { ProjectCard, ProjectCardShimmer } from "./ProjectCard";
import { Navigate, useNavigate } from "react-router";

export function ProjectComponent() {
  const navigate = useNavigate();

  return (
    <div className="px-20 py-10">
      <div className="flex justify-between py-5">
        <p className="text-slate-300 font-bold text-3xl">Your Projects</p>
        <div
          onClick={() => {
            navigate("/add/project");
          }}
          className="py-2 px-4 bg-slate-200 rounded-lg hover:cursor-pointer"
        >
          <p className="text-md">+ Add Project</p>
        </div>
      </div>
      <ProjectSection />
    </div>
  );
}

function ProjectSection(): JSX.Element {
  const [projects, setProject] = useRecoilState(projectAtom);
  const setOpen = useSetRecoilState(openAtom);
  const setMessage = useSetRecoilState(messageAtom);
  const [loading, setLoading] = useRecoilState(loadingatom);

  const nav = useNavigate();

  async function getProjects() {
    setLoading(true);
    console.log(localStorage.getItem("token"));

    const projectsResponse = await axios.get(baseurl + "/dashboard", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(projectsResponse.data);

    if (projectsResponse.data.statusCode > 200) {
      if (projectsResponse.data.message === "Invalid token provided") {
        localStorage.removeItem("token");
      }
      setLoading(false);

      return;
    }

    setProject(projectsResponse.data.data.userProject.Projects);
    setLoading(false);
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      {loading === true ? (
        <div className="w-[100%] grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="text-slate-50 px-2">
              <ProjectCardShimmer />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[100%] grid grid-cols-3 gap-4">
          {projects.map((item) => {
            return (
              <div key={item["id"]} className="text-slate-50 px-2">
                <ProjectCard
                  item={item}
                  //   name={item["projectname"]}
                  //   date={item["createdAt"]}
                />
              </div>
            );
          })}
        </div>
      )}
      <CustomSnackbar
        message={useRecoilValue(messageAtom)}
        open={useRecoilValue(openAtom)}
        openState={setOpen}
      />
    </div>
  );
}

import { useNavigate, useParams } from "react-router";
import { AppBar } from "../components/Appbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../webconst";
import { useSetRecoilState } from "recoil";
import { loadingatom } from "../atoms/utilatoms";
import { ProjectLeft } from "../components/ProjectLeft";
import { ProjectRight } from "../components/ProjectRight";

export function ProjectView() {
  const param = useParams();

  // // atom
  // const [message, setMessage] = useRecoilState(messageAtom);
  // const [open, setOpen] = useRecoilState(openAtom);
  const setLoading = useSetRecoilState(loadingatom);
  const [project, setProject] = useState({});

  // variable
  const projectid = param["id"];

  async function getProjectById() {
    setLoading(true);
    const url = baseurl + `/dashboard/${projectid}`;
    console.log(url);

    const projectResponse = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (projectResponse.status > 200) {
      setLoading(false);

      return;
    }

    if (projectResponse.data.statusCode > 200) {
      setLoading(false);
      return;
    }

    setProject(projectResponse.data.data.project);
    setLoading(false);
  }

  useEffect(() => {
    getProjectById();
  }, []);

  return (
    <div className="bg-primary-black min-h-screen w-[100%]">
      <AppBar />
      <ProjectTopBar projectDetail={project} />
    </div>
  );
}

export function ProjectTopBar({ projectDetail }: { projectDetail: any }) {
  const nav = useNavigate();

  const projectname = projectDetail["projectname"];
  const projectId = projectDetail["id"];
  const projectImg = projectDetail["projectImg"];
  return (
    <div>
      <div className="flex px-20 py-10 justify-between">
        <div className="flex">
          <img
            className="rounded-[15px] border-solid border-2"
            src={
              projectImg === ""
                ? "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd2slcw3kip6qmk.cloudfront.net%2Fmarketing%2Fblog%2F2017Q2%2Fproject-planning-header%402x.png&f=1&nofb=1&ipt=36a14ca0fd221c958e8f3fe8bf9c5a6e875f8fd77872c0946bbee4654e4c45af&ipo=images"
                : projectImg
            }
            alt=""
            width={150}
          />
          <div className="px-5 flex flex-col justify-center">
            <p className="text-slate-200 font-medium text-2xl">{projectname}</p>
            <div className="text-slate-200 text-sm flex font-semibold">
              <p className="pr-2">Your url : </p>
              <div
                onClick={() => {
                  nav(`/review/${projectId}`);
                }}
              >
                <p className="hover:cursor-pointer">
                  http://localhost:5173/review/{projectId}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3">
          <button
            type="button"
            className="w-[100%] text-primary-black bg-slate-200 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={() => {}}
          >
            Edit Setting
          </button>
        </div>
      </div>

      <div className="flex px-20">
        <ProjectLeft />
        <ProjectRight />
      </div>
    </div>
  );
}

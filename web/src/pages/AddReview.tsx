import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { projectDetailByIdAtom } from "../atoms/projectatom";
import { loadingatom, openDailog } from "../atoms/utilatoms";
import { baseurl } from "../webconst";
import { AppBar } from "../components/Appbar";
import { CustomButton } from "../components/Buttoncompo";
import { CustomDailog } from "../components/DailogBox";

export function AddReviewPage() {
  return (
    <div className="bg-primary-black min-h-screen w-screen text-slate-100">
      {/* <AppBar /> */}
      <MainContentReview />
    </div>
  );
}

export function MainContentReview() {
  const project: any = useRecoilValue(projectDetailByIdAtom);
  const projectImg: string = project["projectImg"];

  const setOpen = useSetRecoilState(openDailog);

  return (
    <div className="px-20 py-32 flex flex-col justify-center items-center">
      <img
        src={
          projectImg.length === 0
            ? "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd2slcw3kip6qmk.cloudfront.net%2Fmarketing%2Fblog%2F2017Q2%2Fproject-planning-header%402x.png&f=1&nofb=1&ipt=36a14ca0fd221c958e8f3fe8bf9c5a6e875f8fd77872c0946bbee4654e4c45af&ipo=images"
            : projectImg
        }
        className="border-solid border-slate-400 border-2 rounded-lg"
        alt=""
        width={180}
        height={180}
      />

      <p className="font-bold text-3xl py-2">{project["projectname"]}</p>
      <p className="font-semibold text-xl ">{project["description"]}</p>
      <div className="w-[100%] px-10 py-4 flex flex-col justify-center items-center text-slate-400">
        <p className="font-medium">
          &#x2022; Who are you / what are you working on?
        </p>
        <p className="font-medium">
          &#x2022; How has [our product / service] helped you?
        </p>
        <p className="font-medium">
          &#x2022; What is the best thing about [our product / service] ?
        </p>
      </div>

      <div className="py-3">
        <button
          type="button"
          className="w-[100%] text-primary-text bg-slate-100
     hover:bg-slate-300 hover:cursor-pointer rounded-lg text-sm px-5 py-2.5 me-2 mb-2 font-medium flex"
          onClick={() => {
            setOpen(true);
          }}
        >
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                fill="#000000"
              ></path>{" "}
            </g>
          </svg>
          <p className="pl-2">Add Text</p>
        </button>
        <CustomDailog />
      </div>
    </div>
  );
}

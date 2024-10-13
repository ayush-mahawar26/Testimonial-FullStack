import { TextWrapper } from "./Textwrapper";
import { useRecoilValue } from "recoil";
import {
  projectDescriptionAtom,
  projectHeaderAtom,
  serviceNameAtom,
} from "../atoms/projectatom";

export function AddProjectLeft() {
  const header: string = useRecoilValue(projectHeaderAtom);
  const description: string = useRecoilValue(projectDescriptionAtom);
  const productName: string = useRecoilValue(serviceNameAtom);

  return (
    <div className="w-[40%] flex flex-col items-center border-solid border-2 border-slate-300 rounded-lg">
      <TextWrapper
        text={header.length == 0 ? "Header goes here...." : header}
        maxWidth="max-w-xs"
        textSize="text-2xl font-semibold py-5"
        textColor="text-slate-700"
      />
      <TextWrapper
        text={
          description.length == 0
            ? "Your custom message goes here...."
            : description
        }
        maxWidth="max-w-xs"
        textSize="text-xl font-medium"
        textColor="text-slate-600"
      />

      <div className="w-[100%] flex items-start px-10 pt-8">
        <p className="text-xl font-medium text-slate-600">Question</p>
      </div>
      <div className="w-[100%] px-10 py-4">
        <p className="font-medium text-slate-600">
          &#x2022; Who are you / what are you working on?
        </p>
        <p className="font-medium text-slate-600">
          &#x2022; How has{" "}
          {productName.length === 0 ? "[our product / service]" : productName}{" "}
          helped you?
        </p>
        <p className="font-medium text-slate-600">
          &#x2022; What is the best thing about{" "}
          {productName.length === 0 ? "[our product / service]" : productName}?
        </p>
      </div>
    </div>
  );
}

import { EntryBoxComponent, MultiLineEntryBoxComponent } from "./Entrybox";
import { useRecoilState } from "recoil";
import {
  projectDescriptionAtom,
  projectHeaderAtom,
  projectImageAtom,
  projectNameAtom,
} from "../atoms/projectatom";
import { CustomButton, LoadingButton } from "./Buttoncompo";
import { baseurl } from "../webconst";
import axios from "axios";
import { loadingatom, messageAtom, openAtom } from "../atoms/utilatoms";
import { useNavigate } from "react-router";
import { CustomSnackbar } from "./Snackbar";

export function BasicComponent() {
  const [pname, projectName] = useRecoilState(projectNameAtom);
  const [pheader, projectHeader] = useRecoilState(projectHeaderAtom);
  const [pdescp, projectdescription] = useRecoilState(projectDescriptionAtom);
  // const productName = useSetRecoilState(serviceNameAtom)
  const [img, setImage] = useRecoilState(projectImageAtom);

  const [loading, setLoading] = useRecoilState(loadingatom);
  const [open, setOpen] = useRecoilState(openAtom);
  const [message, setMessage] = useRecoilState(messageAtom);
  const navigate = useNavigate();

  async function createProject() {
    setLoading(true);
    const url = baseurl + "/dashboard";

    const formData = new FormData();
    formData.append("projectName", pname);
    formData.append("headerTitle", pheader);
    formData.append("description", pdescp);

    if (img) {
      formData.append("projectImg", img);
    }

    console.log(formData.get("projectImg"));

    const res = await axios
      .post(url, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setMessage(e);
        setOpen(true);

        return;
      });
    console.log(res);

    setLoading(false);
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="flex flex-col items-center py-3 px-8">
      <p className="font-medium text-2xl">Create a new Space</p>
      <p className="text-slate-500 font-medium text-center py-2">
        After the project is created, it generate the page for collecting the
        reviews
      </p>
      <div className="w-[100%]">
        <EntryBoxComponent
          title="Project name"
          type="text"
          value={projectName}
        />
      </div>
      <div className="w-[100%]">
        <div>
          <p className="font-medium">Project image</p>

          <div className="py-1">
            <input
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              type="File"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5"
              required
            />
          </div>
        </div>
        {/* <img src={img.name} /> */}
      </div>
      <div className="w-[100%]">
        <EntryBoxComponent
          title="Header title"
          type="text"
          value={projectHeader}
        />
      </div>
      <div className="w-[100%]">
        <MultiLineEntryBoxComponent
          title="Your custom message"
          hint="Your message goes here...."
          value={projectdescription}
        />
      </div>
      {/* <div className="w-[100%]">
            <EntryBoxComponent title="Service/Product name" type="text" value={productName} />
        </div> */}
      {loading === false ? (
        <CustomButton
          title="Create new project"
          onTap={() => {
            createProject();
          }}
        />
      ) : (
        <LoadingButton size="w-[30%]" />
      )}
      <CustomSnackbar message={message} open={open} openState={setOpen} />
    </div>
  );
}

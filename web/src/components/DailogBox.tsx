import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  loadingatom,
  messageAtom,
  openAtom,
  openDailog,
} from "../atoms/utilatoms";
import { projectDetailByIdAtom } from "../atoms/projectatom";
import { EntryBoxComponent, MultiLineEntryBoxComponent } from "./Entrybox";
import { RxCross2 } from "react-icons/rx";
import { CustomButton, LoadingButton } from "./Buttoncompo";
import { CustomSnackbar } from "./Snackbar";
import axios from "axios";
import { baseurl } from "../webconst";
import { useParams } from "react-router";

export function CustomDailog() {
  const [open, setOpen] = useRecoilState(openDailog);
  const projectDetails: any = useRecoilValue(projectDetailByIdAtom);

  const img: string = projectDetails["projectImg"];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [reviewDesciption, setReviewDescription] = useState("");

  const [loading, setLoading] = useRecoilState(loadingatom);
  const [mssg, setMessage] = useRecoilState(messageAtom);
  const [openSnackbar, setOpenSnackbar] = useRecoilState(openAtom);
  const param = useParams();

  async function submitReview() {
    setLoading(true);
    if (
      name.length === 0 ||
      email.length === 0 ||
      title.length === 0 ||
      reviewDesciption.length === 0
    ) {
      setMessage("Fill All Details");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    setLoading(false);

    const res = await axios.post(baseurl + `/testimonials/${param["id"]}`, {
      title: title,
      authorname: name,
      email: email,
      description: reviewDesciption,
    });

    if (!res) {
      setMessage("Server Error");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    console.log(res.data);
    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      className="w-[100%]"
      PaperProps={{
        style: {
          width: "30%",
          maxWidth: "none", // Disable Material-UI's default max width
        },
      }}
    >
      <div className="">
        <DialogContent>
          <div className="flex flex-col items-center">
            <div className="flex items-end justify-end w-[100%]">
              <p
                className="hover:cursor-pointer"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <RxCross2 />
              </p>
            </div>
            <p className="font-medium text-2xl pb-5">Add Your Review</p>
            <img
              src={
                img.length === 0
                  ? "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd2slcw3kip6qmk.cloudfront.net%2Fmarketing%2Fblog%2F2017Q2%2Fproject-planning-header%402x.png&f=1&nofb=1&ipt=36a14ca0fd221c958e8f3fe8bf9c5a6e875f8fd77872c0946bbee4654e4c45af&ipo=images"
                  : img
              }
              alt=""
              width={150}
              height={150}
              className="rounded-lg"
            />
            <p className="font-medium text-xl">
              {projectDetails["projectname"]}
            </p>
            <p className="text-md py-2">{projectDetails["description"]}</p>
            <div className="flex flex-col justify-start w-[100%]">
              <EntryBoxComponent title="Name" value={setName} type="text" />
              <EntryBoxComponent
                title="Email Address"
                value={setEmail}
                type="Email"
              />
              <EntryBoxComponent
                title="Your title"
                value={setTitle}
                type="text"
              />
              <MultiLineEntryBoxComponent
                title="How our product helped you ?"
                hint="How we helped you ?"
                value={setReviewDescription}
              />
              {loading === true ? (
                <LoadingButton size="w-[100%]" />
              ) : (
                <CustomButton
                  title="Submit"
                  onTap={() => {
                    submitReview();
                  }}
                />
              )}
            </div>
          </div>
        </DialogContent>
        <CustomSnackbar
          open={openSnackbar}
          openState={setOpenSnackbar}
          message={mssg}
        />
      </div>
    </Dialog>
  );
}

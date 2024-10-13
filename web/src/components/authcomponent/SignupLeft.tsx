import { CustomButton, LoadingButton } from "../Buttoncompo";
import { EntryBoxComponent } from "../Entrybox";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../../webconst";
import { useRecoilState } from "recoil";
import { loadingatom, openAtom } from "../../atoms/utilatoms";
import { CustomSnackbar } from "../Snackbar";

export function SignUpLeft() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useRecoilState(openAtom);
  const [loading, setLoading] = useRecoilState(loadingatom);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  });

  async function signUpUser() {
    setLoading(true);
    const user = await axios.post(baseurl + "/auth/signup", {
      username: username,
      useremail: email,
      userpassword: password,
    });

    if (user.data.statusCode > 200) {
      setErrorMessage(user.data.message);
      setOpen(true);
      setLoading(false);
      return;
    }

    const token: string = user.data.data.token;
    localStorage.setItem("token", "Bearer " + token);
    setErrorMessage(user.data.mssg);
    setOpen(true);
    setLoading(false);
  }

  return (
    <div className="w-[50%]">
      <h1 className="font-medium text-2xl">Welcome</h1>
      <p className="text-sec-text py-2">Create your account</p>
      <div className="py-2">
        <EntryBoxComponent value={setUsername} title="Username" type="text" />
      </div>
      <div className="py-2">
        <EntryBoxComponent title="Email" type="text" value={setEmail} />
      </div>
      <div className="py-2">
        <EntryBoxComponent
          title="Password"
          type="password"
          value={setPassword}
        />
      </div>
      {loading === false ? (
        <CustomButton
          onTap={() => {
            signUpUser();
          }}
          title="Sign up"
        />
      ) : (
        <LoadingButton size="w-[100%]" />
      )}
      <div className="flex justify-center">
        <p>Already have account ? </p>
        <p
          className="font-semibold px-1 hover:cursor-pointer"
          onClick={() => {
            navigate("/auth/signin");
          }}
        >
          Sign In
        </p>
      </div>
      <CustomSnackbar open={open} openState={setOpen} message={errorMessage} />
    </div>
  );
}

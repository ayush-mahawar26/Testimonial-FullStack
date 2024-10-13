import axios from "axios";
import { CustomButton, LoadingButton } from "../Buttoncompo";
import { EntryBoxComponent } from "../Entrybox";
import { useNavigate } from "react-router";
import { baseurl } from "../../webconst";
import { useEffect, useState } from "react";
import { CustomSnackbar } from "../Snackbar";
import { useRecoilState } from "recoil";
import { loadingatom, openAtom } from "../../atoms/utilatoms";


export function SignInLeft() {

    const navigate = useNavigate()

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useRecoilState(loadingatom)
    const [open, setOpen] = useRecoilState(openAtom)
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard')
        }
    })

    async function onClickSignin() {
        setLoading(true)
        console.log(email);
        console.log(password);

        const user = await axios.post(baseurl + '/auth/signin', {
            useremail: email,
            userpassword: password
        })

        if (user.data.statusCode > 200) {
            setErrorMessage(user.data.message);
            setOpen(true);
            setLoading(false)
            return
        }

        const token: string = user.data.data.token;
        localStorage.setItem('token', 'Bearer ' + token)
        setErrorMessage(user.data.mssg);
        setOpen(true);
        setLoading(false)
    }

    return <div className="w-[50%]">
        <h1 className="font-medium text-2xl">Welcome back</h1>
        <p className="text-sec-text py-2">Log in to your account to continue.</p>
        <div className="py-2"><EntryBoxComponent value={setemail} title="Email" type="text" /></div>
        <div className="py-2"><EntryBoxComponent value={setPassword} title="Password" type="password" /></div>
        <p className="flex justify-end font-medium hover:cursor-pointer">Forget Password ?</p>
        {(loading === false) ? <CustomButton onTap={() => {
            onClickSignin()
        }} title="Sign in" /> : <div className="w-[100%] flex justify-center items-center">
            <LoadingButton size="w-[100%]" />
        </div>}
        <div className="flex justify-center">
            <p>Don't have account? </p>
            <p className="font-semibold px-1 hover:cursor-pointer" onClick={() => { navigate('/auth/signup') }}>
                Create Account
            </p>
        </div>
        <CustomSnackbar message={errorMessage} open={open} openState={setOpen} />
    </div>
}
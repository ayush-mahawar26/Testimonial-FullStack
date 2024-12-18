import { SignInLeft } from "../../components/authcomponent/SigninLeft";
import { SigninRight } from "../../components/authcomponent/SigninRight";

export function SigninPage() {
  return (
    <div className="h-screen flex">
      <div className="w-[50%] flex items-center justify-center">
        <SignInLeft />
      </div>
      <div className="w-[50%]">
        <SigninRight />
      </div>
    </div>
  );
}

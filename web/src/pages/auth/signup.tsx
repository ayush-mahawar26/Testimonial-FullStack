import { SignUpLeft } from "../../components/authcomponent/SignupLeft";
import { SignUpRight } from "../../components/authcomponent/SignupRight";

export function SignUpPage() {
  return (
    <div className="h-screen flex">
      <div className="w-[50%] flex items-center justify-center">
        <SignUpLeft />
      </div>
      <div className="w-[50%]">
        <SignUpRight />
      </div>
    </div>
  );
}

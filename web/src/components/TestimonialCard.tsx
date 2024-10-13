import { FaRegStar } from "react-icons/fa6";
import { baseurl } from "../webconst";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { testimonialAtom } from "../atoms/testimonialatom";
import { formatDate } from "../utils/dateformat";

export function TestimonialCard({ testimonial }: { testimonial: any }) {
  // async function likeTheTestimonial() {
  //   const id = testimonial["id"];
  //   const url = baseurl + `/testimonials/${id}`;

  //   const updatedTestimonial = await axios.put(
  //     url,
  //     {},
  //     {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     }
  //   );

  //   if (!updatedTestimonial) {
  //     return;
  //   }
  // }

  return (
    <div className="w-[100%]  mx-5 p-4 rounded-xl bg-black-bg text-slate-200 m-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-slate-100 rounded-full bg-slate-600 px-1 w-11 h-11 flex items-center justify-center">
            <p className="p-2">
              {testimonial["authorname"].toUpperCase().substring(0, 2)}
            </p>
          </div>
          <div>
            <p className="px-2 font-semibold">{testimonial["authorname"]}</p>
            <p className="px-2 text-sm text-slate-400 font-medium">
              {testimonial["email"]}
            </p>
          </div>
        </div>
        <div className="hover:cursor-pointer">
          <FaRegStar />
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold pt-5">{testimonial["title"]}</p>
        <p className="text-lg font-semibold">{testimonial["description"]}</p>
      </div>

      <div className="flex pt-5">
        <p className="font-semibold">created at : </p>
        <p className="">{formatDate(testimonial["createdAt"])}</p>
      </div>
    </div>
  );
}

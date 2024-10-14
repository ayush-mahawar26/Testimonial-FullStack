import { useParams } from "react-router";
import { TestimonialCard } from "./TestimonialCard";
import { baseurl } from "../webconst";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { loadingatom, messageAtom, openAtom } from "../atoms/utilatoms";
import { CustomSnackbar } from "./Snackbar";
import { testimonialAtom } from "../atoms/testimonialatom";
import { TestimonialShimmer } from "./TeatimonialShimmer";

export function ProjectRight() {
  const param = useParams();

  const [testimomial, settestimonial] = useRecoilState(testimonialAtom);
  const [loading, setLoading] = useRecoilState(loadingatom);
  const [message, setMessage] = useRecoilState(messageAtom);
  const [open, setOpen] = useRecoilState(openAtom);

  async function getTestimonialByProjectId() {
    setLoading(true);
    const id = param["id"];

    axios
      .get(baseurl + `/testimonials/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.statusCode > 200) {
          setMessage(res.data.message);
          setOpen(true);
          return;
        }

        settestimonial(res.data.data.testimonials);
      })
      .catch((e: Error) => {
        setMessage(e.message);
        setOpen(true);
        return;
      });

    setLoading(false);
  }

  useEffect(() => {
    getTestimonialByProjectId();
  }, []);
  return loading ? (
    <TestimonialShimmer />
  ) : (
    <div className="w-[70%]">
      {testimomial.map((testimomial) => {
        return <TestimonialCard testimonial={testimomial} />;
      })}
      <CustomSnackbar open={open} openState={setOpen} message={message} />
    </div>
  );
}

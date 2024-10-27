import { useParams } from "react-router-dom";
import { baseurl } from "./webconst";
import axios from "axios";
import { useEffect, useState } from "react";
import { CardComponent } from "./component/CardComponent";

export function TestPage() {
  const param = useParams();

  const projectId = param["id"];
  const [testimonials, setTestimonials] = useState([]);
  console.log(projectId);

  async function getTestimonialByProjectId() {
    console.log("start");

    const url = baseurl + `/${projectId}`;
    console.log(url);

    const res = await axios.get(url);
    console.log(res);

    if (res.status > 200) {
      return;
    }

    console.log(res.data.data.testimonials);
    setTestimonials(res.data.data.testimonials);
  }

  useEffect(() => {
    getTestimonialByProjectId();
  }, []);
  return (
    <div className="flex w-[100%]">
      {testimonials.map((testimonial) => {
        return <CardComponent testimonial={testimonial} />;
      })}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseurl } from "./webconst";
import axios from "axios";
import { CardComponent } from "./component/CardComponent";

export function BasePage() {
  const param = useParams();

  const projectId = param["id"];
  const [testimonials, setTestimonials] = useState([]);

  async function getTestimonialByProjectId() {
    const url = baseurl + `/testimonials/${projectId}`;

    const res = await axios.get(url);

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
    <div className="flex mx-2 justify-center">
      {testimonials.map((testimonial) => {
        return <CardComponent testimonial={testimonial} />;
      })}
    </div>
  );
}

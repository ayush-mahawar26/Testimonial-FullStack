import { useParams } from "react-router";
import { baseurl } from "../webconst";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function GetReview() {
  const { id } = useParams();

  const [testimonials, setTestimonials] = useState([]);

  async function getTestimonialByProjectId() {
    console.log("start");

    try {
      const url = baseurl + `/testimonials/${id}`;
      console.log(url);

      const res = await axios.get(url);
      console.log(res);

      if (res.status > 200) {
        return;
      }

      console.log(res.data.data.testimonials);
      setTestimonials(res.data.data.testimonials);
    } catch (error) {
      console.log(error);

      return;
    }
  }

  useEffect(() => {
    getTestimonialByProjectId();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: testimonials.length >= 3 ? 3 : testimonials.length,
    slidesToScroll: 1,
  };
  return (
    <div className="w-3/4 m-auto mt-20">
      <Slider {...settings}>
        {testimonials.map((e) => {
          return <CardComponent testimonial={e} />;
        })}
      </Slider>
    </div>
  );
}

export function CardComponent({ testimonial }: { testimonial: any }) {
  return (
    <div className="text-slate-300 p-5 bg-slate-900 m-2 rounded-lg h-[100%]">
      <div className="flex">
        <Avatar name={testimonial["authorname"]} />
        <div className="px-2 text-wrap flex flex-col items-start">
          <p className="font-semibold text-xl">{testimonial["authorname"]}</p>
          <p className="">{testimonial["email"]}</p>
        </div>
      </div>
      <div className="py-4 flex flex-col items-start">
        <p className="text-2xl font-semibold">{testimonial["title"]}</p>
        <p className="text-lg text-slate-400">{testimonial["description"]}</p>
      </div>
    </div>
  );
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className="text-slate-100 rounded-full bg-slate-600 px-4 flex items-center justify-center">
      <p className="">{name.substring(0, 2).toUpperCase()}</p>
    </div>
  );
}

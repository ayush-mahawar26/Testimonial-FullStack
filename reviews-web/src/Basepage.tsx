import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function BasePage() {
  const nav = useNavigate();

  useEffect(() => {
    nav("/test");
  });

  return (
    <div className="flex mx-2 justify-center">
      {/* {testimonials.map((e) => {
        return <CardComponent testimonial={e} />;
      })} */}
      first page
    </div>
  );
}

import { Avatar } from "./Avatar";

export function CardComponent({ testimonial }: { testimonial: any }) {
  return (
    <div className="text-slate-300 p-5 bg-slate-900 m-2 rounded-lg text-wrap">
      <div className="flex">
        <Avatar name={testimonial["authorname"]} />
        <div className="px-2 text-wrap">
          <p className="font-semibold text-xl">{testimonial["authorname"]}</p>
          <p className="">{testimonial["email"]}</p>
        </div>
      </div>
      <div className="py-4">
        <p className="text-2xl font-semibold">{testimonial["title"]}</p>
        <p className="text-lg text-slate-400">{testimonial["description"]}</p>
      </div>
    </div>
  );
}

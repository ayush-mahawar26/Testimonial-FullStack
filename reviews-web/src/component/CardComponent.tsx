export function CardComponent({ testimonial }: { testimonial: any }) {
  return (
    <div className="text-slate-300 p-5 bg-slate-900 m-2 rounded-lg text-wrap w-[33%]">
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

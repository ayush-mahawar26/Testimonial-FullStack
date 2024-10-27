import { useParams } from "react-router-dom";

export function BasePage() {
  const param = useParams();

  const projectId = param["id"];
  // const [testimonials, setTestimonials] = useState([]);
  console.log(projectId);

  // async function getTestimonialByProjectId() {
  //   console.log("start");

  //   const url = baseurl + `/${projectId}`;
  //   console.log(url);

  //   const res = await axios.get(url);
  //   console.log(res);

  //   if (res.status > 200) {
  //     return;
  //   }

  //   console.log(res.data.data.testimonials);
  //   setTestimonials(res.data.data.testimonials);
  // }

  // useEffect(() => {
  //   getTestimonialByProjectId();
  // }, []);

  return (
    <div className="flex mx-2 justify-center">
      {/* {testimonials.map((e) => {
        return <CardComponent testimonial={e} />;
      })} */}
      hello
    </div>
  );
}

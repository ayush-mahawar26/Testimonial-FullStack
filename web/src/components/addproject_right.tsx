import { BasicComponent } from "./BasicComponent";

export function AddProjectRight() {
  // const [index, setIndex] = useState(0)

  // const barTitle = ["Basic", "ThankYou Page"];

  return (
    <div className="w-[60%]">
      {/* <div className="flex justify-center">
            {
                barTitle.map((title) => {
                    return <TopBarTitle title={title} selected={(barTitle[index] === title) ? true : false} onClick={() => {
                        setIndex(barTitle.indexOf(title))
                    }} />
                })
            }
        </div>
        {
            (index == 0) ? <BasicComponent /> : <ThankyouPage />
        } */}
      <BasicComponent />
    </div>
  );
}

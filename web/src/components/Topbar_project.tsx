
export function TopBarTitle({ title, selected, onClick }: { title: string, selected: boolean, onClick: Function }) {
    return <div onClick={
        () => onClick()
    } className={`p-2 mx-1 rounded-lg border-solid border-2 hover:cursor-pointer ${(selected) ? "bg-slate-500 text-white" : ""}`}>
        {title}
    </div >
}
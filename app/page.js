import Link from "next/link";
import Notelist from "./component/Notelist";

export default function Home() {
  return (
    <div className="h-screen w-full bg-[#A5C9CA] p-10 max-w-[1000px] mx-auto">
      <h1 className="text-center text-3xl underline ">Todo Application</h1>
      <div className="flex items-center justify-between py-1 mt-[20px]">
        <span>Todo List</span>
        <Link href={"/form"} className=" bg-[#EDF6E5] px-3 rounded capitalize py-1 font-semibold">
          add
        </Link>
      </div>
      <Notelist />
    </div>
  );
}

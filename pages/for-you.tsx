import Selected from "@/components/Selected";
import Sidebar from "@/components/Sidebar";

export default function Foryou() {
    return (
        <div className="relative flex flex-col ml-[200px] w-[90%]">
            <Sidebar />
            {/* SearchBar (last) */}
            <div className="max-w-[1070px] w-full px-6 mx-auto">
                <div className="py-6 w-full">
                    <Selected />
                    {/* Recommended */}
                    {/* Suggested */}
                </div>
            </div>
        </div>
    )
}
import Recommended from "@/components/Recommended";
import Selected from "@/components/Selected";
import Sidebar from "@/components/Sidebar";
import Suggested from "@/components/Suggested";

export default function Foryou() {
    return (
        <div className="relative flex flex-col md:ml-[200px]">
            <Sidebar />
            {/* SearchBar (last) */}
            <div className="max-w-[1070px] w-full px-6 mx-auto">
                <div className="py-6 w-full">
                    <Selected />
                    <Recommended />
                    <Suggested />
                </div>
            </div>
        </div>
    )
}
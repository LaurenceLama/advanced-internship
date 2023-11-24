import Recommended from "@/components/Recommended";
import SearchBar from "@/components/SearchBar";
import Selected from "@/components/Selected";
import Sidebar from "@/components/Sidebar";
import Suggested from "@/components/Suggested";
import SideBarModal from "@/components/modal/SideBarModal";

export default function Foryou() {
    return (
      <div className="relative flex flex-col md:ml-[200px]">
        <Sidebar />
        <SearchBar />
        <SideBarModal />
        <div className="max-w-[1100px] w-full px-6 mx-auto">
          <div className="py-6 w-full">
            <Selected />
            <Recommended />
            <Suggested />
          </div>
        </div>
      </div>
    );
}
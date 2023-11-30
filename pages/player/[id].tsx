import { BookObject } from "@/bookObject";
import Audio from "@/components/Audio";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import SidebarModal from "@/components/modal/SidebarModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Id() {
  const [summ, setSumm] = useState<BookObject>();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        const { data } = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        setSumm(data);
      };
      fetchBook();
    }
  }, [id]);

  return (
    <div className="relative flex flex-col md:ml-[200px]">
      <SearchBar />
      <Sidebar route={0} />
      <SidebarModal route={0} />
      <div
        className="relative w-full overflow-y-auto
          summary__custom-width"
      >
        <audio src={summ?.audioLink}></audio>
        <div className="p-6 max-w-[800px] mx-auto whitespace-pre-line">
          <div
            className="text-[#032b41] md:text-2xl text-xl border-b border-[#e1e7ea]
            mb-8 pb-4 leading-normal"
          >
            <b>{summ?.title}</b>
          </div>

          <div className="leading-[1.4] whitespace-pre-line text-[#032b41]">
            {summ?.summary}
          </div>
        </div>
        <Audio />
      </div>
    </div>
  );
}

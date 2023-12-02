import { BookObject } from "@/bookObject";
import Audio from "@/components/Audio";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import SidebarModal from "@/components/modal/SidebarModal";
import Skeleton from "@/components/ui/Skeleton";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

export default function Id() {
  const [summ, setSumm] = useState<BookObject>();
  const [skelLoad, setSkelLoad] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setSkelLoad(true);
    if (id) {
      setTimeout(() => {
        const fetchBook = async () => {
          const { data } = await axios.get(
            `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
          );
          setSumm(data);
        };
        fetchBook();
        setSkelLoad(false);
      }, 1000);
    }
  }, [id]);

  return (
    <div className="relative flex flex-col md:ml-[200px]">
      <SearchBar />
      <Sidebar route={0} />
      <SidebarModal route={0} />

      {!skelLoad ? (
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
      ) : (
        <>
          <div className="flex items-center justify-center h-[83vh]">
            <div className="spinLoad">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div
              className="fixed w-full h-20 mt-auto flex items-center justify-between 
            bg-[#042330] px-10 bottom-0 left-0 z-[998] track--wrapper max-[768px]:h-[180px]
            max-[768px]:py-4 max-[768px]:px-6 max-[768px]:flex-col"
            >
              <div className="flex gap-3">
                <figure className="flex max-w-[48px]">
                  <figure className="h-12 w-12 min-w-[48px]">
                    <Skeleton width={50} height={55} />
                  </figure>
                </figure>

                <div className="text-white flex flex-col justify-center gap-1 text-sm">
                  <Skeleton width={100} height={14} />
                  <Skeleton width={80} height={10} />
                </div>
              </div>

              <div className="audio__controls">
                <div className="flex items-center justify-center gap-6">
                  <button
                    className="cursor-pointer rounded-[50%] flex 
                      items-center justify-center"
                  >
                    <TbRewindBackward10 size={28} color="white" />
                  </button>

                  <button
                    className="bg-white cursor-pointer rounded-[50%] w-10 h-10 
                      flex items-center justify-center"
                  >
                    <IoPlaySharp size={28} className="ml-1" />
                  </button>

                  <button
                    className="cursor-pointer rounded-[50%] flex 
                      items-center justify-center"
                  >
                    <TbRewindForward10 size={28} color="white" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-white">00:00</div>
                <input
                  type="range"
                  className="rounded-lg h-1 max-w-[300px] w-full cursor-pointer"
                />
                <div className="text-sm text-white">00:00</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

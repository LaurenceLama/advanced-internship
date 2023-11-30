import { BookObject } from "@/bookObject";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import Skeleton from "./ui/Skeleton";

export default function Selected() {
  const [skelLoad, setSkelLoad] = useState<boolean>(false);
  const [selected, setSelected] = useState<BookObject>();
  const [duration, setDuration] = useState(0);

  const router = useRouter();

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes} mins ${formatSeconds} sec`;
    }
    return "00:00";
  };

  async function fetchData() {
    setSkelLoad(true);
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    const data = await response.json();
    const selectedData = data[0];
    setSelected(selectedData);
    setSkelLoad(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const audio = new Audio(selected?.audioLink);
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
  }, [selected]);

  return (
    <>
      <div className="text-[22px] font-bold text-[#032b41] mb-4">
        Selected just for you
      </div>
      {!skelLoad ? (
        <a
          className="flex justify-between max-[1200px]:w-full selected__custom-width bg-[#fbefd6] rounded 
      p-6 mb-6 gap-6 max-md:flex-col cursor-pointer"
          onClick={() => router.push(`./book/${selected?.id}`)}
        >
          <div className="max-md:w-full text-[#032b41] w-2/5">
            {selected?.subTitle}
          </div>

          <div className="hidden md:inline w-px bg-[#bac8ce]" />

          <div className="flex gap-4 md:w-3/5">
            <figure className="h-[140px] w-[140px] min-w-[140px]">
              <img src={selected?.imageLink} className="block w-full h-full" />
            </figure>

            <div className="w-full">
              <div className="font-semibold text-[#032b41] mb-2">
                {selected?.title}
              </div>

              <div className="text-sm text-[#032b41] mb-4">
                {selected?.author}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center w-10 h-10 min-w-[40px] selected__audio-icon">
                  <BsPlayFill size={40} />
                </div>

                <div className="text-sm font-medium text-[#032b41]">
                  {formatTime(duration)}
                </div>
              </div>
            </div>
          </div>
        </a>
      ) : (
        <>
          <Skeleton width="70%" height={180} />
        </>
      )}
    </>
  );
}

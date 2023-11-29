import { BookObject } from "@/bookObject";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

const formatTime = (time: number) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return "00:00";
};
export default function SearchBook({
  id,
  title,
  author,
  audioLink,
  imageLink,
}: BookObject) {
  const router = useRouter();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio(audioLink);
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
  }, []);

  return (
    <div>
      <a
        className={`flex items-center cursor-pointer p-4 gap-6 h-[120px] border-[#e1e7ea]
        hover:bg-[#f1f6f4] ${id.length === 1 && `border-b`}`}
        onClick={() => router.push(`/book/${id}`)}
      >
        <figure className="h-20 w-20 min-w-[80px]">
          <img className="w-full h-full" src={imageLink} alt="book" />
        </figure>
        <div>
          <div className="text-base font-medium text-[#032b41] mb-2">
            {title}
          </div>
          <div className="text-xs font-light text-[#6b757b] mb-2">{author}</div>

          <div className="search__book--duration">
            <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
              <div className="flex w-4 h-4 image--full">
                <AiOutlineClockCircle />
              </div>
              <div className="recommended__book--details-text">
                {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

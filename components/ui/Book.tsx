import { BookObject } from "@/bookObject";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


export default function Book({
  id,
  title,
  author,
  audioLink,
  subTitle,
  averageRating,
  imageLink,
  subscriptionRequired,
}: BookObject) {
  const user = useSelector((state: any) => state.user);
  const [duration, setDuration] = useState(0);

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

  useEffect(() => {
    const audio = new Audio(audioLink);
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
  }, []);

  return (
    <a
      href={`/book/${id}`}
      className="relative snap-start p-3 pt-8 no-underline rounded 
    max-w-[200px] w-full hover:bg-[#f1f6f4]"
    >
      {subscriptionRequired && !user.premium && (
        <div
          className="absolute top-0 right-0 bg-[#032b41] text-white text-[10px]
       w-fit h-[18px] px-2 flex items-center rounded-[20px]"
        >
          Premium
        </div>
      )}

      <figure className="mb-2 h-[172px] w-[172px]">
        <img className="block w-full h-full" src={imageLink} alt="book image" />
      </figure>

      <div className="text-[#032b41] mb-2 font-bold text-base">{title}</div>
      <div className="text-[#6b757b] font-light mb-2 text-sm">{author}</div>
      <div className="text-[#394547] mb-2 text-sm">{subTitle}</div>

      <div className="flex gap-2">
        <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
          <div className="flex w-4 h-4 image--full">
            <AiOutlineClockCircle />
          </div>
          <div>{formatTime(duration)}</div>
        </div>

        <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
          <div className="flex w-4 h-4 image--full">
            <AiOutlineStar />
          </div>

          <div>{`${averageRating}`}</div>
        </div>
      </div>
    </a>
  );
}

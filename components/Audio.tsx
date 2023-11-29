import { BookObject } from "@/bookObject";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

export default function Audio() {
  const [data, setData] = useState<BookObject>();
  const [playing, setPlaying] = useState<Boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const [timePlayed, setTimePlayed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const audioRef: any = useRef();
  const progressBarRef: any = useRef();
  const playAnimationRef: any = useRef();

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

  const repeat: any = useCallback(() => {
    const currentTime: any = audioRef?.current?.currentTime;
    if (currentTime !== undefined) {
      setTimePlayed(currentTime);
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / timeLeft) * 100}%`
      );
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, []);

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [playing, audioRef, repeat]);

  const togglePlayPause = () => {
    setPlaying((prev) => !prev);
  };


  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setTimeLeft(seconds);
    progressBarRef.current.max = seconds;
  };

  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  useEffect(() => {
    if (id) {
      const fetchAudio = async () => {
        const { data } = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        setData(data);
      };
      fetchAudio();
    }
  }, [id]);

  return (
    <div
      className="fixed w-full h-20 mt-auto flex items-center justify-between 
        bg-[#042330] px-10 bottom-0 left-0 z-[9998] track--wrapper"
    >
      <audio src={data?.audioLink} />

      <div className="flex gap-3">
        <figure className="flex max-w-[48px]">
          <figure className="h-12 w-12 min-w-[48px]">
            <img
              src={data?.imageLink}
              className="w-full h-full"
              alt="book image"
            />
          </figure>
        </figure>

        <div className="text-white flex flex-col justify-center gap-1 text-sm">
          <div>{data?.title}</div>
          <div className="text-[#bac8ce]">{data?.author}</div>
        </div>
      </div>

      <div className="play/pause skip/rewind buttons">
        <div className="flex items-center justify-center gap-6">
          <button
            className="cursor-pointer rounded-[50%] flex 
          items-center justify-center"
            onClick={skipBackward}
          >
            <TbRewindBackward10 size={28} color="white" />
          </button>

          <button
            className="bg-white cursor-pointer rounded-[50%] w-10 h-10 
          flex items-center justify-center"
            onClick={togglePlayPause}
          >
            {playing ? (
              <IoPauseSharp size={28} />
            ) : (
              <IoPlaySharp size={28} className="ml-1" />
            )}
          </button>

          <button
            className="cursor-pointer rounded-[50%] flex 
          items-center justify-center"
            onClick={skipForward}
          >
            <TbRewindForward10 size={28} color="white" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-white">{formatTime(timePlayed)}</div>

        <input
          type="range"
          ref={progressBarRef}
          onChange={handleProgressChange}
          className="rounded-lg h-1 max-w-[300px] w-full cursor-pointer"
        />
        <audio
          src={data?.audioLink}
          ref={audioRef}
          className="rounded-lg h-1 max-w-[300px] w-full cursor-pointer"
          onLoadedMetadata={onLoadedMetadata}
        ></audio>

        <div className="text-sm text-white">{formatTime(timeLeft)}</div>
      </div>
    </div>
  );
}

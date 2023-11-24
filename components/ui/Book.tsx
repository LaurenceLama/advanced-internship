import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: Number;
  averageRating: Number;
  keyIdeas: Number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}
export default function Book({
  id,
  title,
  author,
  subTitle,
  averageRating,
  imageLink,
  subscriptionRequired,
}: Book) {
  return (
    <a
      href="for-you"
      className="relative snap-start p-3 pt-8 no-underline rounded 
    max-w-[200px] w-full hover:bg-[#f1f6f4]"
    >
      {/* Some books need premium */}
      <div
        className="absolute top-0 right-0 bg-[#032b41] text-white text-[10px]
       w-fit h-[18px] px-2 flex items-center rounded-[20px]"
      >
        Premium
      </div>
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
          <div>mejo long</div>
        </div>

        <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
          <div className="flex w-4 h-4 image--full">
            <AiOutlineStar />
          </div>

          {/* this how to display number into strings so no error */}
          <div>{`${averageRating}`}</div>
        </div>
      </div>
    </a>
  );
}

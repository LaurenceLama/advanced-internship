import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiX } from "react-icons/fi";

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

export default function SearchBar() {
  const [input, setInput] = useState<any>("");

  function handleDelete() {
    if (input.length !== 0) {
      setInput("");
    }
  }

  return (
    <div className="border-b h-20 z-10 border-[#e1e7ea]">
      <div
        className="relative flex items-center justify-between px-8 max-w-[1100px] 
            mx-auto h-full"
      >
        <figure>
          <img src="logo" alt="" />
        </figure>

        <div className="flex items-center gap-6 max-w-[340px] w-full">
          <div className="flex items-center w-full">
            <div className="relative gap-2 flex items-center w-full">
              <input
                value={input}
                type="text"
                placeholder="Search for books"
                onChange={(e) => setInput(e.target.value)}
                className="h-10 w-full p-4 outline-none bg-[#f1f6f4]
                text-[#042330] border-2 border-[#e1e7ea] rounded-lg"
              />
              <div
                className="flex items-center absolute h-full right-2 justify-end 
                border-l-2 border-[#e1e7ea] pl-2 icon--scaled"
                onClick={handleDelete}
              >
                {input.length ? <FiX /> : <BiSearch />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

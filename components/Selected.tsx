import { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";

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

export default function Selected() {
  const [skelLoad, setSkelLoad] = useState()
  const [selected, setSelected] = useState<Book>()

  async function fetchData() {
    const response  = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    const data = await response.json()
    const selected = data[0]
    setSelected(selected)
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <>
      <div className="text-[22px] font-bold text-[#032b41] mb-4">
        Selected just for you
      </div>
      <a
        className="flex justify-between max-[1200px]:w-full selected__custom-width bg-[#fbefd6] rounded 
      p-6 mb-6 gap-6 max-md:flex-col"
      >
        <div className="max-md:w-full text-[#032b41] w-2/5">{selected?.subTitle}</div>

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

              {/* need function for this duration thing */}
              <div className="text-sm font-medium text-[#032b41]">
                1 min 43 hrs
              </div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

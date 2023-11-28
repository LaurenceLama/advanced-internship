import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import AuthModal from "@/components/modal/AuthModal";
import { openLoginModal } from "@/redux/modalSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import { BiBulb } from "react-icons/bi";
import { BsBookmark, BsMic } from "react-icons/bs";
import { VscBook } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

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

export default function Id() {
  const [book, setBook] = useState<Book>();

  const router = useRouter();
  const { id } = router.query;

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  //   host this and check if this api fetches properly
  //  so far, api fetches badly when reloading page
  async function fetchBook() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBook(data);
  }

  function handlePlay() {
    if (user.email === null) {
      dispatch(openLoginModal());
      return;
    } else {
      router.push(`/player/${id}`);
    }
  }

  useEffect(() => {
    fetchBook();
  }, [id]);

  return (
    <div className="relative flex flex-col md:ml-[200px]">
      <SearchBar />
      <Sidebar route={0} />
      <AuthModal />
      <div className="max-w-[1100px] w-full px-6 mx-auto">
        <div className="py-6 w-full">
          <div className="flex gap-4 max-[992px]:flex-col max-[992px]:gap-8">
            <div className="w-full max-[992px]:order-1">
              <div className="font-semibold text-[32px] mb-4 text-[#032b41]">
                {book?.title}
              </div>

              <div className="font-semibold text-[#032b41] mb-4">
                {book?.author}
              </div>

              <div className="text-[20px] text-[#032b41] mb-4 font-light">
                {book?.subTitle}
              </div>

              <div className="border-y border-[#e1e7ea] mb-6 py-4">
                <div className="flex flex-wrap max-w-[400px] gap-y-3">
                  <div
                    className="flex items-center w-1/2 text-[#032b41] font-medium
                   text-sm"
                  >
                    <div className="flex mr-1 image--full">
                      <AiOutlineStar size={24} />
                    </div>
                    {`${book?.averageRating} (${book?.totalRating} ratings)`}
                  </div>

                  <div
                    className="flex items-center w-1/2 text-[#032b41] font-medium
                   text-sm"
                  >
                    <div className="flex mr-1 image--full">
                      <AiOutlineClockCircle size={24} />
                    </div>
                    mejo long
                  </div>

                  <div
                    className="flex items-center w-1/2 text-[#032b41] font-medium
                   text-sm"
                  >
                    <div className="flex mr-1 image--full">
                      <BsMic size={24} />
                    </div>
                    {book?.type}
                  </div>

                  <div
                    className="flex items-center w-1/2 text-[#032b41] font-medium
                   text-sm"
                  >
                    <div className="flex mr-1 image--full">
                      <BiBulb size={24} />
                    </div>
                    {`${book?.keyIdeas} key ideas`}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <button
                  className="flex items-center justify-center w-36 h-12 bg-[#032b41] 
                text-white text-base rounded cursor-pointer gap-2 transition duration-200
                hover:opacity-80"
                  onClick={handlePlay}
                >
                  <div className="flex">
                    <VscBook size={24} />
                  </div>
                  <div className="">Read</div>
                </button>

                <button
                  className="flex items-center justify-center w-36 h-12 bg-[#032b41] 
                text-white text-base rounded cursor-pointer gap-2 transition duration-200
                hover:opacity-80"
                  onClick={handlePlay}
                >
                  <div className="flex">
                    <BsMic size={24} />
                  </div>
                  <div className="">Listen</div>
                </button>
              </div>

              <div
                className="flex items-center gap-2 text-[#0365f2] font-medium 
              cursor-pointer mb-10 text-lg hover:text-[#044298] transition duration-200"
              >
                <div className="flex">
                  <BsBookmark size={20} />
                </div>
                <div>Add title to My Library</div>
              </div>

              <div className="text-lg text-[#032b41] mb-4 font-semibold">
                What's it about?
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                {book?.tags?.map((tag, index) => (
                  <div
                    className="bg-[#f1f6f4] p-4 h-12 flex items-center 
                  cursor-not-allowed text-[#032b41] font-semibold rounded"
                    key={index}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="text-[#032b41] mb-4 leading-normal">
                {book?.bookDescription}
              </div>

              <div className="text-lg text-[#032b41] mb-4 font-semibold">
                About the author
              </div>

              <div className="text-[#032b41] leading-normal">
                {book?.authorDescription}
              </div>
            </div>

            <div className="max-[992px]:flex max-[992px]:justify-center">
              <figure className="h-[300px] w-[300px] min-w-[300px]">
                <img
                  className="w-full h-full"
                  src={book?.imageLink}
                  alt="book image"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

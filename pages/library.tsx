import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";

export default function library() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col md:ml-[200px]">
      <Sidebar route={2} />
      <SearchBar />
      <div className="max-w-[1100px] w-full px-6 mx-auto">
        <div className="py-10 w-full">
          <div className="text-[22px] font-bold text-[#032b41] mb-4">
            Saved Books
          </div>

          <div className="font-light mb-4 text-[#394547]"></div>

          <div
            className="flex flex-col items-center text-center max-w-fit gap-2 p-8
          bg-[#f1f6f4] rounded-xl mx-auto mb-14"
          >
            <div className="font-semibold text-lg text-[#042330]">
              Save your favorite books!
            </div>

            <div className="text-[#394547]">
              When you save a book, it will appear here
            </div>
          </div>

          <div className="text-[22px] font-bold text-[#032b41] mb-4">
            Finished
          </div>

          <div className="font-light mb-4 text-[#394547]"></div>

          <div
            className="flex flex-col items-center text-center max-w-fit gap-2 p-8
          bg-[#f1f6f4] rounded-xl mx-auto mb-14"
          >
            <div className="font-semibold text-lg text-[#042330]">
              Done and dusted!
            </div>

            <div className="text-[#394547]">
              When you finish a book, you can find it here later.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

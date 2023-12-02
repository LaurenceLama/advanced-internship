import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import AuthModal from "@/components/modal/AuthModal";
import SidebarModal from "@/components/modal/SidebarModal";
import { openLoginModal } from "@/redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Library() {
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.user);

  function handleSignIn() {
    dispatch(openLoginModal());
  }

  return (
    <div className="relative flex flex-col md:ml-[200px]">
      <Sidebar route={2} />
      <SidebarModal route={2} />
      <SearchBar />
      <AuthModal />
      <div className="max-w-[1100px] w-full px-6 mx-auto">
        <div className="py-10 w-full">
          {!user.email ? (
            <>
              <div className="flex flex-col items-center mx-auto max-w-[490px]">
                <img src="login.png" alt="login image" />

                <div
                  className="text-[#032b41] text-2xl font-bold text-center
                mb-4"
                >
                  Log in to your account to see your library.
                </div>

                <button
                  className="flex items-center justify-center bg-[#2bd97c] 
                text-[#032b41] h-10 rounded text-base transition duration-200 
                min-w-[180px] hover:bg-[#20ba68]"
                  onClick={handleSignIn}
                >
                  Login
                </button>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

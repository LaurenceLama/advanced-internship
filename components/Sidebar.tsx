import {
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsBookmark, BsPen } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";
import { useRouter } from "next/router";
import { auth } from "@/firebase";
import logo from "../public/logo.png";
import Image from "next/image";

interface route {
  route: number;
}

export default function Sidebar({ route }: route) {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  function handleSignOut() {
    if (user.email === null) {
      dispatch(openLoginModal());
    } else {
      auth.signOut();
      router.reload();
    }
  }

  return (
    <div
      className="hidden bg-[#f7faf9] md:inline md:w-[200px] md:min-w-[200px] fixed 
      top-0 left-0 h-screen"
    >
      <div className="flex items-center justify-center h-[60px] pt-4 max-w-[160px] mx-auto">
        <Image src={logo} className="w-full h-10" alt="logo" />
      </div>

      <div
        className={`flex flex-col justify-between pb-5 overflow-y-auto h-[93.5%] 
      ${route === 0.1 && `player__sidebar--height`}`}
      // change numbering later
      >
        <div className="flex-grow flex-shrink basis-0 mt-10">
          <a
            className="flex items-center h-14 text-[#032b41] hover:bg-[#f0efef] 
          mb-2 cursor-pointer"
            onClick={() => router.push("/for-you")}
          >
            <div
              className={`${
                route === 1 && `activeCurrentTab`
              } w-[5px] h-full mr-4`}
            />
            <div className="icon--scaled flex items-center justify-center mr-2">
              <AiOutlineHome />
            </div>
            <div>For you</div>
          </a>
          <a
            className="flex items-center h-14 text-[#032b41] hover:bg-[#f0efef] 
          mb-2 cursor-pointer"
            onClick={() => router.push("/library")}
          >
            <div
              className={`${
                route === 2 && `activeCurrentTab`
              } bg-transparent w-[5px] h-full mr-4`}
            />
            <div className="icon--scaled flex items-center justify-center mr-2">
              <BsBookmark />
            </div>
            <div>My Library</div>
          </a>
          <a className="flex items-center h-14 text-[#032b41] mb-2 cursor-not-allowed">
            <div className="bg-transparent w-[5px] h-full mr-4" />
            <div className="icon--scaled flex items-center justify-center mr-2">
              <BsPen />
            </div>
            <div>Highlights</div>
          </a>
          <a className="flex items-center h-14 text-[#032b41] mb-2 cursor-not-allowed">
            <div className="bg-transparent w-[5px] h-full mr-4" />
            <div className="icon--scaled flex items-center justify-center mr-2">
              <AiOutlineSearch />
            </div>
            <div>Search</div>
          </a>
        </div>

        <div>
          <a
            className="flex items-center h-14 text-[#032b41] mb-2 
          hover:bg-[#f0efef] cursor-pointer"
            onClick={() => router.push("/settings")}
          >
            <div
              className={`${
                route === 4 && `activeCurrentTab`
              } bg-transparent w-[5px] h-full mr-4`}
            />
            <div className="icon--scaled flex items-center justify-center mr-2">
              <AiOutlineSetting />
            </div>
            <div>Settings</div>
          </a>
          <a className="flex items-center h-14 text-[#032b41] mb-2 cursor-not-allowed">
            <div className="bg-transparent w-[5px] h-full mr-4" />
            <div className="icon--scaled flex items-center justify-center mr-2">
              <AiOutlineQuestionCircle />
            </div>
            <div>Help & Support</div>
          </a>
          <div
            className="flex items-center h-14 text-[#032b41] mb-2 cursor-pointer
           hover:bg-[#f0efef]"
            onClick={handleSignOut}
          >
            <div className="bg-transparent w-[5px] h-full mr-4" />
            <div className="icon--scaled flex items-center justify-center mr-2">
              <LuLogOut />
            </div>
            <div>{user.email ? "Logout" : "Login"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

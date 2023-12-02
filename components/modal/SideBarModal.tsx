import {
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsBookmark, BsPen } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebarModal, openLoginModal } from "@/redux/modalSlice";
import { useRouter } from "next/router";
import { auth } from "@/firebase";
import Image from "next/image";
import { Modal } from "@mui/material";

interface route {
  route: number;
}

export default function SidebarModal({ route }: route) {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  const mobileIsOpen = useSelector((state: any) => state.modal.sidebarModal);

  function handleSignOut() {
    if (user.email === null) {
      dispatch(openLoginModal());
    } else {
      auth.signOut();
      router.reload();
    }
  }

  return (
    <>
      <Modal open={mobileIsOpen} onClose={() => dispatch(closeSidebarModal())}>
        <div
          className={`w-[80%] -translate-x-full bg-white fixed top-0 left-0 h-screen z-10 outline-0
          transition-all duration-300 ${mobileIsOpen && "translate-x-0"}`}
        >
          <div className="flex items-center justify-center h-[60px] pt-4 max-w-[160px] mx-auto">
            <Image
              src={"/logo.png"}
              width={300}
              height={300}
              className="w-full h-10"
              alt="logo"
            />
          </div>

          <div
            className={`flex flex-col justify-between pb-5 overflow-y-auto h-[93.5%] 
          ${route === 0 && `player__sidebar--height`}`}
          >
            <div className="flex-grow flex-shrink basis-0 mt-10">
              <a
                className="flex items-center h-14 text-[#032b41] hover:bg-[#f0efef] 
                mb-2 cursor-pointer"
                onClick={() => {
                  router.push("/for-you");
                  dispatch(closeSidebarModal());
                }}
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
                onClick={() => {
                  router.push("/library");
                  dispatch(closeSidebarModal());
                }}
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
                onClick={() => {
                  router.push("/settings");
                  dispatch(closeSidebarModal());
                }}
              >
                <div
                  className={`${
                    route === 3 && `activeCurrentTab`
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
      </Modal>
    </>
  );
}

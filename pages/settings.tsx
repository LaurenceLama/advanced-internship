import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import AuthModal from "@/components/modal/AuthModal";
import { openLoginModal } from "@/redux/modalSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth, initFirebase } from "@/firebase";
import { getPremiumStatus } from "@/checkStatus";

export default function settings() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const router = useRouter();

  const [premium, setPremium] = useState(false);
  const app = initFirebase();

  function handleSignIn() {
    dispatch(openLoginModal());
  }

  useEffect(() => {
    const isPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setPremium(newPremiumStatus);
    };
    isPremium();
  }, [app, auth.currentUser?.uid]);

  return (
    <div className="relative flex flex-col md:ml-[200px]">
      <SearchBar />
      <Sidebar route={4} />
      <AuthModal />
      <div className="w-full py-10">
        <div className="max-w-[1070px] w-full mx-auto px-6">
          <div
            className="pb-4 border-b border-[#e1e7ea] mb-8 font-bold text-[32px]
          text-[#032b41]"
          >
            Settings
          </div>

          {!user.email ? (
            <>
              <div className="flex flex-col items-center mx-auto max-w-[490px]">
                <img src="login.png" alt="login image" />

                <div
                  className="text-[#032b41] text-2xl font-bold text-center
                mb-4"
                >
                  Log in to your account to see your details.
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
              <div
                className="flex flex-col items-start mb-8 border-b 
          border-[#e1e7ea] pb-6 gap-2"
              >
                <div className="font-bold text-lg text-[#032b41]">
                  Your Subscription plan
                </div>

                {premium ? (
                  <div className="text-[#032b41]">Premium</div>
                ) : (
                  <>
                    <div className="text-[#032b41]">Basic</div>
                    <button
                      className="flex items-center justify-center bg-[#2bd97c] 
                  text-[#032b41] h-10 rounded text-base transition duration-200 
                  min-w-[180px] hover:bg-[#20ba68]"
                      onClick={() => router.push("/choose-plan")}
                    >
                      Upgrade to Premium
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-col items-start mb-8 pb-6 gap-2">
                <div className="font-bold text-lg text-[#032b41]">Email</div>

                <div className="text-[#032b41]">{user.email}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

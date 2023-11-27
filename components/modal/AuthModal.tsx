import { closeLoginModal } from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { BiSolidUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

export default function AuthModal() {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const gAuthProvider = new GoogleAuthProvider();

  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.modal.loginModal);

  async function handleGoogleSignIn() {
    const result = await signInWithPopup(auth, gAuthProvider);
    const gUser = result.user;
    if (gUser) {
      dispatch(closeLoginModal());
    }
  }

  function handleGuestSignIn() {
    signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123")
      .then((userDetails) => {
        const currentUser = userDetails.user;
        dispatch(closeLoginModal());
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Guest login failed because of ${errorMessage}`);
      });
  }

  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userDetails) => {
        const currentUser = userDetails.user;
        dispatch(closeLoginModal());
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Sign-in failed because of ${errorMessage}`);
      });
  }

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userDetails) => {
        const currentUser = userDetails.user;
        dispatch(closeLoginModal());
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Sign-in failed because of ${errorMessage}`);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      dispatch(
        setUser({
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}

        // Instead of styling divs inside the modal, STYLE THE MODAL instead, para di matabunan yung dapat pinipindot pag nagoonclose
        className="fixed top-0 left-0 h-full flex justify-center 
          items-center flex-col w-full bg-[rgba(0,0,0,0.5)]"
      >
        <div
          className="relative max-w-[400px] bg-white rounded-lg 
            shadow-[0_0_10px_rgba(0,0,0,0.5)] w-full"
        >
          <div className="pt-12 px-8 pb-6">
            <div className="text-center font-bold text-[#032b41] text-xl mb-6">
              {signup ? "Sign up" : "Log in"} to Summarist
            </div>

            {!signup && (
              <>
                <button
                  className="relative w-full flex bg-[#3a579d] text-white 
                justify-center items-center min-w-[180px] h-10 rounded text-base transition 
                duration-200 hover:bg-[#25396b]"
                  onClick={handleGuestSignIn}
                >
                  <figure
                    className="bg-transparent flex justify-center items-center w-9 
                  h-9 absolute left-[2px] icon--scaled"
                  >
                    <BiSolidUser />
                  </figure>
                  <div>Login as a Guest</div>
                </button>

                <div className="flex items-center my-4 auth__separator">
                  <span className="mx-6 text-sm text-[#394547] font-medium">
                    or
                  </span>
                </div>
              </>
            )}

            <button
              className="relative w-full flex bg-[#4285f4] text-white 
              justify-center items-center min-w-[180px] h-10 rounded text-base transition 
              duration-200 hover:bg-[#3367d6]"
              onClick={handleGoogleSignIn}
            >
              <figure
                className="bg-transparent flex justify-center items-center w-9 
                h-9 absolute left-[2px] rounded bg-white"
              >
                <img className="h-6 w-6" src="../google.png" alt="google.png" />
              </figure>
              <div>Login with Google</div>
            </button>

            <div className="flex items-center my-4 auth__separator">
              <span className="mx-6 text-sm text-[#394547] font-medium">
                or
              </span>
            </div>

            <form className="flex flex-col gap-4" action="">
              <input
                className="h-10 border-2 border-[#bac8ce] rounded 
                  text-[#394547] p-3"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="h-10 border-2 border-[#bac8ce] rounded 
                  text-[#394547] p-3"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>

            {/* Sign in/up button only works if it is OUTSIDE THE FORM */}
            <button
              className="bg-[#2bd97c] text-#032b41] w-full h-10 rounded 
                text-base transition duration-200 hover:bg-[#20ba68] flex 
                justify-center items-center min-w-[180px] mt-4"
              onClick={signup ? handleSignUp : handleSignIn}
            >
              {signup ? "Sign up" : "Login"}
            </button>
          </div>

          <div
            className="text-center text-[#116be9] font-light text-sm 
            w-fit mx-auto mb-4 cursor-pointer hover:text-[#124a98]"
          >
            {signup ? null : "Forgot your password?"}
          </div>

          <button
            className="hover:bg-[#e1e9e8] h-10 text-center bg-[#f1f6f4]
             text-[#116be9] w-full rounded-b"
            onClick={() => setSignup(!signup)}
          >
            {signup ? "Already have an account?" : "Don't have an account?"}
          </button>

          <div
            className="absolute top-3 right-3 flex cursor-pointer transition 
            duration-200 hover:opacity-50 icon--scaled"
          >
            <FiX />
          </div>
        </div>
      </Modal>
    </>
  );
}

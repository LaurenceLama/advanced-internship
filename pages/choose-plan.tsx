import { IoDocumentTextSharp } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Accordion from "@/components/Accordion";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";
import { useRouter } from "next/navigation";
import { initFirebase } from "@/firebase";
import { getCheckoutUrl } from "@/stripePayment";

export default function Plan() {
  const [chosenPremium, setChosenPremium] = useState(0);

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const app = initFirebase();

  async function handleSubscribe() {
    if (user.email === null) {
      dispatch(openLoginModal());
      return;
    }
    if (chosenPremium === 0) {
      const priceID = "price_1OHq8jGwxhSNqxnnAsXmIdrZ";
      const getCheckoutURL = await getCheckoutUrl(app, priceID);
      router.push(getCheckoutURL);
    } else {
      const priceID = "price_1OHq98GwxhSNqxnn00ipyCjM";
      const getCheckoutURL = await getCheckoutUrl(app, priceID);
      router.push(getCheckoutURL);
    }
  }

  useEffect(() => {
    if (user.premium) {
      router.push("/for-you");
    }
  }, [user]);

  return (
    <div className="w-full ml-0">
      <div className="w-full">
        <div className="relative text-center w-full pt-12 mb-6 plan__header--wrapper">
          <div className="mx-auto text-white px-6 max-w-[1000px]">
            <div className="text-5xl font-bold mb-10">
              Get unlimited access to many amazing books to read
            </div>

            <div className="mb-8 text-xl">
              Turn ordinary moments into amazing learning opportunities
            </div>

            <figure
              className="flex justify-center max-w-[340px] mx-auto overflow-hidden
               rounded-t-[180px] text-transparent"
            >
              <img
                src="pricing-top.png"
                className="w-full h-full"
                alt="pricing image"
              />
            </figure>
          </div>
        </div>

        <div className="mx-auto max-w-[1070px] px-6 w-full">
          <div className="py-10 w-full">
            <div
              className="flex justify-center text-center gap-6 max-w-[800px] 
                mx-auto mb-14"
            >
              <div>
                <figure className="flex justify-center text-[#032b41] mb-3">
                  <IoDocumentTextSharp size={60} />
                </figure>

                <div className="leading-normal text-[#394547]">
                  <b>Key ideas in few min</b> with many books to read
                </div>
              </div>

              <div>
                <figure className="flex justify-center text-[#032b41] mb-3">
                  <RiPlantFill size={60} />
                </figure>

                <div className="leading-normal text-[#394547]">
                  <b>3 million</b> people growing with Summarist everyday
                </div>
              </div>

              <div>
                <figure className="flex justify-center text-[#032b41] mb-3">
                  <FaHandshake size={60} />
                </figure>

                <div className="leading-normal text-[#394547]">
                  <b>Precise recommendations</b> collections curated by experts
                </div>
              </div>
            </div>

            <div
              className="text-[#032b41] text-[32px] text-center font-bold
              mb-6"
            >
              Choose the plan that fits you
            </div>

            <div
              className={
                chosenPremium === 0 ? "activeChosenPremium" : "chosenPremium"
              }
              onClick={() => setChosenPremium(0)}
            >
              <div
                className="relative flex items-center justify-center 
                rounded-[50%] border-2 border-[black] w-6 h-6"
              >
                {chosenPremium === 0 && (
                  <div className="absolute w-[6px] h-[6px] bg-black rounded-[50%]" />
                )}
              </div>

              <div className="premium-plus">
                <div className="text-[#032b41] text-lg font-semibold mb-2">
                  Premium Plus Yearly
                </div>

                <div className="text-[#032b41] text-2xl font-bold mb-2">
                  $99.99/year
                </div>

                <div className="text-[#6b757b] text-sm">
                  7-day free trial included
                </div>
              </div>
            </div>

            <div
              className="flex items-center text-[#6b757b] auth__separator gap-2 
              max-w-[240px] text-sm my-6 mx-auto"
            >
              <span className="mx-6 text-sm text-[#394547]">or</span>
            </div>

            <div
              className={
                chosenPremium === 1 ? "activeChosenPremium" : "chosenPremium"
              }
              onClick={() => setChosenPremium(1)}
            >
              <div
                className="relative flex items-center justify-center 
                rounded-[50%] border-2 border-[black] w-6 h-6"
              >
                {chosenPremium === 1 && (
                  <div className="absolute w-[6px] h-[6px] bg-black rounded-[50%]" />
                )}
              </div>

              <div className="premium-monthly">
                <div className="text-[#032b41] text-lg font-semibold mb-2">
                  Premium Monthly
                </div>

                <div className="text-[#032b41] text-2xl font-bold mb-2">
                  $9.99/month
                </div>

                <div className="text-[#6b757b] text-sm">No trial included</div>
              </div>
            </div>

            <div
              className="bg-[white] sticky flex flex-col items-center bottom-0 
              z-[1] py-8 gap-4"
              onClick={handleSubscribe}
            >
              <span className="w-[300px]">
                <button
                  className="bg-[#2bd97c] text-[#032b41] w-full h-10 rounded
                flex items-center justify-center text-base transition duration-200 
                hover:bg-[#20ba68] min-w-[180px]"
                >
                  <span>
                    Start your{" "}
                    {chosenPremium === 1 ? "first month" : "free 7-day trial"}
                  </span>
                </button>
              </span>

              <div className="text-xs text-[#6b757b] text-center">
                {chosenPremium === 1
                  ? "30-day money back guarantee, no questions asked."
                  : "Cancel your trial at any time before it ends, and you won’t be charged."}
              </div>
            </div>

            <Accordion />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

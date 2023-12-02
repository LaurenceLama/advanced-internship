import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export default function Accordion() {
  const [tab, setTab] = useState<Number>(0);

  function handleTabChange(index: number) {
    setTab(0);
    if (tab === index) {
      setTab(0);
    } else {
      setTab(index);
    }
  }
  return (
    <div className="faq__wrapper">
      <div className="accordion__card" onClick={() => handleTabChange(1)}>
        <div className="accordion__header">
          <div className="accordion__title">
            How does the free 7-day trial work?
          </div>
          <div
            className={
              tab === 1 ? "accordion__icon--rotate" : "accordion__icon--return"
            }
          >
            <BsChevronDown size={24} />
          </div>
        </div>
        <div className={tab !== 1 ? "collapse" : "duration-300 ease-out h-24"}>
          <div className="accordion__body">
            Begin your complimentary 7-day trial with a Summarist annual
            membership. You are under no obligation to continue your
            subscription, and you will only be billed when the trial period
            expires. With Premium access, you can learn at your own pace and as
            frequently as you desire, and you may terminate your subscription
            prior to the conclusion of the 7-day free trial.
          </div>
        </div>
      </div>

      <div className="accordion__card" onClick={() => handleTabChange(2)}>
        <div className="accordion__header">
          <div className="accordion__title">
            Can I switch subscriptions from monthly to yearly, or yearly to
            monthly?
          </div>
          <div
            className={
              tab === 2 ? "accordion__icon--rotate" : "accordion__icon--return"
            }
          >
            <BsChevronDown size={24} />
          </div>
        </div>
        <div
          className={tab !== 2 ? "collapse" : "duration-300 ease-out h-[72px]"}
        >
          <div className="accordion__body">
            While an annual plan is active, it is not feasible to switch to a
            monthly plan. However, once the current month ends, transitioning
            from a monthly plan to an annual plan is an option.
          </div>
        </div>
      </div>

      <div className="accordion__card" onClick={() => handleTabChange(3)}>
        <div className="accordion__header">
          <div className="accordion__title">
            What is included in the Premium plan?
          </div>
          <div
            className={
              tab === 3 ? "accordion__icon--rotate" : "accordion__icon--return"
            }
          >
            <BsChevronDown size={24} />
          </div>
        </div>
        <div
          className={tab !== 3 ? "collapse" : "duration-300 ease-out h-[72px]"}
        >
          <div className="accordion__body">
            Premium membership provides you with the ultimate Summarist
            experience, including unrestricted entry to many best-selling books
            high-quality audio, the ability to download titles for offline
            reading, and the option to send your reads to your Kindle.
          </div>
        </div>
      </div>

      <div className="accordion__card" onClick={() => handleTabChange(4)}>
        <div className="accordion__header">
          <div className="accordion__title">
            Can I cancel during my trial or subscription?
          </div>
          <div
            className={
              tab === 4 ? "accordion__icon--rotate" : "accordion__icon--return"
            }
          >
            <BsChevronDown size={24} />
          </div>
        </div>
        <div
          className={tab !== 4 ? "collapse" : "duration-300 ease-out h-[72px]"}
        >
          <div className="accordion__body">
            You will not be charged if you cancel your trial before its
            conclusion. While you will not have complete access to the entire
            Summarist library, you can still expand your knowledge with one
            curated book per day.
          </div>
        </div>
      </div>
    </div>
  );
}

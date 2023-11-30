import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { useEffect, useState } from "react";

export const premiumType = (app: FirebaseApp) => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  const [isLoading, setIsLoading] = useState(true);

  const [subscriptionData, setSubscriptionData] = useState({
    isActive: false,
    subscriptionName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          setIsLoading(false);
          return;
        }

        const subscriptionRef = collection(
          db,
          "customers",
          userId,
          "subscriptions"
        );
        const q = query(
          subscriptionRef,
          where("status", "in", ["trialing", "active"])
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const subscriptionDataResponse = querySnapshot.docs[0].data();
          const subscriptionName =
            subscriptionDataResponse.items[0]?.price?.product?.name || "";
          setSubscriptionData({ isActive: true, subscriptionName });
        } else {
          setSubscriptionData({ isActive: false, subscriptionName: "" });
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, db]);

  return { ...subscriptionData, isLoading };
};

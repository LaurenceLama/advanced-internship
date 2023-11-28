import Audio from "@/components/Audio";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const [summ, setSumm] = useState<Book>();

  const router = useRouter();
  const { id } = router.query;

  async function fetchSummary() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setSumm(data);
  }

  useEffect(() => {
    fetchSummary();
  }, [id]);

  return (
    <div className="relative flex flex-col md:ml-[200px]">
      <SearchBar />
      <Sidebar route={0.1} />
      <div
        className="relative w-full overflow-y-auto
          summary__custom-width"
      >
        <div className="p-6 max-w-[800px] mx-auto whitespace-pre-line">
          <div
            className="text-[#032b41] text-2xl border-b border-[#e1e7ea]
                mb-8 pb-4 leading-normal"
          >
            <b>{summ?.title}</b>
          </div>

          <div className="leading-[1.4] whitespace-pre-line text-[#032b41]">
            {summ?.summary}
          </div>
        </div>
        <Audio />
      </div>
    </div>
  );
}

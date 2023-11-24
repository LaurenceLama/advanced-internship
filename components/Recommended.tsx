import { useEffect, useState } from "react";
import Book from "./ui/Book";

// We do interfaces in typescript so that it validates the property of the fetched api data, instead of not assuring if the data is a string, boolean, or some other property (like displaying dynamic data in react)
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

export default function Recommended() {
  const [skelLoad, setSkelLoad] = useState();
  const [recom, setRecom] = useState<Book[]>([]);

  async function fetchData() {
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    const data = await response.json();
    setRecom(data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {/* I am assuming we gon map this */}
      <div>
        <div className="text-[22px] mb-4 text-[#032b41] font-bold">
          Recommended For You
        </div>
        <div className="font-light text-[#394547] mb-7">
          We think you'll like these
        </div>

        <div className="flex mb-8 gap-4">
          {recom.slice(0, 5).map((recom) => (
            // audio tag?? idk
            <Book
              audioLink={recom.audioLink}
              author={recom.author}
              averageRating={recom.averageRating}
              imageLink={recom.imageLink}
              id={recom.id}
              key={recom.id}
              keyIdeas={recom.keyIdeas}
              subscriptionRequired={recom.subscriptionRequired}
              subTitle={recom.subTitle}
              title={recom.title}
              totalRating={recom.totalRating}
              authorDescription={""}
              bookDescription={""}
              status={""}
              summary={""}
              tags={[]}
              type={""}
            />
          ))}
        </div>
      </div>
    </>
  );
}

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

export default function Suggested() {
  const [skelLoad, setSkelLoad] = useState(); // next time, i guess accompanied with animations
  const [suggested, setSuggested] = useState<Book[]>([]);

  async function fetchData() {
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );
    const data = await response.json();
    setSuggested(data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="text-[22px] mb-4 text-[#032b41] font-bold">
        Suggested Books
      </div>
      <div className="font-light text-[#394547] mb-7">Explore these books</div>

      <div className="flex mb-8 gap-4">
        {suggested.slice(0, 5).map((suggested) => (
          // audio tag?? idk
          <Book
            audioLink={suggested.audioLink}
            author={suggested.author}
            averageRating={suggested.averageRating}
            imageLink={suggested.imageLink}
            id={suggested.id}
            key={suggested.id}
            keyIdeas={suggested.keyIdeas}
            subscriptionRequired={suggested.subscriptionRequired}
            subTitle={suggested.subTitle}
            title={suggested.title}
            totalRating={suggested.totalRating}
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
  );
}

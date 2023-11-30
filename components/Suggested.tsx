import { useEffect, useState } from "react";
import Book from "./ui/Book";
import Skeleton from "./ui/Skeleton";

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
  const [skelLoad, setSkelLoad] = useState<boolean>(false);
  const [suggested, setSuggested] = useState<Book[]>([]);

  async function fetchData() {
    setSkelLoad(true);
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );
    const data = await response.json();
    setSuggested(data);
    setSkelLoad(false);
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
        {!skelLoad ? (
          suggested
            .slice(0, 5)
            .map((suggested) => (
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
            ))
        ) : (
          <>
            {new Array(5).fill(0).map((_, index) => (
              <div
                className="relative p-3 pt-8 max-w-[200px] w-full"
                key={index}
              >
                <figure className="mb-2 h-[172px] w-[172px]">
                  <Skeleton width={172} height={172} />
                </figure>

                <div className="mb-1">
                  <Skeleton width={172} height={24} />
                </div>

                <div className="mb-1">
                  <Skeleton width={172} height={14} />
                </div>

                <div className="mb-1">
                  <Skeleton width={172} height={14} />
                </div>

                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <Skeleton width={172} height={10} />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

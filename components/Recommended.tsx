import { useEffect, useState } from "react";
import Book from "./ui/Book";
import { BookObject } from "@/bookObject";
import Skeleton from "./ui/Skeleton";

export default function Recommended() {
  const [skelLoad, setSkelLoad] = useState<boolean>(false);
  const [recom, setRecom] = useState<BookObject[]>([]);

  async function fetchData() {
    setSkelLoad(true);
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    const data = await response.json();
    setRecom(data);
    setSkelLoad(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="overflow-x-auto">
      

      <div className="flex mb-8 gap-4">
        {!skelLoad ? (
          recom
            .slice(0, 5)
            .map((recom) => (
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

export default function Suggested() {
    return (
      <>
      {/* looks identical with recommended section */}
        <div>
          <div className="">title</div>
          <div className="">subtitle</div>

          <div className="books">
            <a href="somewhere">
                {/* audio tag?? idk  */}
              <figure>
                <img src="" alt="book image" />
              </figure>

              <div>book title</div>
              <div>book author</div>
              <div>book subtitle</div>

              <div>
                <div>book detail (duration) </div>
                <div>book detail (rating) </div>
              </div>
            </a>
          </div>
        </div>
      </>
    );
}
export default function Recommended() {
    return (
      <>
        {/* I am assuming we gon map this */}
        <div>
          <div className="">title</div>
          <div className="">subtitle</div>

          <div className="books">
            {/* audio tag?? idk  */}
            <a href="somewhere">
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
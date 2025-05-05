import "./SavedNewsHeader.css";

export default function SavedNewsHeader() {
  return (
    <>
      <div className="saved-news-header">
        <p className="saved-news-header__breadcrumb">Saved articles</p>
        <h2 className="saved-news-header__title">
          Elise, you have 5 saved articles
        </h2>
        <p className="saved-news-header__keywords">
          By keywords: Nature, Yellowstone, and 2 other
        </p>
      </div>
    </>
  );
}

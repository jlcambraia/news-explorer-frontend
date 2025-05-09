import "./SavedNewsHeader.css";

export default function SavedNewsHeader({ savedArticles }) {
  const keywords = [];

  savedArticles.forEach((article) => {
    if (!keywords.includes(article.source.name)) {
      keywords.push(article.source.name);
    }
  });

  function showSavedArticlesKeywords() {
    if (keywords.length === 0) {
      return null;
    }
    if (keywords.length === 1) {
      return (
        <>
          <span>By keywords: </span>{" "}
          <span className="saved-news-header__keyword">{keywords[0]}</span>
        </>
      );
    }
    if (keywords.length === 2) {
      return (
        <>
          <span>By keywords: </span>
          <span className="saved-news-header__keyword">
            {keywords[0]}, {keywords[1]}
          </span>
        </>
      );
    }
    if (keywords.length === 3) {
      return (
        <>
          <span>By keywords: </span>
          <span className="saved-news-header__keyword">
            {keywords[0]}, {keywords[1]}, {keywords[2]}
          </span>
        </>
      );
    }

    return (
      <>
        <span>By keywords: </span>
        <span className="saved-news-header__keyword">
          {keywords[0]}, {keywords[1]}, and {keywords.length - 2} other
        </span>
      </>
    );
  }

  return (
    <>
      <div className="saved-news-header">
        <p className="saved-news-header__breadcrumb">Saved articles</p>
        <h2 className="saved-news-header__title">
          Elise, you have {savedArticles.length} saved{" "}
          {keywords.length === 1 ? "article" : "articles"}
        </h2>
        <p className="saved-news-header__keywords">
          {showSavedArticlesKeywords()}
        </p>
      </div>
    </>
  );
}

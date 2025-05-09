import "./SavedNewsHeader.css";
import {
  extractUniqueKeywords,
  formatKeywordsList,
} from "../../../../utils/validators/keywords";

export default function SavedNewsHeader({ savedArticles }) {
  const keywords = extractUniqueKeywords(savedArticles);

  return (
    <div className="saved-news-header">
      <p className="saved-news-header__breadcrumb">Saved articles</p>
      <h2 className="saved-news-header__title">
        Elise, you have {savedArticles.length} saved{" "}
        {keywords.length === 1 ? "article" : "articles"}
      </h2>
      <p className="saved-news-header__keywords">
        {keywords.length > 0 && (
          <>
            <span>By keywords: </span>
            <span className="saved-news-header__keyword">
              {formatKeywordsList(keywords)}
            </span>
          </>
        )}
      </p>
    </div>
  );
}

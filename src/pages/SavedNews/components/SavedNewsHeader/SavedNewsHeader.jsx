import "./SavedNewsHeader.css";
import {
  extractUniqueKeywords,
  formatKeywordsList,
} from "../../../../utils/validators/keywords";

export default function SavedNewsHeader({ savedArticles }) {
  const keywords = extractUniqueKeywords(savedArticles);

  return (
    <div className="saved-news-header">
      <p className="saved-news-header__breadcrumb">Artigos salvos</p>
      <h2 className="saved-news-header__title">
        Elise, você tem {savedArticles.length}
        {keywords.length === 1 ? " artigo " : " artigos "}
        {keywords.length === 1 ? "salvo" : "salvos"}
      </h2>
      <p className="saved-news-header__keywords">
        {keywords.length > 0 && (
          <>
            <span>Por palavras-chave: </span>
            <span className="saved-news-header__keyword">
              {formatKeywordsList(keywords)}
            </span>
          </>
        )}
      </p>
    </div>
  );
}

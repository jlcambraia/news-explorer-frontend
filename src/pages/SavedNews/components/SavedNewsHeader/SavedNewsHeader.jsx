import "./SavedNewsHeader.css";
import {
  extractUniqueKeywords,
  formatKeywordsList,
} from "../../../../utils/validators/keywords";
import { useContext } from "react";
import { SearchArticlesContext } from "../../../../contexts/SearchArticlesContext";
import { UserContext } from "../../../../contexts/UserContext";

export default function SavedNewsHeader() {
  const { savedArticles } = useContext(SearchArticlesContext);
  const username = useContext(UserContext);

  const keywords = extractUniqueKeywords(savedArticles);

  return (
    <div className="saved-news-header">
      <p className="saved-news-header__breadcrumb">Artigos salvos</p>
      <h2 className="saved-news-header__title">
        {username}, você tem {savedArticles.length}
        {savedArticles.length === 1 ? " artigo " : " artigos "}
        {savedArticles.length === 1 ? "salvo" : "salvos"}
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

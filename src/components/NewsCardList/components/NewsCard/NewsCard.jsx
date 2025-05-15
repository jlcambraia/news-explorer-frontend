import "./NewsCard.css";

import { useState, useContext, useEffect } from "react";
import { CurrentPathContext } from "../../../../contexts/CurrentPathContext";
import { SearchArticlesContext } from "../../../../contexts/SearchArticlesContext";
import { formatArticleDate } from "../../../../utils/validators/formatDate";

import Confirmation from "../../../modals/Confirmation";

export default function NewsCard({
  article,
  isUserLoggedIn,
  handleOpenPopup,
  handleSaveArticle,
  handleRemoveArticle,
}) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isArticleSaved, setIsArticleSaved] = useState(false);
  const atHomepage = useContext(CurrentPathContext);

  const { savedArticles } = useContext(SearchArticlesContext);

  const formattedDate = formatArticleDate(article.publishedAt);

  function handleButtonOnMouseEnter() {
    setIsButtonHovered(true);
  }

  function handleButtonOnMouseLeave() {
    setIsButtonHovered(false);
  }

  function handleSaveArticleOnClick() {
    handleSaveArticle(article);
  }

  // Popup de confirmação de remoção do card
  const removeConfirmationPopup = {
    title: "Quer remover este artigo?",
    children: (
      <Confirmation
        handleRemoveArticle={handleRemoveArticle}
        article={article}
      />
    ),
  };

  useEffect(() => {
    const alreadySaved = savedArticles.some((a) => a.url === article.url);
    setIsArticleSaved(alreadySaved);
  }, [savedArticles, article.url]);

  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img
          className="news-card__image"
          src={article.urlToImage || "https://loremflickr.com/400/272"}
          alt={`Imagem do artigo de ${article.author}`}
        />
        {atHomepage ? (
          isUserLoggedIn ? (
            <button
              onClick={handleSaveArticleOnClick}
              className={
                isArticleSaved
                  ? "news-card__image-button news-card__image-button_saved"
                  : "news-card__image-button"
              }
              onMouseEnter={handleButtonOnMouseEnter}
              onMouseLeave={handleButtonOnMouseLeave}
            ></button>
          ) : (
            <button
              className="news-card__image-button"
              onMouseEnter={handleButtonOnMouseEnter}
              onMouseLeave={handleButtonOnMouseLeave}
            >
              {isButtonHovered && (
                <span className="news-card__image-popup">
                  Entre para salvar artigos
                </span>
              )}
            </button>
          )
        ) : (
          <button
            className="news-card__image-button news-card__image-button_delete"
            onMouseEnter={handleButtonOnMouseEnter}
            onMouseLeave={handleButtonOnMouseLeave}
            onClick={() => handleOpenPopup(removeConfirmationPopup)}
          >
            {isButtonHovered && (
              <span className="news-card__image-popup">
                Remover artigo salvo
              </span>
            )}
          </button>
        )}
        {!atHomepage ? (
          <div className="news-card__image-tag">{article.source.name}</div>
        ) : null}
      </div>
      <div className="news-card__info-container">
        <p className="news-card__date">{formattedDate}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source.name}</p>
      </div>
    </li>
  );
}

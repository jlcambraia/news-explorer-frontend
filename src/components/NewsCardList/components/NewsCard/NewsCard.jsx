import "./NewsCard.css";

import imagePlaceholder from "../../../../assets/images/image1-card-placeholder.png";

import { useState, useContext } from "react";
import { CurrentPathContext } from "../../../../contexts/CurrentPathContext";
import { formatArticleDate } from "../../../../utils/validators/formatDate";

export default function NewsCard({ article, isUserLoggedIn }) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isArticleSaved, setIsArticleSaved] = useState(false);
  const pathLocation = useContext(CurrentPathContext);

  const formattedDate = formatArticleDate(article.publishedAt);

  function handleButtonOnMouseEnter() {
    setIsButtonHovered(true);
  }

  function handleButtonOnMouseLeave() {
    setIsButtonHovered(false);
  }

  function handleSaveArticle() {
    setIsArticleSaved(!isArticleSaved);
  }

  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img
          className="news-card__image"
          src={imagePlaceholder}
          alt={`Imagem do artigo de ${article.author}`}
        />
        {pathLocation ? (
          isUserLoggedIn ? (
            <button
              onClick={handleSaveArticle}
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
                  Sign in to save articles
                </span>
              )}
            </button>
          )
        ) : (
          <button
            className="news-card__image-button news-card__image-button_delete"
            onMouseEnter={handleButtonOnMouseEnter}
            onMouseLeave={handleButtonOnMouseLeave}
          >
            {isButtonHovered && (
              <span className="news-card__image-popup">Remove from saved</span>
            )}
          </button>
        )}
        {!pathLocation ? (
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

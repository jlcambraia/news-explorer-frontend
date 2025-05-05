import "./NewsCard.css";

import imagePlaceholder from "../../../../../../images/image1-card-placeholder.png";

import { useState, useContext } from "react";
import { CurrentPathContext } from "../../../../../../contexts/CurrentPathContext";

export default function NewsCard({ article }) {
  // isUserLoggedIn criado apenas para desenvolvimento. Passar para App no final do desenvolvimento do front-end.
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isArticleSaved, setIsArticleSaved] = useState(false);
  const pathLocation = useContext(CurrentPathContext);

  const handleDate = () => {
    const year = article.publishedAt.slice(0, 4);
    const day = article.publishedAt.slice(6, 8);
    const monthNumber = article.publishedAt.slice(4, 6);

    const months = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      10: "October",
      11: "November",
      12: "December",
    };

    const month = months[monthNumber];

    return `${month} ${day}, ${year}`;
  };

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
        <p className="news-card__date">{handleDate()}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source.name}</p>
      </div>
    </li>
  );
}

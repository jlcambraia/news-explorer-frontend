import "./NewsCard.css";

import imagePlaceholder from "../../../../assets/images/placeholders/imagePlaceholder.jpg";

import { useState, useContext, useEffect } from "react";
import { CurrentPathContext } from "../../../../contexts/CurrentPathContext";
import { SearchArticlesContext } from "../../../../contexts/SearchArticlesContext";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import { formatArticleDate } from "../../../../utils/validators/formatDateValidator";

import ConfirmationButton from "../../../modals/ConfirmationButton";

export default function NewsCard({
  article,
  handleOpenPopup,
  handleSaveArticle,
  handleRemoveArticle,
}) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isArticleSaved, setIsArticleSaved] = useState(false);

  const atHomepage = useContext(CurrentPathContext);
  const { savedArticles } = useContext(SearchArticlesContext);
  const { isUserLoggedIn, currentUserInfo } = useContext(CurrentUserContext);

  const isArticleFromOwner = article.owner === currentUserInfo?.data?._id;

  const formattedDate = formatArticleDate({
    publishedAt: article.publishedAt,
    date: article.date,
  });

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
      <ConfirmationButton
        handleRemoveArticle={handleRemoveArticle}
        article={article}
      />
    ),
  };

  useEffect(() => {
    const alreadySaved = savedArticles.some((a) => {
      return a.link === article.url;
    });

    setIsArticleSaved(alreadySaved);
  }, [savedArticles, article.url]);

  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img
          className="news-card__image"
          src={article.urlToImage || article.image || imagePlaceholder}
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
        ) : isArticleFromOwner ? (
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
        ) : null}
        {!atHomepage ? (
          <div className="news-card__image-tag">
            {article.source.name || article.keyword}
          </div>
        ) : null}
      </div>
      <div className="news-card__info-container">
        <p className="news-card__date">{formattedDate}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">
          {article.description || article.text}
        </p>
        <p className="news-card__source">
          {article.source.name || article.source}
        </p>
      </div>
    </li>
  );
}

import "./NewsCardList.css";
import NewsCard from "./components/NewsCard/NewsCard";
import notFoundIcon from "../../assets/images/icons/not-found-icon.png";

import { useState, useContext } from "react";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";

export default function NewsCardList({
  placeholder,
  savedArticles,
  isUserLoggedIn,
  isSearchingForNews,
}) {
  const [articlesToRenderize, setArticlesToRenderize] = useState(3);

  const pathLocation = useContext(CurrentPathContext);

  const handleShowMoreButton = () => {
    setArticlesToRenderize((articles) => articles + 3);
  };

  return (
    <>
      {pathLocation ? (
        isSearchingForNews ? (
          <section className="news-card-list">
            <i className="news-card-list__circle-preloader"></i>
            <p className="news-card-list__text-preloader">
              Searching for news...
            </p>
          </section>
        ) : placeholder.length > 0 ? (
          <section className="news-card-list">
            {pathLocation && (
              <h2 className="news-card-list__title">Search results</h2>
            )}

            <ul className="news-card-list__cards">
              {placeholder.slice(0, articlesToRenderize).map((article) => {
                return (
                  <NewsCard
                    key={article.url}
                    article={article}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                );
              })}
            </ul>
            {placeholder.length > 3 &&
              articlesToRenderize < placeholder.length && (
                <button
                  onClick={handleShowMoreButton}
                  className="news-card-list__button"
                >
                  Show more
                </button>
              )}
          </section>
        ) : (
          <section className="news-card-list">
            <img
              className="news-card-list__not-found-icon"
              src={notFoundIcon}
              alt="Ícone de artigo não encontrado"
            />
            <h3 className="news-card-list__not-found-title">Nothing found</h3>
            <p className="news-card-list__not-found-subtitle">
              Sorry, but nothing matched your search terms.
            </p>
          </section>
        )
      ) : (
        savedArticles.length > 0 && (
          <section className="news-card-list">
            <ul className="news-card-list__cards">
              {savedArticles.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))}
            </ul>
          </section>
        )
      )}
    </>
  );
}

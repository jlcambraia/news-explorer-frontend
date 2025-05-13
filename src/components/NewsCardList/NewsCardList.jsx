import "./NewsCardList.css";
import NewsCard from "./components/NewsCard/NewsCard";
import notFoundIcon from "../../assets/images/icons/not-found-icon.png";

import { useState, useContext } from "react";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";
import { SearchedArticlesContext } from "../../contexts/SearchedArticlesContext";

export default function NewsCardList({
  savedArticles,
  isUserLoggedIn,
  isSearchingForNews,
  hasSearched,
  searchError,
  searchKeyword,
}) {
  const [articlesToRenderize, setArticlesToRenderize] = useState(3);

  const pathLocation = useContext(CurrentPathContext);
  const searchedArticles = useContext(SearchedArticlesContext);

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
        ) : searchError ? (
          <section className="news-card-list">
            <h3 className="news-card-list__not-found-title">
              Sorry, an error occurred
            </h3>
            <p className="news-card-list__not-found-error-subtitle">
              Something went wrong during the request. There might be a
              connection issue or the server could be down. Please try again
              later.
            </p>
          </section>
        ) : hasSearched ? (
          searchedArticles.length > 0 ? (
            <section className="news-card-list">
              <div className="news-card-list__title-container">
                <h2 className="news-card-list__title">
                  Search results for: "
                  <span className="news-card-list__keyword">
                    {searchKeyword}
                  </span>
                  "
                </h2>
                <span className="news-card-list__found-articles-quantity">
                  {`(Found ${searchedArticles.length} ${
                    searchedArticles.length === 1 ? "article" : "articles"
                  })`}
                </span>
              </div>

              <ul className="news-card-list__cards">
                {searchedArticles
                  .slice(0, articlesToRenderize)
                  .map((article) => (
                    <NewsCard
                      key={article.url}
                      article={article}
                      isUserLoggedIn={isUserLoggedIn}
                    />
                  ))}
              </ul>

              {searchedArticles.length > 3 &&
                articlesToRenderize < searchedArticles.length && (
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
        ) : null
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

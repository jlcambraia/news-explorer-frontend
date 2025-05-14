import "./NewsCardList.css";
import NewsCard from "./components/NewsCard/NewsCard";
import notFoundIcon from "../../assets/images/icons/not-found-icon.svg";

import { useState, useContext } from "react";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";
import { SearchArticlesContext } from "../../contexts/SearchArticlesContext";

export default function NewsCardList({
  isUserLoggedIn,
  handleOpenPopup,
  handleSaveArticle,
  handleRemoveArticle,
}) {
  const [articlesToRenderize, setArticlesToRenderize] = useState(3);

  const pathLocation = useContext(CurrentPathContext);

  const {
    hasSearched,
    searchedArticles,
    isSearchingForArticles,
    searchError,
    searchKeyword,
    savedArticles,
  } = useContext(SearchArticlesContext);

  const handleShowMoreButton = () => {
    setArticlesToRenderize((articles) => articles + 3);
  };

  return (
    <>
      {pathLocation ? (
        isSearchingForArticles ? (
          <section className="news-card-list">
            <i className="news-card-list__circle-preloader"></i>
            <p className="news-card-list__text-preloader">
              Procurando notícias...
            </p>
          </section>
        ) : searchError ? (
          <section className="news-card-list">
            <h3 className="news-card-list__not-found-title">
              Desculpe, algo deu errado durante a solicitação
            </h3>
            <p className="news-card-list__not-found-error-subtitle">
              Pode haver um problema de conexão ou o servidor pode estar
              inativo. Por favor, tente novamente mais tarde.
            </p>
          </section>
        ) : hasSearched ? (
          searchedArticles.length > 0 ? (
            <section className="news-card-list">
              <div className="news-card-list__title-container">
                <h2 className="news-card-list__title">
                  Resultados encontrados para: "
                  <span className="news-card-list__keyword">
                    {searchKeyword}
                  </span>
                  "
                </h2>
                <span className="news-card-list__found-articles-quantity">
                  {`(Encontramos ${searchedArticles.length} ${
                    searchedArticles.length === 1 ? "artigo" : "artigos"
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
                      handleSaveArticle={handleSaveArticle} // Será removido ou atualizado após desenvolvimento da Api correta.
                    />
                  ))}
              </ul>

              {searchedArticles.length > 3 &&
                articlesToRenderize < searchedArticles.length && (
                  <button
                    onClick={handleShowMoreButton}
                    className="news-card-list__button"
                  >
                    Mostrar mais
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
              <h3 className="news-card-list__not-found-title">
                Nada encontrado
              </h3>
              <p className="news-card-list__not-found-subtitle">
                Desculpe, mas nada corresponde aos seus termos de pesquisa.
              </p>
            </section>
          )
        ) : null
      ) : (
        savedArticles.length > 0 && (
          <section className="news-card-list">
            <ul className="news-card-list__cards">
              {savedArticles.map((article) => (
                <NewsCard
                  key={article.url}
                  article={article}
                  handleOpenPopup={handleOpenPopup}
                  handleRemoveArticle={handleRemoveArticle} // Será removido daqui após desenvolvimento da Api correta.
                />
              ))}
            </ul>
          </section>
        )
      )}
    </>
  );
}

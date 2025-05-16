import "./Search.css";

import SearchForm from "./SearchForm/SearchForm";

export default function Search() {
  return (
    <section className="search">
      <div className="search__container">
        <h2 className="search__title">
          O que está{" "}
          <span className="search__title-paragraph">acontecendo no mundo?</span>
        </h2>

        <p className="search__subtitle">
          Encontre as últimas notícias sobre qualquer tema e salve elas em sua
          conta <span className="search__subtitle-paragraph">pessoal.</span>
        </p>
        <SearchForm />
      </div>
    </section>
  );
}

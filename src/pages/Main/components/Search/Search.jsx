import "./Search.css";

import SearchForm from "./SearchForm/SearchForm";

export default function Search({ searchNewsFromApi }) {
  return (
    <section className="search">
      <h2 className="search__title">What's going on in the world?</h2>
      <p className="search__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm searchNewsFromApi={searchNewsFromApi} />
    </section>
  );
}

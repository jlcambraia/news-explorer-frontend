import "./SearchForm.css";
import { useState, useContext } from "react";
import { SearchArticlesContext } from "../../../../../contexts/SearchArticlesContext";

export default function SearchForm() {
  const [searchInputValue, setSearchInputValue] = useState("");

  const { searchNewsFromApi } = useContext(SearchArticlesContext);

  function handleSearchInputChange(evt) {
    setSearchInputValue(evt.target.value.trim());
  }

  const handleSearchFormSubmit = (evt) => {
    evt.preventDefault();
    searchNewsFromApi(searchInputValue);
    setSearchInputValue("");
  };

  return (
    <form className="search-form" onSubmit={handleSearchFormSubmit}>
      <input
        className="search-form__input"
        placeholder="Enter topic"
        type="text"
        value={searchInputValue}
        onChange={handleSearchInputChange}
      />
      <button className="search-form__button">Search</button>
    </form>
  );
}

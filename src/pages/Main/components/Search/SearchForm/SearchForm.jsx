import "./SearchForm.css";

import { useState } from "react";

export default function SearchForm({ searchNewsFromApi }) {
  const [searchInputValue, setSearchInputValue] = useState("");

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

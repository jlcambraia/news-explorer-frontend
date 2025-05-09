import "./SearchForm.css";

export default function SearchForm() {
  return (
    <form className="search-form" action="submit">
      <input
        className="search-form__input"
        placeholder="Enter topic"
        type="text"
      />
      <button className="search-form__button">Search</button>
    </form>
  );
}

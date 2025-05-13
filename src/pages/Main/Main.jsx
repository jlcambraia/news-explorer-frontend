import Search from "./components/Search/Search";
import About from "./components/About/About";
import NewsCardList from "../../components/NewsCardList/NewsCardList";

export default function Main({
  savedArticles,
  isUserLoggedIn,
  isSearchingForNews,
  searchNewsFromApi,
  hasSearched,
  searchError,
  searchKeyword,
}) {
  return (
    <main>
      <Search searchNewsFromApi={searchNewsFromApi} />
      <NewsCardList
        savedArticles={savedArticles}
        isUserLoggedIn={isUserLoggedIn}
        isSearchingForNews={isSearchingForNews}
        hasSearched={hasSearched}
        searchError={searchError}
        searchKeyword={searchKeyword}
      />
      <About />
    </main>
  );
}

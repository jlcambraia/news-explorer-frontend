import Search from "./components/Search/Search";
import About from "./components/About/About";
import NewsCardList from "./components/NewsCardList/NewsCardList";

export default function Main({
  placeholder,
  savedArticles,
  isUserLoggedIn,
  isSearchingForNews,
}) {
  return (
    <main>
      <Search />
      <NewsCardList
        placeholder={placeholder}
        savedArticles={savedArticles}
        isUserLoggedIn={isUserLoggedIn}
        isSearchingForNews={isSearchingForNews}
      />
      <About />
    </main>
  );
}

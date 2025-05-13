import Search from "./components/Search/Search";
import About from "./components/About/About";
import NewsCardList from "../../components/NewsCardList/NewsCardList";

export default function Main({
  savedArticles,
  isUserLoggedIn,
  isSearchingForNews,
}) {
  return (
    <main>
      <Search />
      <NewsCardList
        savedArticles={savedArticles}
        isUserLoggedIn={isUserLoggedIn}
        isSearchingForNews={isSearchingForNews}
      />
      <About />
    </main>
  );
}

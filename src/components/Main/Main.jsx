import Search from "./components/Search/Search";
import About from "./components/About/About";
import NewsCardList from "./components/NewsCardList/NewsCardList";

export default function Main({ placeholder, savedArticles }) {
  return (
    <main>
      <Search />
      <About />
      <NewsCardList placeholder={placeholder} savedArticles={savedArticles} />
    </main>
  );
}

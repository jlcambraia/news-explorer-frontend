import Search from "./components/Search/Search";
import About from "./components/About/About";
import NewsCardList from "../../components/NewsCardList/NewsCardList";

export default function Main({ handleSaveArticle }) {
  return (
    <main>
      <Search />
      <NewsCardList handleSaveArticle={handleSaveArticle} />
      <About />
    </main>
  );
}

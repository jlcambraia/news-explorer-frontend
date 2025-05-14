import Search from "./components/Search/Search";
import About from "./components/About/About";
import NewsCardList from "../../components/NewsCardList/NewsCardList";

export default function Main({ isUserLoggedIn, handleSaveArticle }) {
  return (
    <main>
      <Search />
      <NewsCardList
        isUserLoggedIn={isUserLoggedIn}
        handleSaveArticle={handleSaveArticle} // Será removido ou atualizado após desenvolvimento da Api correta.
      />
      <About />
    </main>
  );
}

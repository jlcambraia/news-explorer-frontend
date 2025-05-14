import SavedNewsHeader from "./components/SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../../components/NewsCardList/NewsCardList";

export default function SavedNews({ savedArticles, isUserLoggedIn }) {
  return (
    <>
      <main>
        <SavedNewsHeader savedArticles={savedArticles} />
        <NewsCardList
          savedArticles={savedArticles}
          isUserLoggedIn={isUserLoggedIn}
        />
      </main>
    </>
  );
}

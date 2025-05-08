import SavedNewsHeader from "./components/SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../Main/components/NewsCardList/NewsCardList";

export default function SavedNews({
  savedArticles,
  placeholder,
  isUserLoggedIn,
  isSearchingForNews,
}) {
  return (
    <>
      <main>
        <SavedNewsHeader savedArticles={savedArticles} />
        <NewsCardList
          savedArticles={savedArticles}
          placeholder={placeholder}
          isUserLoggedIn={isUserLoggedIn}
          isSearchingForNews={isSearchingForNews}
        />
      </main>
    </>
  );
}

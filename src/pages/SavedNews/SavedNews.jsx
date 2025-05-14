import SavedNewsHeader from "./components/SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../../components/NewsCardList/NewsCardList";

export default function SavedNews({ isUserLoggedIn, handleRemoveArticle }) {
  return (
    <>
      <main>
        <SavedNewsHeader />
        <NewsCardList
          isUserLoggedIn={isUserLoggedIn}
          handleRemoveArticle={handleRemoveArticle} // Será removido ou atualizado após desenvolvimento da Api correta.
        />
      </main>
    </>
  );
}

import SavedNewsHeader from "./components/SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../../components/NewsCardList/NewsCardList";

export default function SavedNews({
  isUserLoggedIn,
  handleOpenPopup,
  handleRemoveArticle,
}) {
  return (
    <>
      <main>
        <SavedNewsHeader />
        <NewsCardList
          isUserLoggedIn={isUserLoggedIn}
          handleOpenPopup={handleOpenPopup}
          handleRemoveArticle={handleRemoveArticle} // Será removido ou atualizado após desenvolvimento da Api correta.
        />
      </main>
    </>
  );
}

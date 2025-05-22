import SavedNewsHeader from "./components/SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../../components/NewsCardList/NewsCardList";

export default function SavedNews({ handleOpenPopup, handleRemoveArticle }) {
  return (
    <>
      <main>
        <SavedNewsHeader />
        <NewsCardList
          handleOpenPopup={handleOpenPopup}
          handleRemoveArticle={handleRemoveArticle} // Será removido ou atualizado após desenvolvimento da Api correta.
        />
      </main>
    </>
  );
}

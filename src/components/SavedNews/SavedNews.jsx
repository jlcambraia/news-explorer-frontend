import SavedNewsHeader from "./components/SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../Main/components/NewsCardList/NewsCardList";

export default function SavedNews({ location }) {
  return (
    <>
      <main>
        <SavedNewsHeader />
        <NewsCardList />
      </main>
    </>
  );
}

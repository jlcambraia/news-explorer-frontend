import "./Confirmation.css";

export default function Confirmation({ handleRemoveArticle, article }) {
  function handleRemoveArticleOnClick() {
    handleRemoveArticle(article._id);
  }

  return (
    <>
      <button
        className={"confirmation__button"}
        onClick={handleRemoveArticleOnClick}
      >
        Sim
      </button>
    </>
  );
}

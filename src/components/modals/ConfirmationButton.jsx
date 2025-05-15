// Após implementar Autenticação e Autorização do usuário, refatorar este botão, para que ele seja genérico e possamos reutilizálo em Login e Register
// Além da função onClick, receber também o texto do botão como prop

import "./ConfirmationButton.css";

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

import "./About.css";

import authorAvatar from "../../../../assets/images/avatars/author-avatar.jpg";

export default function About() {
  return (
    <section className="about">
      <img
        className="about__image"
        src={authorAvatar}
        alt="Avatar do autor da página"
      />
      <div>
        <h2 className="about__title">Sobre o autor</h2>
        <p className="about__description">
          <span className="about__description-paragraph">
            Olá, meu nome é João Luiz Cambraia.
          </span>
          <span className="about__description-paragraph">
            Sou um profissional em transição de carreira para a área da
            teconologia.
          </span>
          <span className="about__description-paragraph">
            Após quase 15 anos atuando com Strategic Sourcing e gerenciando dois
            restaurantes na Bahia, decidi seguir minha verdadeira paixão: a
            tecnologia.
          </span>{" "}
          <span className="about__description-paragraph">
            Estou formando em Desenvolvimento Web na TripleTen, onde venho me
            especializando em HTML, CSS, metodologia BEM, JavaScript, design
            responsivo e React no front-end. No back-end, trabalho com Node.js,
            Express, MongoDB e desenvolvimento de APIs REST.
          </span>{" "}
          <span className="about__description-paragraph">
            Minha bagagem em negócios me permite trazer uma mentalidade
            orientada a resultados e uma abordagem prática para resolver
            problemas.
          </span>{" "}
          <span className="about__description-paragraph">
            Estou entusiasmado para aplicar tudo o que venho aprendendo na
            criação de produtos digitais completos, intuitivos e voltados para o
            usuário.
          </span>
        </p>
      </div>
    </section>
  );
}

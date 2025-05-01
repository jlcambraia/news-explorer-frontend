import "./About.css";

import authorAvatar from "../../../../images/author-avatar.png";

export default function About() {
  return (
    <section className="about">
      <img
        className="about__image"
        src={authorAvatar}
        alt="Avatar do autor da página"
      />
      <div>
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know. You
          can also talk about your experience with Practicum, what you learned
          there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

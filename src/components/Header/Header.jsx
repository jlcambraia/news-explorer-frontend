import Navigation from "./components/Navigation";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <h1 className="header__logo">NewsExplorer</h1>
        <Navigation />
      </div>
    </>
  );
}

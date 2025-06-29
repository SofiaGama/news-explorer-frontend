import { NavLink } from "react-router-dom";
import "./Navigation.css";
import useWindowDimensions from "use-window-dimensions";

function Navigation({ isLoggedIn, onCloseMenu }) {
  const { width } = useWindowDimensions();
  const isMobile = width <= 580;

  const handleLinkClick = () => {
    if (onCloseMenu) {
      onCloseMenu();
    }
  };

  const getClassName = ({ isActive }) => {
    if (isMobile) return "navigation__link";
    return `navigation__link${isActive ? " navigation__link--active" : ""}`;
  };

  return (
    <nav className="navigation">
      <NavLink to="/" className={getClassName} onClick={handleLinkClick}>
        Início
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/saved-news"
          className={getClassName}
          onClick={handleLinkClick}
        >
          Artigos salvos
        </NavLink>
      )}
    </nav>
  );
}

export default Navigation;

import "./Header.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useWindowDimensions from "use-window-dimensions";

import Navigation from "../Navigation/Navigation";
import CurrentUserContext from "../../context/CurrentUserContext";

import menuIcon from "../../assets/images/menu.svg";
import menuIconBlack from "../../assets/images/menuBlack.svg";
import closeIcon from "../../assets/images/close.svg";
import logoutIconWhite from "../../assets/images/logoutWhite.svg";
import logoutIconBlack from "../../assets/images/logoutBlack.svg";

function Header({ isLoggedIn, onLoginClick, onLogout, isSavedNewsPage }) {
  const currentUser = useContext(CurrentUserContext);
  const { width } = useWindowDimensions();

  const isMobile = width <= 580;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const logoutIcon = isSavedNewsPage ? logoutIconBlack : logoutIconWhite;

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMenuOpen, isMobile]);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return (
    <>
      <header
        className={`header ${isSavedNewsPage ? "header_dark" : ""} ${
          isMenuOpen && isMobile ? "header_menu-open" : ""
        }`}
      >
        <div className="header__container">
          <Link
            to="/"
            className={`header__logo ${
              isSavedNewsPage ? "header__logo_dark" : ""
            }`}
            onClick={handleCloseMenu}
          >
            NewsExplorer
          </Link>

          {isMobile ? (
            <button
              className="header__menu-button"
              onClick={handleMenuToggle}
              aria-label="Menu"
            >
              <img
                src={
                  isMenuOpen
                    ? closeIcon
                    : isSavedNewsPage
                    ? menuIconBlack
                    : menuIcon
                }
                alt="Menu"
              />
            </button>
          ) : (
            <>
              <Navigation
                isLoggedIn={isLoggedIn}
                isSavedNews={isSavedNewsPage}
                onLoginClick={onLoginClick}
                onLogout={onLogout}
                currentUser={currentUser}
              />
              <button
                className={`header__button ${
                  isSavedNewsPage ? "header__button_dark" : ""
                }`}
                onClick={isLoggedIn ? onLogout : onLoginClick}
              >
                {isLoggedIn ? (
                  <>
                    {currentUser?.name}
                    <img
                      src={logoutIcon}
                      alt="Sair"
                      className="header__button-icon"
                    />
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
            </>
          )}
        </div>

        {isMenuOpen && isMobile && (
          <>
            <div className="header__menu-popup">
              <div className="header__menu-popup-top">
                <Link
                  to="/"
                  className="header__logo header__logo_white"
                  onClick={handleCloseMenu}
                >
                  NewsExplorer
                </Link>
                <button
                  className="header__menu-button header__menu-button_close"
                  onClick={handleCloseMenu}
                  aria-label="Fechar menu"
                >
                  <img src={closeIcon} alt="Fechar menu" />
                </button>
              </div>

              <hr className="header__divider" />

              <Navigation
                isLoggedIn={isLoggedIn}
                isSavedNews={isSavedNewsPage}
                onLoginClick={onLoginClick}
                onLogout={onLogout}
                currentUser={currentUser}
                onCloseMenu={handleCloseMenu}
              />

              <button
                className="header__popup-auth-button"
                onClick={isLoggedIn ? onLogout : onLoginClick}
              >
                {isLoggedIn ? (
                  <>
                    {currentUser?.name}
                    <img
                      src={logoutIconWhite}
                      alt="Sair"
                      className="header__button-icon"
                    />
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
            </div>

            <div className="backdrop" onClick={handleCloseMenu}></div>
          </>
        )}
      </header>
    </>
  );
}

export default Header;

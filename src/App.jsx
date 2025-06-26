import { useState, useEffect } from "react";
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import NewsCardList from "./components/NewsCardList/NewsCardList";
import Preloader from "./components/Preloader/Preloader";
import SavedNews from "./components/SavedNews/SavedNews";
import PopupWithForm from "./components/PopupWithForm/PopupWithForm";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import newsApi from "./utils/NewsApi";
import * as mainApi from "./utils/MainApi";

import CurrentUserContext from "./context/CurrentUserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import placeholderImage from "./assets/images/placeHolderImage.jpg";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");

  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [currentSearchKeyword, setCurrentSearchKeyword] = useState("");

  const [displayedArticlesCount, setDisplayedArticlesCount] = useState(0);
  const ARTICLES_PER_LOAD = 3;

  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setAuthError("");
  };

  const handleLoginClick = () => {
    closeAllPopups();
    setIsLoginPopupOpen(true);
  };

  const handleRegisterClick = () => {
    closeAllPopups();
    setIsRegisterPopupOpen(true);
  };

  const handleSuccessPopupOpen = () => {
    closeAllPopups();
    setIsSuccessPopupOpen(true);
  };

  const handleLoginSubmit = ({ email, password }) => {
    setAuthError("");
    mainApi
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          closeAllPopups();
          navigate("/");

          const jwt = data.token;
          mainApi
            .checkToken(jwt)
            .then((res) => {
              if (res.data) {
                setCurrentUser(res.data);
                mainApi
                  .getSavedArticles(jwt)
                  .then((articlesData) => {
                    setSavedArticles(articlesData.data);
                  })
                  .catch((err) =>
                    console.error(
                      "Erro ao carregar artigos salvos após login:",
                      err
                    )
                  );
              }
            })
            .catch((err) =>
              console.error("Erro ao verificar token após login:", err)
            );
        } else {
          setAuthError("Erro de login: Token não recebido.");
        }
      })
      .catch((err) => {
        console.error("Erro ao fazer login:", err);
        setAuthError(err.message || "Email ou senha inválidos.");
      });
  };

  const handleRegisterSubmit = ({ email, password, name }) => {
    setAuthError("");
    mainApi
      .register({ email, password, name })
      .then((res) => {
        if (res.data) {
          closeAllPopups();
          handleSuccessPopupOpen();
        } else {
          setAuthError("Erro de registro: Dados inválidos.");
        }
      })
      .catch((err) => {
        console.error("Erro ao registrar:", err);
        setAuthError(err.message || "Erro ao registrar. Tente novamente.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
    navigate("/");
    console.log("Usuário deslogado!");
  };

  const handleSaveArticle = (article) => {
    if (!isLoggedIn) {
      handleLoginClick();
      return;
    }
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      console.error("Token JWT não encontrado.");
      return;
    }

    const articleToSave = {
      keyword: currentSearchKeyword,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage || placeholderImage,
    };

    mainApi
      .saveArticle(jwt, articleToSave)
      .then((savedArticleRes) => {
        setSavedArticles((prevArticles) => [
          ...prevArticles,
          savedArticleRes.data,
        ]);
      })
      .catch((err) => {
        console.error("Erro ao salvar artigo:", err);
      });
  };

  const handleDeleteArticle = (article) => {
    if (!isLoggedIn) {
      console.error("Usuário não logado para deletar artigo.");
      return;
    }
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      console.error("Token JWT não encontrado.");
      return;
    }

    const articleIdToDelete = article._id;

    mainApi
      .deleteArticle(jwt, articleIdToDelete)
      .then((res) => {
        if (res.message === "Artigo removido") {
          setSavedArticles((prevArticles) =>
            prevArticles.filter((a) => a._id !== articleIdToDelete)
          );
        } else {
          console.error(
            "Erro ao deletar artigo:",
            res.message || "Resposta inesperada."
          );
        }
      })
      .catch((err) => {
        console.error("Erro ao deletar artigo:", err);
      });
  };

  const handleSearchSubmit = (keyword) => {
    setIsLoading(true);
    setArticles([]);
    setNoResultsFound(false);
    setSearchError("");
    setCurrentSearchKeyword(keyword);
    setDisplayedArticlesCount(0);

    newsApi
      .getNews(keyword)
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          localStorage.setItem(
            "lastSearchArticles",
            JSON.stringify(data.articles)
          );
          localStorage.setItem("lastSearchKeyword", keyword);
          setDisplayedArticlesCount(ARTICLES_PER_LOAD);
        } else {
          setNoResultsFound(true);
          localStorage.removeItem("lastSearchArticles");
          localStorage.removeItem("lastSearchKeyword");
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar notícias:", err);
        setSearchError(
          "Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde."
        );
        localStorage.removeItem("lastSearchArticles");
        localStorage.removeItem("lastSearchKeyword");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleShowMoreClick = () => {
    setDisplayedArticlesCount((prevCount) =>
      Math.min(prevCount + ARTICLES_PER_LOAD, articles.length)
    );
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setIsLoggedIn(true);
            setCurrentUser(res.data);
            mainApi
              .getSavedArticles(jwt)
              .then((articlesData) => {
                setSavedArticles(articlesData.data);
              })
              .catch((err) => {
                console.error("Erro ao carregar artigos salvos:", err);
                setSavedArticles([]);
              });
          } else {
            localStorage.removeItem("jwt");
            setIsLoggedIn(false);
            setCurrentUser(null);
            setSavedArticles([]);
          }
        })
        .catch((err) => {
          console.error("Erro ao verificar token:", err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
          setSavedArticles([]);
        });
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setSavedArticles([]);
    }

    const storedArticles = localStorage.getItem("lastSearchArticles");
    const storedKeyword = localStorage.getItem("lastSearchKeyword");

    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles);
      setArticles(parsedArticles);
      setDisplayedArticlesCount(
        Math.min(parsedArticles.length, ARTICLES_PER_LOAD)
      );
    }
    if (storedKeyword) {
      setCurrentSearchKeyword(storedKeyword);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div
          className={`main-content-wrapper ${
            isHome ? "main-background-hero" : ""
          }`}
        >
          <Header
            isLoggedIn={isLoggedIn}
            onLoginClick={handleLoginClick}
            onLogout={handleLogout}
            isSavedNewsPage={!isHome}
          />
          <Routes>
            <Route path="/" element={<Main onSearch={handleSearchSubmit} />} />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedNews
                    articles={savedArticles}
                    isLoggedIn={isLoggedIn}
                    onDelete={handleDeleteArticle}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        {isHome && (
          <div className="news-card-list">
            {isLoading && <Preloader />}

            {!isLoading && noResultsFound && articles.length === 0 && (
              <p className="news-card-list__text">
                Nada encontrado para "{currentSearchKeyword}".
              </p>
            )}

            {!isLoading && searchError && (
              <p className="news-card-list__text">{searchError}</p>
            )}

            {articles.length > 0 && !isLoading && (
              <>
                <h2 className="news-card-list__title">Procurar resultados</h2>

                <div className="news-card-list__container">
                  <NewsCardList
                    articles={articles.slice(0, displayedArticlesCount)}
                    isLoggedIn={isLoggedIn}
                    isSavedNewsPage={false}
                    onSave={handleSaveArticle}
                    onDelete={() => {}}
                    savedArticles={savedArticles}
                  />
                </div>

                {displayedArticlesCount < articles.length && (
                  <button
                    className="news-card-list__show-more"
                    type="button"
                    onClick={handleShowMoreClick}
                  >
                    Mostrar mais
                  </button>
                )}
              </>
            )}
          </div>
        )}

        <About />
        <Footer />

        <PopupWithForm
          name="login"
          title="Entrar"
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
        >
          <LoginForm
            onLogin={handleLoginSubmit}
            onRedirectClick={handleRegisterClick}
            authError={authError}
          />
        </PopupWithForm>

        <PopupWithForm
          name="register"
          title="Inscrever-se"
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
        >
          <RegisterForm
            onRegister={handleRegisterSubmit}
            onRedirectClick={handleLoginClick}
            authError={authError}
          />
        </PopupWithForm>

        <PopupWithForm
          name="success"
          title="Registro realizado com sucesso!"
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
        >
          <div className="popup__message">
            Você se registrou com sucesso. Agora você pode fazer login.
          </div>
          <div className="popup__redirect-link popup__redirect-link_centered">
            <span
              className="popup__link"
              onClick={() => {
                closeAllPopups();
                handleLoginClick();
              }}
            >
              Entrar
            </span>
          </div>
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

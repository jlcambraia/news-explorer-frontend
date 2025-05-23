import "./App.css";

import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { CurrentPathContext } from "./contexts/CurrentPathContext";
import { SearchArticlesContext } from "./contexts/SearchArticlesContext.js";
import { CurrentUserContext } from "./contexts/CurrentUserContext.js";

import { newsApi } from "./utils/apis/NewsApi.js";
import { authApi } from "./utils/apis/AuthApi.js";
import { mainApi } from "./utils/apis/MainApi.js";
import { tokenService } from "./utils/auth/Token.js";

import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import SavedNews from "./pages/SavedNews/SavedNews";
import Footer from "./components/Footer/Footer";
import Popup from "./components/modals/Popup";
import Login from "./components/modals/Login";
import Register from "./components/modals/Register";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [popup, setPopup] = useState(null);
  const [atHomepage, setAtHomepage] = useState(location.pathname === "/");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isSearchingForArticles, setIsSearchingForArticles] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [articlesToRenderize, setArticlesToRenderize] = useState(3);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  const keywordErrorPopup = { title: "Por favor, insira uma palavra-chave." };

  // Popup falso para simular tratamento de erros na Api falsa.
  const saveArticlesErrorPopup = {
    title: "Tivemos um erro ao salvar um artigo, lamentamos o ocorrido",
  };
  // Popup falso para simular tratamento de erros na Api falsa.
  const removeArticlesErrorPopup = {
    title: "Tivemos um erro ao remover um artigo salvo, lamentamos o ocorrido",
  };

  // Este será o children do Popup quando o registro do usuário for bem sucedido.
  const successfulRegistration = {
    title: "Cadastro concluído com sucesso!",
  };

  // Este será o children do Popup quando o registro do usuário for mal sucedido.
  const failedRegistration = {
    title: "O cadastro falhou, por favor, tente novamente.",
  };

  useEffect(() => {
    const savedArticlesAtLocalStorage =
      localStorage.getItem("searchedArticles");
    const savedKeywordAtLocalStorage = localStorage.getItem("searchKeyword");
    if (savedArticlesAtLocalStorage) {
      setSearchedArticles(JSON.parse(savedArticlesAtLocalStorage));
      setHasSearched(true);
    }
    if (savedKeywordAtLocalStorage) {
      setSearchKeyword(savedKeywordAtLocalStorage);
    }
  }, []);

  // Busca informação de qual pathname o usuário está
  useEffect(() => {
    setAtHomepage(location.pathname === "/");
  }, [location.pathname]);

  // Loga automaticamente caso tenha token salvo
  useEffect(() => {
    const token = tokenService.getToken();

    if (!token) {
      return;
    }

    const userdata = async () => {
      try {
        const userdata = await mainApi.getUserInfo();
        setCurrentUserInfo(userdata);
        setIsUserLoggedIn(true);
      } catch {
        setIsUserLoggedIn(false);
      }
    };
    userdata();
  }, []);

  // Chamada da NewsApi
  const searchNewsFromApi = async (inputValue) => {
    if (!inputValue) {
      handleOpenPopup(keywordErrorPopup);
      return;
    }

    setSearchError(false);
    setHasSearched(false);
    setSearchKeyword(inputValue);
    setIsSearchingForArticles(true);

    try {
      const results = await newsApi.getArticles(inputValue);
      setHasSearched(true);
      setSearchedArticles(results.articles);
      localStorage.setItem(
        "searchedArticles",
        JSON.stringify(results.articles)
      );
      localStorage.setItem("searchKeyword", inputValue);
    } catch {
      localStorage.removeItem("searchedArticles");
      localStorage.removeItem("searchKeyword");
      setSearchError(true);
    } finally {
      setIsSearchingForArticles(false);
    }
  };

  // Chamada de AuthApi para Register
  const handleRegistration = async (email, password, name) => {
    if (!email && !password && !name) {
      return;
    }

    try {
      const registeredUser = await authApi.register(email, password, name);
      if (registeredUser) {
        handleClosePopup();
        handleOpenPopup(successfulRegistration);
      }
    } catch {
      handleOpenPopup(failedRegistration);
    }
  };

  // Reorganizar App.jsx, reorganizando as chamadas
  const registerPopup = {
    title: "Inscrever-se",
    children: <Register handleRegistration={handleRegistration} />,
  };

  // Chamada de AuthApi para Login
  const handleLogin = async (email, password) => {
    if (!email && !password) {
      return;
    }

    try {
      const authorizeUser = await authApi.authorize(email, password);
      tokenService.setToken(authorizeUser.token);
      const userdata = await mainApi.getUserInfo();
      setCurrentUserInfo(userdata);
      setIsUserLoggedIn(true);
      handleClosePopup();
    } catch {
      handleOpenPopup(failedRegistration);
    }
  };

  // Reorganizar App.jsx, reorganizando as chamadas
  const loginPopup = {
    title: "Entrar",
    children: <Login handleLogin={handleLogin} />,
  };

  // Salva artigos na MainApi
  const handleSaveArticle = async (article) => {
    const alreadySaved = savedArticles.some((a) => a.link === article.url);
    if (alreadySaved) return;

    try {
      const saved = await mainApi.createArticle(article);
      const updatedSaved = saved.data;

      setSavedArticles((prev) => [...prev, updatedSaved]);
    } catch (error) {
      console.error("Erro ao salvar artigo:", error);
      handleOpenPopup(saveArticlesErrorPopup);
    }
  };

  // Remove artigos na MainApi
  const handleRemoveArticle = async (articleId) => {
    try {
      await mainApi.deleteArticle(articleId);
      const articles = await mainApi.getArticles();
      const updatedArticles = articles.data;
      setSavedArticles(updatedArticles);
      handleClosePopup();
    } catch {
      handleOpenPopup(removeArticlesErrorPopup);
    }
  };

  // Busca artigos salvos na MainApi

  useEffect(() => {
    const handleGetArticles = async () => {
      try {
        const receivedArticles = await mainApi.getArticles();
        const articles = receivedArticles.data;
        setSavedArticles(articles);
      } catch {
        const getArticlesErrorPopup = {
          title:
            "Tivemos um erro ao tentar buscar os artigos salvos, lamentamos o ocorrido",
        };
        handleOpenPopup(getArticlesErrorPopup);
      }
    };

    if (isUserLoggedIn) {
      handleGetArticles();
    }
  }, [isUserLoggedIn]);

  // Faz o logout do site
  const handleLogout = () => {
    tokenService.removeToken();
    setIsUserLoggedIn(false);
    navigate("/");
  };

  function handleOpenPopup(popup) {
    setPopup(null);
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <>
      <SearchArticlesContext.Provider
        value={{
          hasSearched,
          searchedArticles,
          isSearchingForArticles,
          searchKeyword,
          searchError,
          savedArticles,
          articlesToRenderize,
          setArticlesToRenderize,
          searchNewsFromApi,
        }}
      >
        <CurrentUserContext.Provider
          value={{ isUserLoggedIn, currentUserInfo }}
        >
          <CurrentPathContext.Provider value={atHomepage}>
            <div
              className={
                atHomepage
                  ? "app__body"
                  : "app__body app__body_without-background-image"
              }
            >
              <Header
                openPopup={handleOpenPopup}
                loginPopup={loginPopup}
                handleLogout={handleLogout}
              />
              <Routes>
                <Route
                  path="/"
                  element={<Main handleSaveArticle={handleSaveArticle} />}
                />
                <Route
                  path="/saved-news"
                  element={
                    <SavedNews
                      handleOpenPopup={handleOpenPopup}
                      handleRemoveArticle={handleRemoveArticle}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <Footer />

              {popup && (
                <Popup
                  openPopup={handleOpenPopup}
                  closePopup={handleClosePopup}
                  title={popup.title}
                  registerPopup={registerPopup}
                  loginPopup={loginPopup}
                >
                  {popup.children}
                </Popup>
              )}
            </div>
          </CurrentPathContext.Provider>
        </CurrentUserContext.Provider>
      </SearchArticlesContext.Provider>
    </>
  );
}

export default App;

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
import { UserContext } from "./contexts/UserContext.js";

import { newsApi } from "./utils/apis/NewsApi.js";
// Importação de Api falsa apenas para desenvolvimento e funcionamento simulado
import { mockApi } from "./utils/apis/MockApi.js";

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

  const location = useLocation();
  const [atHomepage, setAtHomepage] = useState(location.pathname === "/");

  const [hasSearched, setHasSearched] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isSearchingForArticles, setIsSearchingForArticles] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [articlesToRenderize, setArticlesToRenderize] = useState(3);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("Carregando...");

  const loginPopup = { title: "Entrar", children: <Login /> };
  const registerPopup = { title: "Inscrever-se", children: <Register /> };
  const keywordErrorPopup = { title: "Por favor, insira uma palavra-chave." };

  // Popup falso para simular tratamento de erros na Api falsa.
  const mockApiSaveArticlesErrorPopup = {
    title: "Tivemos um erro ao salvar um artigo, lamentamos o ocorrido",
  };
  // Popup falso para simular tratamento de erros na Api falsa.
  const mockApiRemoveArticlesErrorPopup = {
    title: "Tivemos um erro ao remover um artigo salvo, lamentamos o ocorrido",
  };

  // Este será o children do Popup quando o registro do usuário for bem sucedido.
  // const successfulRegistration = {
  //   title: "Cadastro concluído com sucesso!",
  // };

  // Este será o children do Popup quando o registro do usuário for mal sucedido.
  // const failedRegistration = {
  //   title: "O cadastro falhou, por favor, tente novamente.",
  // };

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
        setUsername(userdata.data.name);
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
      setUsername(authorizeUser.name);
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
    const alreadySaved = savedArticles.some((a) => a.url === article.url);
    if (alreadySaved) {
      return;
    }

    try {
      const saved = await mockApi.saveArticle(article);
      setSavedArticles((prev) => [...prev, saved]);
    } catch {
      handleOpenPopup(mockApiSaveArticlesErrorPopup);
    }
  };

  // Simula remover artigos em uma Api falsa. Será removido ou atualizado após desenvolvimento da Api correta.
  const handleRemoveArticle = async (articleId) => {
    try {
      await mockApi.removeArticle(articleId);
      const updatedArticles = await mockApi.getSavedArticles();
      setSavedArticles(updatedArticles);
      handleClosePopup();
    } catch {
      handleOpenPopup(mockApiRemoveArticlesErrorPopup);
    }
  };

  // Simula buscar artigos em uma Api falsa. Será removido ou atualizado após desenvolvimento da Api correta.
  useEffect(() => {
    const handleSavedArticles = async () => {
      try {
        const articles = await mockApi.getSavedArticles();
        setSavedArticles(articles);
      } catch {
        const mockApiGetArticlesErrorPopup = {
          title:
            "Tivemos um erro ao tentar buscar os artigos salvos, lamentamos o ocorrido",
        };
        handleOpenPopup(mockApiGetArticlesErrorPopup);
      }
    };

    handleSavedArticles();
  }, []);

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
        <UserContext.Provider value={{ isUserLoggedIn, username }}>
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
                  element={
                    <Main
                      handleSaveArticle={handleSaveArticle} // Será removido ou atualizado após desenvolvimento da Api correta.
                    />
                  }
                />
                <Route
                  path="/saved-news"
                  element={
                    <SavedNews
                      handleOpenPopup={handleOpenPopup}
                      handleRemoveArticle={handleRemoveArticle} // Será removido ou atualizado após desenvolvimento da Api correta.
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
        </UserContext.Provider>
      </SearchArticlesContext.Provider>
    </>
  );
}

export default App;

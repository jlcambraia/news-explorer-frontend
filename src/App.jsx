import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { CurrentPathContext } from "./contexts/CurrentPathContext";
import { SearchArticlesContext } from "./contexts/SearchArticlesContext.js";

import { api } from "./utils/apis/NewsApi.js";

import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import SavedNews from "./pages/SavedNews/SavedNews";
import Footer from "./components/Footer/Footer";
import Popup from "./components/modals/Popup";
import Login from "./components/modals/Login";
import Register from "./components/modals/Register";

// Criado apenas para desenvolvimento. Apagar depois que buscar informações da api.
const savedArticles = [
  {
    source: {
      id: null,
      name: "News12.com",
    },
    author: null,
    title:
      "Delays continue Friday at Newark Liberty due to construction, staffing issues  News 12  New Jersey",
    description:
      "According to the FAA, more than 400 flights were delayed Thursday afternoon and more than 200 were canceled.",
    url: "https://newjersey.news12.com/delayscontinuefridayatnewarklibertyduetoconstructionstaffingissues",
    urlToImage: "https://loremflickr.com/400/272",
    publishedAt: "2025-05-07T13:14:15Z",
    content: "Topics you care about, straight to your inbox",
  },
  {
    source: {
      id: null,
      name: "MarketWatch",
    },
    author: "Joseph Adinolfi",
    title:
      "Stock market’s rapid rebound from tariffinspired rout stuns Wall Street. But there were signs this would happen.  MarketWatch",
    description: "Several gauges showed stocks had become deeply oversold",
    url: "https://www.marketwatch.com/story/stockmarketsrapidreboundfromtariffinspiredroutstunswallstreetbutthereweresignsthiswouldhappenae9b4296",
    urlToImage: "https://loremflickr.com/400/272",
    publishedAt: "2025-05-07T13:14:15Z",
    content:
      "Barely one month has passed since President Donald Trump blindsided global investors with his aggressive tariff plans. Yet U.S. stocks have already staged a remarkable recovery.\r\nOn Thursday, the S&a… [+108 chars]",
  },
  {
    source: {
      id: null,
      name: "Investor's Business Daily",
    },
    author: "REINHARDT KRAUSE, Investor's Business Daily",
    title:
      "Square Earnings, Revenue, Key Metrics Miss In Q1. Payment Firm Lowers 2025 Guidance.  Investor's Business Daily",
    description:
      "Square stock plunged after payments firm Block reported Q1 earnings and revenue that missed Wall Street estimates and lowered fiscal 2025 guidance.",
    url: "https://www.investors.com/news/technology/squarestockblockstocksquareearningsq12025/",
    urlToImage: "https://loremflickr.com/400/272",
    publishedAt: "2025-05-07T13:14:15Z",
    content:
      "Squareparent Block (XYZ) reported firstquarter earnings, revenue and key financial metrics that missed Wall Street targets. The digital payments company lowered fiscal 2025 guidance for Square stoc… [+2942 chars]",
  },
  {
    source: {
      id: null,
      name: "NPR",
    },
    author: "NPR",
    title: "Ford CEO does the math on Trump's auto tariffs  NPR",
    description:
      "Americans are rushing to car dealerships as they worry about what President Trump's tariffs will do to car prices in the coming months. New vehicle sales have been increasing steadily this year, and they jumped in March, according to market research firm Cox …",
    url: "https://www.npr.org/2025/05/01/1248444368/fordceotalkstrumpautomobiletariffs",
    urlToImage: "https://loremflickr.com/400/272",
    publishedAt: "2025-05-07T13:14:15Z",
    content:
      "Ford150 pickup trucks are displayed for sale at a dealership on March 24, 2025 in Austin, Texas.\r\nBrandon Bell/Getty Images\r\nAmericans are rushing to car dealerships as they worry about what Preside… [+1111 chars]",
  },
  {
    source: {
      id: null,
      name: "Investopedia",
    },
    author: "Colin Laidley",
    title:
      "Why Microsoft Stock Had One of Its Best PostEarnings Days in a Decade  Investopedia",
    description:
      "Microsoft stock soared on Thursday after the tech giant’s quarterly results handily beat Wall Street estimates.",
    url: "https://www.investopedia.com/whymicrosoftstockhadoneofitsbestpostearningsdaysinadecade11726613",
    urlToImage: "https://loremflickr.com/400/272",
    publishedAt: "2025-05-07T13:14:15Z",
    content:
      "<ul><li>Microsoft stock rose 7.6% on Thursday, its secondbiggest postearnings jump since 2015.</li><li>Cloudcomputing revenue at the company surged to $27 billion, driven by fasterthanexpected g… [+2428 chars]",
  },
];

function App() {
  // Criado apenas para desenvolvimento. Colocar em useState depois que implementar o login.
  const isUserLoggedIn = false;

  const [popup, setPopup] = useState(null);

  const location = useLocation();
  const [homePathLocation, setHomePathLocation] = useState(
    location.pathname === "/"
  );

  const [hasSearched, setHasSearched] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [isSearchingForArticles, setIsSearchingForArticles] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const savedArticles = localStorage.getItem("searchedArticles");
    const savedKeyword = localStorage.getItem("searchKeyword");
    if (savedArticles) {
      setSearchedArticles(JSON.parse(savedArticles));
      setHasSearched(true);
    }
    if (savedKeyword) {
      setSearchKeyword(savedKeyword);
    }
  }, []);

  useEffect(() => {
    setHomePathLocation(location.pathname === "/");
  }, [location.pathname]);

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
      const results = await api.searchForNews(inputValue);
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

  const loginPopup = { title: "Login", children: <Login /> };
  const registerPopup = { title: "Registrar", children: <Register /> };
  const keywordErrorPopup = { title: "Por favor, insira uma palavra-chave." };

  // Este será o children do Popup quando o registro do usuário for bem sucedido.
  // const successfulRegistration = {
  //   title: "Cadastro concluído com sucesso!",
  // };

  // Este será o children do Popup quando o registro do usuário for mal sucedido.
  // const failedRegistration = {
  //   title: "O cadastro falhou, por favor, tente novamente.",
  // };

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
          searchNewsFromApi,
        }}
      >
        <CurrentPathContext.Provider value={homePathLocation}>
          <div
            className={
              homePathLocation
                ? "app__body"
                : "app__body app__body_without-background-image"
            }
          >
            <Header
              openPopup={handleOpenPopup}
              loginPopup={loginPopup}
              isUserLoggedIn={isUserLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    savedArticles={savedArticles}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                }
              />
              <Route
                path="/saved-news"
                element={
                  <SavedNews
                    savedArticles={savedArticles}
                    isUserLoggedIn={isUserLoggedIn}
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
      </SearchArticlesContext.Provider>
    </>
  );
}

export default App;

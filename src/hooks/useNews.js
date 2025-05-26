import { useState, useEffect } from "react";
import { newsApi } from "../utils/apis/NewsApi.js";

export const useNews = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [isSearchingForArticles, setIsSearchingForArticles] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [articlesToRenderize, setArticlesToRenderize] = useState(3);

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

  const searchNewsFromApi = async (inputValue) => {
    if (!inputValue) {
      return { error: "KEYWORD_REQUIRED" };
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
      return { success: true, articles: results.articles };
    } catch {
      localStorage.removeItem("searchedArticles");
      localStorage.removeItem("searchKeyword");
      setSearchError(true);
      return { error: "FETCH_ERROR" };
    } finally {
      setIsSearchingForArticles(false);
    }
  };

  return {
    hasSearched,
    searchedArticles,
    isSearchingForArticles,
    searchKeyword,
    searchError,
    articlesToRenderize,
    setArticlesToRenderize,
    searchNewsFromApi,
  };
};

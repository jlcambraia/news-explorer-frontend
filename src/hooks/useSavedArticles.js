import { useState, useEffect } from "react";
import { mainApi } from "../utils/apis/MainApi.js";

export const useSavedArticles = (isUserLoggedIn) => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    if (!isUserLoggedIn) return;

    const fetchSavedArticles = async () => {
      try {
        const receivedArticles = await mainApi.getArticles();
        setSavedArticles(receivedArticles.data);
      } catch {
        throw new Error("GET_ARTICLES_ERROR");
      }
    };

    fetchSavedArticles().catch(() => {});
  }, [isUserLoggedIn]);

  const handleSaveArticle = async (article) => {
    const alreadySaved = savedArticles.some((a) => a.link === article.url);
    if (alreadySaved) return { error: "ALREADY_SAVED" };

    try {
      const saved = await mainApi.createArticle(article);
      const updatedSaved = saved.data;
      setSavedArticles((prev) => [...prev, updatedSaved]);
      return { success: true, article: updatedSaved };
    } catch {
      return { error: "SAVE_ERROR" };
    }
  };

  const handleRemoveArticle = async (articleId) => {
    try {
      await mainApi.deleteArticle(articleId);
      const articles = await mainApi.getArticles();
      setSavedArticles(articles.data);
      return { success: true };
    } catch {
      return { error: "REMOVE_ERROR" };
    }
  };

  return {
    savedArticles,
    handleSaveArticle,
    handleRemoveArticle,
  };
};

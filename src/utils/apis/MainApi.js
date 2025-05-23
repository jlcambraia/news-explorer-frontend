import { tokenService } from "../auth/token";

class MainApi {
  constructor({ baseUrl, headers, makeRequest }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._makeRequest = makeRequest;
  }

  _getHeaders() {
    const token = tokenService.getToken();
    return {
      ...this._headers,
      authorization: token ? `Bearer ${token}` : "",
    };
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  getArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  createArticle(article) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        keyword: article.source.name,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
      }),
    }).then(this._handleResponse);
  }

  deleteArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }
}

// Configuração para API
const apiConfig = {
  baseUrl: import.meta.env.VITE_APP_MAINAPI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  makeRequest: (...args) => fetch(...args),
};

// Instância para o Api
export const mainApi = new MainApi(apiConfig);

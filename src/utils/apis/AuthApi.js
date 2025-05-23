class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password, name }),
    }).then(this._handleResponse);
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse);
  }
}

// Configuração para API
const apiConfig = {
  baseUrl: import.meta.env.VITE_APP_MAINAPI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Instância para o Api
export const authApi = new AuthApi(apiConfig);

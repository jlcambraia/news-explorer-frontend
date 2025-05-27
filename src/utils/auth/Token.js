class TokenService {
  constructor(key = "jwt") {
    this._key = key;
  }

  setToken(token) {
    localStorage.setItem(this._key, token);
  }

  getToken() {
    return localStorage.getItem(this._key);
  }

  removeToken() {
    localStorage.removeItem(this._key);
  }
}

// Instância para o TokenService
export const tokenService = new TokenService();

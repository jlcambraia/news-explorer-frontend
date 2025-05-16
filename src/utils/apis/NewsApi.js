class Api {
  constructor({ baseUrl, token, makeRequest, fromDate, toDate }) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._makeRequest = makeRequest;
    this._fromDate = fromDate;
    this._toDate = toDate;
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(console.log(res.status));
  }

  searchForNews(search) {
    return this._makeRequest(
      `${this._baseUrl}q=${search}&from=${this._fromDate}&to=${this._toDate}&pageSize=100&apiKey=${this._token}`,
      {
        headers: {
          authorization: this._token,
        },
      }
    ).then(this._handleServerResponse);
  }
}

// Função que consegue data de N dias atrás
function getDateFromNDaysAgo(n) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString().slice(0, 10);
}

// Configuração para API
const apiConfig = {
  baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
  token: import.meta.env.VITE_APP_API_TOKEN,
  makeRequest: (...args) => fetch(...args),
  fromDate: getDateFromNDaysAgo(7),
  toDate: new Date().toISOString().slice(0, 10),
};

// Instância para o Api
export const api = new Api(apiConfig);

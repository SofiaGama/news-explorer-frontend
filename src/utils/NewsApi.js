class NewsApi {
  constructor({ baseUrl, apiKey, headers }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res
      .json()
      .then((err) => Promise.reject(err.message || res.statusText));
  }

  getNews(keyword) {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const formatDate = (date) => date.toISOString().slice(0, 10);

    const fromDate = formatDate(sevenDaysAgo);
    const toDate = formatDate(today);

    return fetch(
      `${this._baseUrl}/everything?q=${keyword}&from=${fromDate}&to=${toDate}&pageSize=100&apiKey=${this._apiKey}`,
      {
        headers: this._headers,
      }
    ).then(this._handleResponse);
  }
}

const newsApi = new NewsApi({
  baseUrl: "https://nomoreparties.co/news/v2",
  apiKey: "3700af211df142fb9c3e4eef15fb4e4a",
  headers: {
    "Content-Type": "application/json",
  },
});

export default newsApi;

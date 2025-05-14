// Api fictícia, criada apenas para simular salvar e deletar artigos
class MockApi {
  constructor() {
    this._savedArticles = [];
  }

  saveArticle(article) {
    const savedArticle = {
      ...article,
      _id: Math.random().toString(36).slice(2, 9),
    };
    this._savedArticles.push(savedArticle);
    return Promise.resolve(savedArticle);
  }

  removeArticle(articleId) {
    this._savedArticles = this._savedArticles.filter(
      (a) => a._id !== articleId
    );
    return Promise.resolve({ message: "Article removed", _id: articleId });
  }

  getSavedArticles() {
    return Promise.resolve([...this._savedArticles]);
  }
}

export const mockApi = new MockApi();

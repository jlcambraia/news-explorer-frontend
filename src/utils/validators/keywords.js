export function extractUniqueKeywords(articles) {
  const keywords = [];

  articles.forEach((article) => {
    const source = article.source?.name;
    if (source && !keywords.includes(source)) {
      keywords.push(source);
    }
  });

  return keywords;
}

export function formatKeywordsList(keywords) {
  if (keywords.length === 0) return null;

  if (keywords.length === 1) {
    return `${keywords[0]}`;
  }
  if (keywords.length === 2) {
    return `${keywords[0]}, ${keywords[1]}`;
  }
  if (keywords.length === 3) {
    return `${keywords[0]}, ${keywords[1]}, ${keywords[2]}`;
  }

  return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} other`;
}

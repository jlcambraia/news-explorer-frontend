export function formatArticleDate(publishedAt) {
  if (!publishedAt || publishedAt.length < 8) return "Invalid date";

  const year = publishedAt.slice(0, 4);
  const day = publishedAt.slice(8, 10);
  const monthNumber = publishedAt.slice(5, 7);

  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const month = months[monthNumber] || "Unknown";

  return `${month} ${day}, ${year}`;
}

import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  isLoggedIn,
  isSavedNewsPage,
  onSave,
  onDelete,
  savedArticles = [],
}) {
  const checkIfArticleIsSaved = (article) => {
    const validSavedArticles = Array.isArray(savedArticles)
      ? savedArticles
      : [];

    return validSavedArticles.some(
      (saved) =>
        saved.title === article.title ||
        saved.url === article.url ||
        saved.link === article.link
    );
  };

  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {articles.map((article) => (
          <NewsCard
            key={article.url || article._id}
            article={article}
            isLoggedIn={isLoggedIn}
            isSavedNewsPage={isSavedNewsPage}
            onSave={onSave}
            onDelete={onDelete}
            isSaved={checkIfArticleIsSaved(article)}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsCardList;

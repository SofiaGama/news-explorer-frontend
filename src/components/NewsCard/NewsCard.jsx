import "./NewsCard.css";

function NewsCard({
  article,
  onSave,
  onDelete,
  isLoggedIn,
  isSavedNewsPage,
  isSaved,
}) {
  const image =
    article?.image ||
    "https://images.unsplash.com/photo-1749894288516-88c45c2f033b?q=80&w=987&auto=format&fit=crop";
  const date = article?.date || "1 de Janeiro, 2025";
  const title = article?.title || "Título de Notícia";

  const description =
    typeof article?.description === "string"
      ? article.description
      : String(
          article?.description?.name ||
            article?.description ||
            "Descrição da notícia"
        );

  const source =
    article?.source?.name || article?.source || "Fonte Desconhecida";
  const keyword = article?.keyword || "Natureza";

  const isArticleSaved = isSaved;

  const handleButtonClick = () => {
    if (isSavedNewsPage) {
      onDelete(article);
    } else {
      if (isArticleSaved) {
        onDelete(article);
      } else {
        onSave(article);
      }
    }
  };

  return (
    <div className="news-card">
      <img className="news-card__image" src={image} alt={title} />
      {isLoggedIn && (
        <button
          className={`news-card__button ${
            isSavedNewsPage
              ? "news-card__button_delete"
              : isArticleSaved
              ? "news-card__button_bookmark-active"
              : "news-card__button_bookmark"
          }`}
          type="button"
          onClick={handleButtonClick}
        >
          <span className="news-card__tooltip">
            {isSavedNewsPage
              ? "Remover dos salvos"
              : isArticleSaved
              ? "Remover dos salvos"
              : "Salvar artigo"}
          </span>
        </button>
      )}
      {isSavedNewsPage && <span className="news-card__keyword">{keyword}</span>}
      <div className="news-card__content">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source}</p>
      </div>
    </div>
  );
}

export default NewsCard;

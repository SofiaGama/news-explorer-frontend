import "./NewsCard.css";

function NewsCard({
  article,
  onSave,
  onDelete,
  isLoggedIn,
  isSavedNewsPage,
  isSaved,
  onLoginClick,
}) {
  const image =
    article?.urlToImage ||
    article?.image ||
    "https://images.unsplash.com/photo-1749894288516-88c45c2f033b?q=80&w=987&auto=format&fit=crop";

  const date = article?.publishedAt || article?.date || "1 de Janeiro, 2025";
  const title = article?.title || "Título de Notícia";
  const description =
    article?.description ||
    article?.text ||
    "Descrição da notícia não disponível.";
  const source =
    article?.source?.name || article?.source || "Fonte desconhecida";
  const keyword = article?.keyword || "Notícia";

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      onLoginClick();
      return;
    }

    if (isSavedNewsPage) {
      onDelete(article);
    } else {
      if (isSaved) {
        onDelete(article);
      } else {
        onSave(article);
      }
    }
  };

  return (
    <div className="news-card">
      <img className="news-card__image" src={image} alt={title} />

      <button
        className={`news-card__button ${
          isSavedNewsPage
            ? "news-card__button_delete"
            : isSaved
            ? "news-card__button_bookmark-active"
            : "news-card__button_bookmark"
        }`}
        onClick={handleButtonClick}
        type="button"
      >
        <span className="news-card__tooltip">
          {isSavedNewsPage
            ? "Remover dos salvos"
            : !isLoggedIn
            ? "Faça login para salvar"
            : isSaved
            ? "Remover dos salvos"
            : "Salvar artigo"}
        </span>
      </button>

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

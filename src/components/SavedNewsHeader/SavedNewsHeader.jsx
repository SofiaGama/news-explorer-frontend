import "./SavedNewsHeader.css";

function SavedNewsHeader({ userName, savedArticlesCount, keywordsSummary }) {
  return (
    <section className="saved-news-header">
      <p className="saved-news-header__title">Artigos salvos</p>
      <h2 className="saved-news-header__heading">
        {userName}, você tem {savedArticlesCount} artigos salvos.
      </h2>
      <p className="saved-news-header__keywords-summary">
        Por palavras-chave:{" "}
        <span className="saved-news-header__keywords">{keywordsSummary}</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;

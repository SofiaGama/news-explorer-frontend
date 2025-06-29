import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import { saveArticle } from "../../utils/MainApi";

function SavedNews({ articles, isLoggedIn, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser ? currentUser.name : "Usuário";

  const savedArticlesCount = articles.length;

  const keywords = articles.map((article) => article.keyword);
  const uniqueKeywords = [...new Set(keywords)];

  let keywordsSummary = "";
  if (uniqueKeywords.length === 1) {
    keywordsSummary = uniqueKeywords[0];
  } else if (uniqueKeywords.length === 2) {
    keywordsSummary = `${uniqueKeywords[0]} e ${uniqueKeywords[1]}`;
  } else if (uniqueKeywords.length > 2) {
    keywordsSummary = `${uniqueKeywords[0]}, ${uniqueKeywords[1]} e ${
      uniqueKeywords.length - 2
    } outras`;
  }

  return (
    <section className="saved-news">
      <SavedNewsHeader
        userName={userName}
        savedArticlesCount={savedArticlesCount}
        keywordsSummary={keywordsSummary}
      />
      <NewsCardList
        articles={articles}
        isLoggedIn={isLoggedIn}
        isSavedNewsPage={true}
        onDelete={onDelete}
        onSave={() => {}}
        savedArticles={saveArticle}
      />
    </section>
  );
}

export default SavedNews;

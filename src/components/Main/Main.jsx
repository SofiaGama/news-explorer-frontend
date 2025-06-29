import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";

function Main({ onSearch }) {
  return (
    <main className="main">
      <section className="main__search-section">
        <h1 className="main__title">O que está acontecendo no mundo?</h1>
        <p className="main__subtitle">
          Encontre as últimas notícias sobre qualquer tema e salve elas na sua
          conta pessoal
        </p>
        <SearchForm onSearch={onSearch} />
      </section>
    </main>
  );
}

export default Main;

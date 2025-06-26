import "./About.css";
import aboutImage from "../../assets/images/aboutImage.jpg";

function About() {
  return (
    <section className="about">
      <img className="about__image" src={aboutImage} alt="Foto do autor" />
      <div className="about__content">
        <h2 className="about__title">Sobre o autor</h2>
        <p className="about__description">
          Olá! Me chamo Sofia, sou desenvolvedora web, apaixonada e curiosa por
          tecnologia.
          <br />
          <br />
          Neste projeto frontend aplico conceitos de responsividade,
          acessibilidade, desenvolvimento com React e consumo de dados externos,
          além de práticas modernas de desenvolvimento web. Sigo em constante
          evolução, aprimorando minhas habilidades todos os dias e sempre em
          busca de novos desafios.
        </p>
        <p className="about__description"></p>
      </div>
    </section>
  );
}

export default About;

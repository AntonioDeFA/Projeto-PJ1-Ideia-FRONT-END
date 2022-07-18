import React from "react";
import { useNavigate } from "react-router-dom";

import Botao from "../../components/Botao";
import CardMembroTime from "../../components/CardMembroTime";
import ImgLogoLaranja from "../../assets/images/logo-ideia-laranja.png";

import "./styles.css";

function AboutUs() {
  const navigate = useNavigate();

  const irParaTelaDeLogin = () => {
    navigate("/");
  };

  return (
    <div id="about-us-page">
      <div className="ps-3 pe-4 pt-3 img-logo" style={{ marginLeft: "20px" }}>
        <img id="" src={ImgLogoLaranja} alt="Ideia" />
      </div>

      <div className="ps-3 pe-2 d-flex justify-content-between">
        <h1 className="ps-3 ms-1 titulos-principais">Conheça nosso time!</h1>

        <Botao
          titulo="página de login"
          classes="btn me-4 btn-warning botao-menor-personalizado"
          onClick={irParaTelaDeLogin}
        />
      </div>

      <div
        id="lista-membros-time"
        className="mt-4 d-flex justify-content-evenly"
      >
        <CardMembroTime
          nomeMembro="Antonio F. Amorim"
          fotoMembro="https://avatars.githubusercontent.com/u/72554650?v=4"
          github="https://github.com/AntonioDeFA"
          linkedIn="https://www.linkedin.com/in/antonio-de-farias-amorim-5329311bb/"
          instagram="https://www.instagram.com/antonio_amorim.1/"
          descricaoMembro="Desenvolvedor back end."
        />
        <CardMembroTime
          nomeMembro="Gabryel Alexandre"
          fotoMembro="https://avatars.githubusercontent.com/u/83987533?v=4"
          github="https://github.com/Gabryel-Alexandre"
          linkedIn="https://www.linkedin.com/in/gabryel-alexandre-campos-da-silva-a748b1196/"
          instagram="https://www.instagram.com/gabryel_alexandre/"
          descricaoMembro="QA do time e desenvolvedor back end."
        />
        <CardMembroTime
          nomeMembro="José Gabriel"
          fotoMembro="https://avatars.githubusercontent.com/u/68362313?v=4"
          github="https://github.com/gsillva18"
          linkedIn="https://www.linkedin.com/in/jos%C3%A9-gabriel-da-silva-lima-6398a8213/"
          instagram="https://www.instagram.com/gsillva18/"
          descricaoMembro="Desenvolvedor front end."
        />
        <CardMembroTime
          nomeMembro="Nycolas R. Alves"
          fotoMembro="https://avatars.githubusercontent.com/u/57738113?s=400&u=2fa5b78dc627179dda728aba2944fcebe36407d1&v=4"
          github="https://github.com/NycolasR"
          linkedIn="https://www.linkedin.com/in/nycolas-alves-6b8369185/"
          instagram="https://www.instagram.com/nycolas.ra/"
          descricaoMembro="Líder do time e desenvolvedor front end."
        />
      </div>
    </div>
  );
}

export default AboutUs;

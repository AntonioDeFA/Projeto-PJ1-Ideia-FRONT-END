import React from "react";

import Botao from "../../Botao/index";

import "./styles.css";

function PainelPitchDeck(props) {
  const enviarParaConsultoria = () => {
    console.log("enviando para consultoria");
  };

  const fazerUpload = () => {
    console.log("fazendo upload");
  };

  return (
    <div id="painel-pitch-deck">
      <h5 className="mb-4 mt-4">
        Olá competidor, aqui você deverá carregar seu Pitch Deck para que ele
        possa ser avaliado!
      </h5>
      <h5 className="mb-4">
        Aqui você envia um arquivo que te ajuda a demonstrar a sua ideias!
      </h5>
      <h5 className="mb-5">
        Lembre-se: caso envie um vídeo, ele deve estar no limite máximo do
        pitch, que é x minutos!
      </h5>
      <div className="d-flex justify-content-between w-50 mt-5">
        <h3>Faça o upload do seu Pitch Deck</h3>
        <div className="me-4">
          <i
            className="fa fa-upload fa-2x cursor-pointer"
            onClick={() => fazerUpload()}
          ></i>
        </div>
      </div>
      <div className="d-flex justify-content-between w-50 mt-3">
        <Botao
          titulo="enviar para consultoria"
          classes="btn btn-warning botao-menor-personalizado"
          onClick={() => enviarParaConsultoria()}
        />
        <Botao
          titulo="versões"
          classes="btn btn-warning botao-menor-personalizado me-4"
          onClick={null}
        />
      </div>
    </div>
  );
}

export default PainelPitchDeck;

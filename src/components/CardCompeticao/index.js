import React from "react";

import "../../assets/styles/global.css";
import "./styles.css";

function CardCompeticao(props) {
  let dataInicio = props.card.etapaVigente.dataInicio;
  let dataTermino = props.card.etapaVigente.dataTermino;

  return (
    <div
      id="component-cardCompeticao"
      className="me-5 margem-personalizada-card"
    >
      <div className="card border border-warning tamanho-card-personalizado">
        <div className="card-header bg-warning">
          <h5 className="card-title fw-bold">{props.card.nomeCompeticao}</h5>
          <h6 className="card-subtitle">
            {dataInicio[2]}/{dataInicio[1]}/{dataInicio[0]} - {dataTermino[2]}/
            {dataTermino[1]}/{dataTermino[0]}
          </h6>
        </div>
        <div className="card-body">
          <div className="text-center">
            <p>
              Para quem possui o domínio <br /> {props.card.dominioCompeticao}
            </p>
            <p>3 equipes inscritas</p>
          </div>
          <div className="text-end">
            <button className="btn btn-warning botao-menor-personalizado">
              inscrever
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCompeticao;

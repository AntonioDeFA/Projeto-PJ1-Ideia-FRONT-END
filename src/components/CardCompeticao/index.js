import React from "react";
import '../../assets/styles/global.css';

function CardCompeticao() {
  return (
    <div id="component-cardCompeticao">
      <div className="card border border-warning tamanho-card-personalizado">
        <div className="card-header bg-warning">
          <h5 className="card-title fw-bold">PITCH DO IF</h5>
          <h6 className="card-subtitle">21/12/2021 - 27/12/2021</h6>
        </div>
        <div className="card-body">
          <div className="text-center">
            <p>Para quem possui o domínio <br /> @academico.ifpb.edu.br</p>
            <p>3 equipes inscritas</p>
          </div>
          <div className="text-end">
            <button className="btn btn-warning botao-menor-personalizado">inscrever</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCompeticao;
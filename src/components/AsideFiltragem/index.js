import React from "react";

import "./styles.css";

function AsideFiltragem() {
  return (
    <div className="aside-filtragem-tela-inicial">
      <div className="elementos-centralizados" id="titulo-competicoes">
        <h1 className="titulos-principais">Competições</h1>
      </div>

      <div className="elementos-centralizados">
        <button className="btn btn-warning botao-personalizado" id="botao-adicionar">
          adicionar
        </button>
      </div>
    </div>
  );
}

export default AsideFiltragem;
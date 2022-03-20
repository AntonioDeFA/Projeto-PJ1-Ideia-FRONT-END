import React from "react";

import "./styles.css";

function DadosUsuario(props) {
  return (
    <div className="mensagem-erro">
      <div id="titulo-erro" className="elementos-centralizados">
        <h5>Houve um erro!</h5>
      </div>
      <div className="elementos-centralizados">
        <p>{props.mensagem}</p>
      </div>
    </div>
  );
}
export default DadosUsuario;
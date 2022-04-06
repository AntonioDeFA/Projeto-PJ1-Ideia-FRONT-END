import React from "react";
import { MSG005 } from "utils/mensagens";

import "./styles.css";

function Mensagem(props) {
  return (
    <div className={props.tipoMensagem + " mensagem"}>
      <div id="titulo" className="elementos-centralizados">
        {props.tipoMensagem === MSG005 ? (
          <h5>Sucesso!</h5>
        ) : (
          <h5>Houve um erro!</h5>
        )}
      </div>
      <div className="elementos-centralizados">
        <p id="mensagem-texto">{props.mensagem}</p>
      </div>
    </div>
  );
}
export default Mensagem;

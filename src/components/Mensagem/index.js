import React from "react";
import "./styles.css";

import { MSG005, MSG006, MSG008 } from "./../../utils/mensagens";

import { Spinner } from "loading-animations-react";

function Mensagem(props) {
  const handleTitulo = () => {
    let titulo;
    let tipoMensagem = props.tipoMensagem;

    if (tipoMensagem === MSG005) {
      titulo = <h5>Sucesso!</h5>;
    } else if (tipoMensagem === MSG006) {
      titulo = <h5>Houve um erro!</h5>;
    } else if (tipoMensagem === MSG008) {
      titulo = <h5>Aguarde...</h5>;
    }

    return titulo;
  };

  return (
    <div className={props.tipoMensagem + " mensagem"}>
      <div id="titulo" className="elementos-centralizados">
        {handleTitulo()}
      </div>
      {props.tipoMensagem === MSG008 ? (
        <div className="elementos-centralizados">
          <Spinner color1="gray" color2="#fff" />
        </div>
      ) : null}

      <div className="elementos-centralizados">
        <p id="mensagem-texto">{props.mensagem}</p>
      </div>
    </div>
  );
}
export default Mensagem;

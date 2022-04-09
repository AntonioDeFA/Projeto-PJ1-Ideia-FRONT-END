import React from "react";

import { IconName } from "react-icons/fa";

import "../../assets/styles/global.css";
import "./styles.css";

function CardMembro(props) {
  const gerarClasses = () => {
    return props.isLider ? "card-lider" : "card-normal";
  };

  return (
    <div id="card-membro" className={gerarClasses()}>
      <header id="cabecalho" className={"padding " + gerarClasses()}>
        <h5 id="membro-numeracao">
          MEMBRO nº {props.sequencial} {props.isLider ? "(LIDER)" : ""}
        </h5>
      </header>
      <div id="dados" className="padding">
        <h6 id="nome">Nome: {props.nome}</h6>
        <h6 id="email">E-mail: {props.email}</h6>
      </div>
      {/* {props.isLider ? <MDBIcon far icon="trash-alt" /> : null} */}
    </div>
  );
}

export default CardMembro;

import React from "react";

import "../../assets/styles/global.css";
import "./styles.css";

function CardMembro(props) {
  const gerarClasses = () => {
    return props.isLider ? "card-lider" : "card-normal";
  };

  return (
    <div id="card-membro" className={gerarClasses()}>
      <header id="cabecalho" className={"padding " + gerarClasses()}>
        <div>
          <div>
            <h5 id="membro-numeracao">
              MEMBRO nº {props.sequencial} {props.isLider ? "(LIDER)" : ""}
            </h5>
          </div>
          {props.isLider ? null : <i className="fa-solid fa-trash-can"></i>}
        </div>
      </header>

      <div id="dados" className="padding">
        <h6 id="nome">Nome: {props.nome}</h6>
        <h6 id="email">E-mail: {props.email}</h6>
      </div>
    </div>
  );
}

export default CardMembro;

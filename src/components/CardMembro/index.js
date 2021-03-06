import React from "react";

import "../../assets/styles/global.css";
import "./styles.css";

function CardMembro(props) {
  const gerarClasses = () => {
    return props.isLider ? "card-lider" : "card-normal";
  };

  const removerMembro = () => {
    props.removerMembro(props.sequencial);
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
          {props.isLider ? null : (
            <i
              onClick={removerMembro}
              className="fa-solid fa-trash-can cursor-pointer"
            ></i>
          )}
        </div>
      </header>

      <div id="dados" className="padding">
        <h6 id="nome">Nome: {props.nome}</h6>
        <div id="email">
          <p id="email-label">E-mail:</p>
          <p id="email-content">{props.email}</p>
        </div>
      </div>
    </div>
  );
}

export default CardMembro;

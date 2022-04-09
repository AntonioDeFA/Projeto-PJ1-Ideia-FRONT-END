import React from "react";

import IconTrash from "../../assets/images/trash-can-solid.svg";

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
          {props.isLider ? null : (
            <div id="icone-lixeira">
              <img
                src={IconTrash}
                alt="trash"
                className="img-fluid"
                width="20"
                height="20"
              ></img>
            </div>
          )}
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

import React from "react";

import "./styles.css";

function CardMembroTime(props) {
  return (
    <div className="card-membro">
      <div className="elementos-centralizados mt-4">
        <img src={props.fotoMembro} className="imagem-membro" />
      </div>

      <div className="mt-4 elementos-centralizados">
        <div>
          <h3>{props.nomeMembro}</h3>
        </div>
      </div>

      <div className="p-3 descricaoMembro">
        <p style={{ textAlign: "center" }}>{props.descricaoMembro}</p>
      </div>

      <div
        id="contatos"
        className={
          props.descricaoMembro.length < 26
            ? "d-flex justify-content-evenly mt-4"
            : "d-flex justify-content-evenly"
        }
      >
        <a
          className="link-contato-membro"
          href={props.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="contato fa-brands fa-github"></i>
        </a>

        <a
          className="link-contato-membro"
          href={props.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="contato fa-brands fa-linkedin"></i>
        </a>

        <a
          className="link-contato-membro"
          href={props.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="contato fa-brands fa-instagram-square"></i>
        </a>
      </div>
    </div>
  );
}

export default CardMembroTime;

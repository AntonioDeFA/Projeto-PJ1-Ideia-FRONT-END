import React from "react";

import "../../assets/styles/global.css";
import "./styles.css";

function Botao(props) {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      disabled={props.disabled}
      className={props.classes}
    >
      {props.children} {props.titulo}
    </button>
  );
}

export default Botao;

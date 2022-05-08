import React from "react";

import "../../assets/styles/global.css";
import "./styles.css";

function Botao(props) {
  return (
    <button
      className={props.classes}
      onClick={props.onClick}
      id={props.id}
      disabled={props.disabled}
    >
      {props.children} {props.titulo}
    </button>
  );
}

export default Botao;

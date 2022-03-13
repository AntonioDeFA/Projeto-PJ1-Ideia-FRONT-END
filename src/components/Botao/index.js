import React from "react";

import '../../assets/styles/global.css';
import "./styles.css";

function Botao(props) {

  return (
    <button
      className={props.classes}
      onClick={props.onClick}>
      {props.titulo}
    </button>
  );
}

export default Botao;
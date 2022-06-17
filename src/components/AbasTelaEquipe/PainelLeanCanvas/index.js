import React from "react";
import { useNavigate } from "react-router-dom";

import Botao from "../../Botao/index";
import LeanCanvas from "../../LeanCanvas/index";

import "./styles.css";

function PainelLeanCanvas(props) {
  const navigate = useNavigate();

  const salvar = () => {
    console.log("salvar");
  };

  const enviarParaConsultoria = () => {
    console.log("enviando para consultoria");
  };

  return (
    <div id="painel-lean-canvas">
      <h5 className="mb-4">
        Olá competidor, aqui você deverá editar seu Lean Canvas para que ele
        possa ser avaliado
      </h5>
      <div className="d-flex justify-content-end">
        <Botao
          titulo="versões"
          classes="btn btn-warning botao-menor-personalizado me-3"
          onClick={() => {
            navigate(
              `/equipe/${props?.idEquipe}/${props?.papelUsuario}/versoes-artefatos/LEAN_CANVAS`
            );
          }}
        />
        <Botao
          titulo="salvar"
          classes="btn btn-warning botao-menor-personalizado me-3"
          onClick={() => salvar()}
        />
        <Botao
          titulo="enviar para consultoria"
          classes="btn btn-warning botao-menor-personalizado"
          onClick={() => enviarParaConsultoria()}
        />
      </div>
      <div className="mt-4">
        <LeanCanvas />
      </div>
    </div>
  );
}

export default PainelLeanCanvas;

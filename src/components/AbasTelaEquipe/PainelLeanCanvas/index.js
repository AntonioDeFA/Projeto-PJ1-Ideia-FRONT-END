import React, { useContext, useLayoutEffect, useState } from "react";

import Botao from "../../Botao/index";
import LeanCanvas from "../../LeanCanvas/index";

import "./styles.css";

function PainelLeanCanvas(props) {

  const [leanCanvas, setLeanCanvas] = useState({
    id: 0,
    problema: "",
    solucao: "",
    metricasChave: "",
    propostaValor: "",
    vantagemCompetitiva: "",
    canais: "",
    segmentosDeClientes: "",
    estruturaDeCusto: "",
    fontesDeReceita: "",
    etapaSolucaoCanvas: null
  });

  const handleLeanCanvas = (leanCanvas) => {
    console.log("EXECUTANDO HANDLE LEAN CANVAS")
    console.log(leanCanvas)
    setLeanCanvas(leanCanvas);
  }

  const salvar = () => {
    console.log(leanCanvas);
  }

  const enviarParaConsultoria = () => {
    console.log("enviando para consultoria");
  }

  return (
    <div id="painel-lean-canvas">
      <h5 className="mb-4">Olá competidor, aqui você deverá editar seu Lean Canvas para que ele possa ser avaliado</h5>
      <div className="d-flex justify-content-end">
        <Botao
          titulo="versões"
          classes="btn btn-warning botao-menor-personalizado me-3"
          onClick={null}
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
        <LeanCanvas handleLeanCanvas={handleLeanCanvas} />
      </div>
    </div>
  );
}

export default PainelLeanCanvas;

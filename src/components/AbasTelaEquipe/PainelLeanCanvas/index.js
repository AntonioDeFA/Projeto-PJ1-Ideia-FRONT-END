import React, { useContext, useLayoutEffect, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  MSG000,
  MSG001,
  MSG008
} from "../../../utils/mensagens";
import Mensagem from "../../Mensagem";
import api from "../../../services/api";
import Botao from "../../Botao/index";
import LeanCanvas from "../../LeanCanvas/index";
import StoreContext from "../../../store/context";

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
  const [mensagemErro, setMensagemErro] = useState(MSG000);
  const { token } = useContext(StoreContext);

  const handleLeanCanvas = (leanCanvas) => {
    setLeanCanvas(leanCanvas);
  }

  const buscarLeanCanvas = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/equipe/${props.idEquipe}/lean-canvas/elaboracao`)
      .then((response) => {
        console.log("Lean canvas retornado")
        console.log(response.data)
        setLeanCanvas(response.data)
      })
      .catch((error) => {
        criarLeanCanvas()
      });
  }

  const salvar = () => {
    console.log("Lean canvas do painel")
    console.log(leanCanvas)
    if (leanCanvas.problema !== null &&
      leanCanvas.solucao !== null &&
      leanCanvas.metricasChave !== null &&
      leanCanvas.propostaValor !== null &&
      leanCanvas.vantagemCompetitiva !== null &&
      leanCanvas.canais !== null &&
      leanCanvas.segmentosDeClientes !== null &&
      leanCanvas.estruturaDeCusto !== null &&
      leanCanvas.fontesDeReceita !== null) {

      api.defaults.headers.put["Authorization"] = `Bearer ${token}`;
      api
        .put(`/equipe/${props.idEquipe}/lean-canvas`, { leanCanvas })
        .then((response) => {
          console.log("LeanCanvas atualizado")
          setMensagemErro(MSG000);
          buscarLeanCanvas();
        })
        .catch((error) => {
          console.log(error.response.data)
        });
    } else {
      setMensagemErro(MSG001);
    }

  }

  const criarLeanCanvas = () => {
    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api
      .post(`/equipe/${props.idEquipe}/lean-canvas`)
      .then((response) => {
        buscarLeanCanvas();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  const enviarParaConsultoria = () => {
    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api
      .post(`/equipe/${props.idEquipe}/lean-canvas/enviar-consultoria`)
      .then((response) => {
        buscarLeanCanvas();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  useEffect(() => {
    buscarLeanCanvas();
  }, []);

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
        <div style={{ width: "50%" }} className="mb-2">
          {mensagemErro !== MSG000 ? (
            <Mensagem mensagem={mensagemErro} tipoMensagem={"warning"} />
          ) : null}
        </div>
        <LeanCanvas handleLeanCanvas={handleLeanCanvas} leanCanvas={leanCanvas} />
      </div>
    </div>
  );
}

export default PainelLeanCanvas;

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import api from "./../../services/api";
import Botao from "../../components/Botao";
import LeanCanvas from "../../components/LeanCanvas";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import AsideCriacaoFeedbacksLeanCanvas from "../../components/AsideCriacaoFeedbacksLeanCanvas";

import "./styles.css";

function CriacaoFeedbacksLeanCanvas() {
  const navigate = useNavigate();
  const { idEquipe, papelUsuario, idLeanCanvas } = useParams();

  const { token } = useContext(StoreContext);

  const [leanCanvas, setLeanCanvas] = useState({
    problema: "",
    solucao: "",
    metricasChave: "",
    propostaValor: "",
    vantagemCompetitiva: "",
    canais: "",
    segmentosDeClientes: "",
    estruturaDeCusto: "",
    fontesDeReceita: "",
  });

  const [mudou, setMudou] = useState(true);

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/lean-canvas/${idLeanCanvas}/EM_CONSULTORIA/feedbacks-consultoria`)
      .then((response) => {
        const { data } = response;

        setLeanCanvas({
          problema: data.problema,
          solucao: data.solucao,
          metricasChave: data.metricasChave,
          propostaValor: data.propostaDeValor,
          vantagemCompetitiva: data.vantagemCompetitiva,
          canais: data.canais,
          segmentosDeClientes: data.segmentosClientes,
          estruturaDeCusto: data.estruturaDeCustos,
          fontesDeReceita: data.fonteDeReceita,
        });

        console.log(data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    setTimeout(() => {
      setMudou(false);
      setMudou(true);
    }, 400);
  }, [token]);

  return (
    <div id="pagina-feedbacks-lean-canvas">
      <DefaultHeader
        iconeDestaque="consultor"
        isLoginViaToken={papelUsuario === "USUARIO_TOKEN"}
      />

      <div id="aside-feedbacks-lean-canvas-componente">
        <AsideCriacaoFeedbacksLeanCanvas idLeanCanvas={idLeanCanvas} />
      </div>

      <div id="dados-lean-canvas-para-leitura">
        <div className="ps-0 pe-4 pt-3 d-flex justify-content-between">
          <div>
            <div>
              <h1 className="ps-3 ms-1 titulos-principais">Lean Canvas</h1>
            </div>
          </div>
          <div>
            <Botao
              titulo="enviar"
              classes="btn me-2 btn-warning botao-menor-personalizado"
              onClick={null}
            />
            <Botao
              titulo="voltar"
              classes="btn me-4 btn-secondary botao-menor-personalizado"
              onClick={() => {
                navigate("/listagem-consultoria");
              }}
            />
          </div>
        </div>

        <div className="p-3 d-flex justify-content-center">
          <Box sx={{ width: "1040px" }} className="ps-2 pe-3">
            <div className="mt-3">
              {mudou ? (
                <LeanCanvas leanCanvas={leanCanvas} isTelaFeedbacks={true} />
              ) : null}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default CriacaoFeedbacksLeanCanvas;

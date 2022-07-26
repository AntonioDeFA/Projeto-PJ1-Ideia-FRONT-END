import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import api from "./../../services/api";
import Botao from "../../components/Botao";
import LeanCanvas from "../../components/LeanCanvas";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import AsideFeedbacksLeanCanvas from "../../components/AsideFeedbacksLeanCanvas";

import "./styles.css";
import { formatarDataEHora } from "../../services/utils";

function FeedbacksLeanCanvas() {
  const navigate = useNavigate();
  const { idEquipe, papelUsuario, idLeanCanvas } = useParams();

  const { token } = useContext(StoreContext);

  const [equipe, setEquipe] = useState(null);
  const [dataHoraUltimoFeedbackInformado, setDataHoraUltimoFeedbackInformado] =
    useState(null);

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
      .get(`/lean-canvas/${idLeanCanvas}/feedbacks-consultoria`)
      .then((response) => {
        setDataHoraUltimoFeedbackInformado(
          response.data.dataHoraUltimoFeedbackInformado
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [token]);

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/equipe/dados/${idEquipe}`)
      .then((response) => {
        setEquipe(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    api
      .get(`/lean-canvas/${idLeanCanvas}/feedbacks-consultoria`)
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
      <DefaultHeader isLoginViaToken={papelUsuario === "USUARIO_TOKEN"} />

      <div id="aside-feedbacks-lean-canvas-componente">
        <AsideFeedbacksLeanCanvas idLeanCanvas={idLeanCanvas} />
      </div>

      <div id="dados-lean-canvas-para-leitura">
        <div className="ps-0 pe-4 pt-3 d-flex justify-content-between">
          <div>
            <div>
              <h1 className="ps-3 ms-1 titulos-principais">
                Equipe {equipe?.nomeEquipe}
              </h1>
            </div>
          </div>
          <Botao
            titulo="voltar"
            classes="btn me-4 btn-warning botao-menor-personalizado"
            onClick={() => {
              navigate(
                `/equipe/${idEquipe}/${papelUsuario}/versoes-artefatos/LEAN_CANVAS`
              );
            }}
          />
        </div>
        <div style={{ marginLeft: "375px" }}>
          Último feedback criado em{" "}
          {formatarDataEHora(dataHoraUltimoFeedbackInformado)}. Consultor{" "}
          {equipe?.nomeConsultor}.
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

export default FeedbacksLeanCanvas;

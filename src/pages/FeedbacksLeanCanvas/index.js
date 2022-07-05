import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Tabs, Tab } from "@mui/material";

import api from "./../../services/api";
import Botao from "../../components/Botao";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import VersoesPitchDeck from "../../components/AbasVersoesArtefatos/VersoesPitchDeck";
import VersoesLeanCanvas from "../../components/AbasVersoesArtefatos/VersoesLeanCanvas";
import { TabPanel, valueProps } from "../../utils/constantes";

import "./styles.css";
import AsideFeedbacksLeanCanvas from "../../components/AsideFeedbacksLeanCanvas";

function FeedbacksLeanCanvas() {
  const navigate = useNavigate();
  const { idEquipe, papelUsuario, idLeanCanvas } = useParams();

  const { token } = useContext(StoreContext);

  const [value, setValue] = useState(0);

  const [equipe, setEquipe] = useState(null);

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
  }, [token]);

  return (
    <div id="pagina-feedbacks-lean-canvas">
      <DefaultHeader isLoginViaToken={papelUsuario === "USUARIO_TOKEN"} />

      <div id="aside-feedbacks-lean-canvas-componente">
        <AsideFeedbacksLeanCanvas idLeanCanvas={idLeanCanvas} />
      </div>

      <div id="dados-lean-canvas-para-leitura">
        <div className="ps-3 pe-4 pt-3 d-flex justify-content-between">
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
        <div style={{ marginLeft: "390px" }}>
          <h5>
            Aqui poderão ver os feedbacks dos Lean Canvas submetidos para
            consultoria.
          </h5>
        </div>

        <div className="p-3 d-flex justify-content-center">
          <Box sx={{ width: "1050px" }} className="ps-2 pe-3">
            <div className="mt-3">
              <h1>Lean Canvas aq</h1>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default FeedbacksLeanCanvas;

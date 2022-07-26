import React, { useState, useEffect, useContext } from "react";

import { ButtonGroup, List } from "@mui/material";

import api from "./../../services/api";
import Botao from "./../Botao/index";
import { MSG000 } from "./../../utils/mensagens";
import StoreContext from "./../../store/context";

import "./styles.css";

function AsideFeedbacksLeanCanvas(props) {
  const [feedbacks, setFeedbacks] = useState(null);
  const [feedbacksPotencialidades, setFeedbacksPotencialidades] =
    useState(null);
  const [feedbacksFragilidades, setFeedbacksFragilidades] = useState(null);

  const [classesBtnPotencialidades, setClassesBtnPotencialidades] =
    useState(MSG000);
  const [classesBtnFragilidades, setClassesBtnFragilidades] = useState(MSG000);

  const [btnSelecionado, setBtnSelecionado] = useState("POTENCIALIDADES");

  const { token } = useContext(StoreContext);

  const [mudou, setMudou] = useState(true);

  const trocarListaFeedbacks = (tipoFeedback) => {
    setBtnSelecionado(tipoFeedback);
  };

  useEffect(() => {
    let classesBotaoPotencialidades =
      "btn botao-menor-personalizado class-btn-dado-equipe ";
    let classesBotaoFragilidades = classesBotaoPotencialidades;

    if (btnSelecionado === "POTENCIALIDADES") {
      classesBotaoPotencialidades += "btn-warning";
      classesBotaoFragilidades += "btn-secondary";
      setFeedbacks(feedbacksPotencialidades);
    } else {
      classesBotaoPotencialidades += "btn-secondary";
      classesBotaoFragilidades += "btn-warning";
      setFeedbacks(feedbacksFragilidades);
    }

    setTimeout(() => {
      setMudou(false);
      setMudou(true);
    }, 400);

    setClassesBtnPotencialidades(classesBotaoPotencialidades);
    setClassesBtnFragilidades(classesBotaoFragilidades);
  }, [btnSelecionado]);

  useEffect(() => {
    let listaPotencialidades = [];
    let listaFragilidades = [];

    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/lean-canvas/${props.idLeanCanvas}/feedbacks-consultoria`)
      .then((response) => {
        response.data.feedbacksAvaliativos.map((feedback) => {
          feedback.tipoFeedback === "POTENCIALIDADE"
            ? listaPotencialidades.push(feedback)
            : listaFragilidades.push(feedback);
        });

        setFeedbacksPotencialidades(listaPotencialidades);
        setFeedbacksFragilidades(listaFragilidades);

        setFeedbacks(listaPotencialidades);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [token]);

  return (
    <div className="aside-feedbacks-lean-canvas">
      <div className="mt-2 mb-3" style={{ textAlign: "center" }}>
        <h6>
          Aqui poderão ver os feedbacks dos Lean Canvas submetidos para a
          consultoria.
        </h6>
      </div>

      <div
        className="elementos-centralizados"
        id="listagens-feedbacks-filtragem"
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Botao
            titulo="potencialidades"
            onClick={() => trocarListaFeedbacks("POTENCIALIDADES")}
            id="id-btn-feedbacks-potencialidades"
            classes={classesBtnPotencialidades}
          />
          <Botao
            titulo="fragilidades"
            onClick={() => trocarListaFeedbacks("FRAGILIDADES")}
            id="id-btn-feedbacks-fragilidades"
            classes={classesBtnFragilidades}
          />
        </ButtonGroup>
      </div>

      <div className="feedbacks">
        <List
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          {feedbacks?.map((feedback, index) => (
            <li
              key={index}
              style={{ maxHeight: "150px", overflowY: "auto" }}
              className="rounded mb-3 p-2 borda-laranja bg-white d-flex justify-content-start align-items-center mt-2 mb-2 p-3 w-100"
            >
              <h6 style={{ wordBreak: "break-all", margin: 0 }}>
                <strong>{index + 1}°</strong> {feedback.sugestao}
              </h6>
            </li>
          ))}
        </List>
      </div>
    </div>
  );
}

export default AsideFeedbacksLeanCanvas;

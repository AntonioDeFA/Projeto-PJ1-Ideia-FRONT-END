import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import "./styles.css";
import { ButtonGroup } from "@mui/material";
import { Button } from "@material-ui/core";
import Botao from "./../Botao/index";
import { MSG000 } from "./../../utils/mensagens";

function AsideFeedbacksLeanCanvas(props) {
  const [classesBtnPotencialidades, setClassesBtnPotencialidades] =
    useState(MSG000);
  const [classesBtnFragilidades, setClassesBtnFragilidades] = useState(MSG000);

  const [btnSelecionado, setBtnSelecionado] = useState("POTENCIALIDADES");

  const trocarListaFeedbacks = (tipoFeedback) => {
    setBtnSelecionado(tipoFeedback);
  };

  useEffect(() => {
    let classesBotaoPotencialidades =
      "btn botao-menor-personalizado class-btn-dado-equipe ";
    let classesBotaoFragilidades = classesBotaoPotencialidades;

    classesBotaoPotencialidades +=
      btnSelecionado === "POTENCIALIDADES" ? "btn-warning" : "btn-secondary";
    classesBotaoFragilidades +=
      btnSelecionado === "FRAGILIDADES" ? "btn-warning" : "btn-secondary";

    setClassesBtnPotencialidades(classesBotaoPotencialidades);
    setClassesBtnFragilidades(classesBotaoFragilidades);
  }, [btnSelecionado]);

  return (
    <div className="aside-feedbacks-lean-canvas">
      <div
        className="elementos-centralizados"
        id="listagens-feedbacks-filtragem"
      >
        <h1 className="titulos-principais">
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
        </h1>
      </div>

      <div className="feedbacks">{props.idLeanCanvas}</div>
    </div>
  );
}

export default AsideFeedbacksLeanCanvas;

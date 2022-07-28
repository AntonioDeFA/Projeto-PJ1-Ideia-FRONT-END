import React, { useState, useEffect, useContext, useRef } from "react";

import {
  List,
  Radio,
  RadioGroup,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  TextareaAutosize,
} from "@mui/material";

import api from "./../../services/api";
import Botao from "./../Botao/index";
import { MSG000 } from "./../../utils/mensagens";
import StoreContext from "./../../store/context";

import "./styles.css";

function AsideCriacaoFeedbacksLeanCanvas(props) {
  const [feedbacks, setFeedbacks] = useState(null);
  const [feedbacksPotencialidades, setFeedbacksPotencialidades] =
    useState(null);
  const [feedbacksFragilidades, setFeedbacksFragilidades] = useState(null);

  const [classesBtnPotencialidades, setClassesBtnPotencialidades] =
    useState(MSG000);
  const [classesBtnFragilidades, setClassesBtnFragilidades] = useState(MSG000);

  const [btnSelecionado, setBtnSelecionado] = useState("POTENCIALIDADES");

  const rdButtonPotencialidade = useRef(null);
  const rdButtonFragilidade = useRef(null);

  const [opcaoTipoFeedback, setOpcaoTipoFeedback] = useState("potencialidade");

  const { token } = useContext(StoreContext);

  const [feedback, setFeedback] = useState(MSG000);

  const handleRadioButtonsTipoFeedback = (event) => {
    setOpcaoTipoFeedback(event.target.value);
  };

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

    setClassesBtnPotencialidades(classesBotaoPotencialidades);
    setClassesBtnFragilidades(classesBotaoFragilidades);
  }, [btnSelecionado]);

  useEffect(() => {
    let listaPotencialidades = [];
    let listaFragilidades = [];

    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(
        `/lean-canvas/${props.idLeanCanvas}/EM_CONSULTORIA/feedbacks-consultoria`
      )
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
    <div className="aside-feedbacks-lean-canvas-em-elaboracao">
      <div
        className="elementos-centralizados"
        id="listagens-feedbacks-filtragem-em-elaboracao"
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

      <div className="feedbacks-em-elaboracao">
        <List
          sx={{
            width: "100%",
            position: "relative",
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          {feedbacks?.map((feedback, index) => (
            <li
              key={index}
              style={{ maxHeight: "150px", overflowY: "auto" }}
              className="rounded borda-laranja bg-white d-flex justify-content-start align-items-center mb-3 p-3 w-100"
            >
              <h6 style={{ wordBreak: "break-all", margin: 0 }}>
                <strong>{index + 1}°</strong> {feedback.sugestao}
              </h6>
            </li>
          ))}
        </List>
      </div>

      <hr className="separator" />

      <div id="criar-feedback-lean-canvas" className="mt-3">
        <div className="elementos-centralizados">
          <h5>Adicione um feedback</h5>
        </div>
        <FormControl component="fieldset">
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={opcaoTipoFeedback}
            onChange={handleRadioButtonsTipoFeedback}
          >
            <div className="d-flex">
              <FormControlLabel
                value="potencialidade"
                ref={rdButtonPotencialidade}
                control={
                  <Radio
                    sx={{
                      color: "#999",
                      "&.Mui-checked": {
                        color: "#FC7A00",
                      },
                    }}
                  />
                }
                label="Potencialidade"
              />
              <FormControlLabel
                value="fragilidade"
                ref={rdButtonFragilidade}
                control={
                  <Radio
                    sx={{
                      color: "#999",
                      "&.Mui-checked": {
                        color: "#FC7A00",
                      },
                    }}
                  />
                }
                label="Fragilidade"
              />
            </div>
          </RadioGroup>
        </FormControl>

        <TextareaAutosize
          aria-label="minimum height"
          minRows={2}
          placeholder="Digite aqui seu feedback"
          value={feedback}
          id="feedback-avaliativo-id"
          className="w-100 p-1"
          onChange={(event) => {
            setFeedback(event.target.value);
          }}
          style={{
            height: 100,
            resize: "none",
          }}
        />
        <Botao
          titulo="adicionar"
          onClick={() => trocarListaFeedbacks("FRAGILIDADES")}
          id="id-btn-feedbacks-fragilidades"
          classes="btn me-2 btn-warning botao-menor-personalizado"
        />
      </div>
    </div>
  );
}

export default AsideCriacaoFeedbacksLeanCanvas;

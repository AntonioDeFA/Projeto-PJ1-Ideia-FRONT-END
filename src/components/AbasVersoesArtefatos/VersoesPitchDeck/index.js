import React, { useContext, useEffect, useState } from "react";

import { ButtonGroup, List, TextareaAutosize } from "@mui/material";

import Botao from "../../Botao";
import api from "../../../services/api";
import StoreContext from "../../../store/context";
import { handleDataComHora } from "../../../services/utils";

import "./styles.css";

function VersoesPitchDeck(props) {
  const { token } = useContext(StoreContext);

  const [mudouFeedBacks, setMudouFeedbacks] = useState(true);
  const [mudouBotao, setMudouBotao] = useState(true);
  const [isPotencialidades, setIsPotencialidades] = useState(true);

  const [versoes, setVersoes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbacksPotencialidades, setFeedbacksPotencialidades] = useState([]);
  const [feedbacksFragilidades, setFeedbacksFragilidades] = useState([]);

  const escolherVersao = async (listaFeedbacks) => {
    feedbacks.splice(0, feedbacks.length);
    feedbacksPotencialidades.splice(0, feedbacksPotencialidades.length);
    feedbacksFragilidades.splice(0, feedbacksFragilidades.length);

    listaFeedbacks.forEach((feedback) => {
      if (feedback.tipoFeedback === "POTENCIALIDADE") {
        feedbacksPotencialidades.push(feedback);
      } else {
        feedbacksFragilidades.push(feedback);
      }
    });

    await setTimeout(() => {
      setFeedbacks(feedbacksPotencialidades);
      setIsPotencialidades(true);
      setMudouFeedbacks(false);
      setMudouFeedbacks(true);
    }, 400);
  };

  const trocarListaFeedbacks = async (tipo) => {
    if (tipo === "POTENCIALIDADES") {
      setFeedbacks(feedbacksPotencialidades);
      setIsPotencialidades(true);
    } else {
      setFeedbacks(feedbacksFragilidades);
      setIsPotencialidades(false);
    }

    await setTimeout(() => {
      setMudouFeedbacks(false);
      setMudouFeedbacks(true);
      setMudouBotao(false);
      setMudouBotao(true);
    }, 400);
  };

  const baixarArquivo = (arquivo, tipo) => {
    let tipoArquivo = "video/mp4;base64";

    if (tipo === "ARQUIVO") {
      tipoArquivo = "application/pdf;base64";
    }

    var byteCharacters = window.atob(arquivo);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: tipoArquivo });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    console.log("Baixando arquivo");
  };

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/pitch-deck/${props.idEquipe}/feedbacks-de-versoes-consultoria`)
      .then((response) => {
        setVersoes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="versoes-pitch-deck">
      {versoes.length !== 0 ? (
        <div className="d-flex justify-content-between">
          <div className="w-50 cor-background-feedbacks p-3">
            <div>
              <div className="botoes-principais">
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Botao
                    titulo="potencialidades"
                    onClick={() => trocarListaFeedbacks("POTENCIALIDADES")}
                    id="id-btn-feedbacks-potencialidades"
                    classes={
                      isPotencialidades
                        ? "btn btn-warning botao-menor-personalizado"
                        : "btn btn-secondary botao-menor-personalizado"
                    }
                  />
                  <Botao
                    titulo="fragilidades"
                    onClick={() => trocarListaFeedbacks("FRAGILIDADES")}
                    id="id-btn-feedbacks-fragilidades"
                    classes={
                      isPotencialidades
                        ? "btn btn-secondary botao-menor-personalizado"
                        : "btn btn-warning botao-menor-personalizado"
                    }
                  />
                </ButtonGroup>
              </div>

              <div id="id-lista-feedbacks" className="feedbacks">
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
          </div>
          <div className="w-50 p-3">
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 368,
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {versoes.listaVersoesPitch?.map((versao, index) => (
                <li
                  key={index}
                  className="rounded mb-3 pe-3 ps-3 borda-laranja align-self-center"
                >
                  <ul>
                    <li className="d-flex justify-content-between align-items-center mt-2 mb-2 w-100">
                      <i
                        className="fa fa-picture-o cursor-pointer"
                        onClick={() =>
                          escolherVersao(versao.feedbacksAvaliativos)
                        }
                        style={{ color: "#fc7a00", fontSize: "20pt" }}
                      ></i>

                      <h6 style={{ margin: 0 }}>
                        {handleDataComHora(versao.data)}
                      </h6>
                      <div className="align-self-center">
                        <i
                          className="fa-solid fa-download cursor-pointer"
                          onClick={() =>
                            baixarArquivo(versao.arquivoPitchDeck, versao.tipo)
                          }
                        ></i>
                      </div>
                    </li>
                  </ul>
                </li>
              ))}
            </List>
          </div>
        </div>
      ) : (
        <h5>Não existe nenhuma versão de pitch avaliada pelo consultor.</h5>
      )}
    </div>
  );
}

export default VersoesPitchDeck;

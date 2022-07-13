import React, { useContext, useEffect, useState } from "react";

import { List, TextareaAutosize } from "@mui/material";

import Botao from "../../Botao";

import "./styles.css";

function VersoesPitchDeck(props) {

  const [mudouFeedBacks, setMudouFeedbacks] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbacksPotencialidades, setFeedbacksPotencialidades] = useState([]);
  const [feedbacksFragilidades, setFeedbacksFragilidades] = useState([]);

  const escolherVersao = async (listaFeedbacks) => {
    console.log("ME CHAMOU")
    console.log("listaFeedbacks")
    console.log(listaFeedbacks)
    if (feedbacksPotencialidades.length > 0 && feedbacksFragilidades.length > 0) {
      setFeedbacksPotencialidades([]);
      setFeedbacksFragilidades([]);
    }

    listaFeedbacks.forEach((feedback) => {
      if (feedback.tipo === "POTENCIALIDADE") {
        feedbacksPotencialidades.push(feedback);
      } else {
        feedbacksFragilidades.push(feedback);
      }
    });
    setFeedbacks(feedbacksPotencialidades);

    await setTimeout(() => {
      setMudouFeedbacks(false);
      setMudouFeedbacks(true);
    }, 500);
    console.log(feedbacksPotencialidades)
    console.log(feedbacksFragilidades)
  }

  const trocarListaFeedbacks = async (tipo) => {
    console.log("feedbacks")
    console.log(feedbacks)
    setFeedbacks([]);
    if (tipo === "POTENCIALIDADES") {
      setFeedbacks(feedbacksPotencialidades);
      console.log(feedbacksPotencialidades)
    } else {
      setFeedbacks(feedbacksFragilidades);
      console.log(feedbacksFragilidades)
    }

    await setTimeout(() => {
      setMudouFeedbacks(false);
      setMudouFeedbacks(true);
    }, 400);
  }

  const baixarArquivo = (arquivo) => {
    console.log("Baixando arquivo");
  }

  let versoes = [
    {
      data: "29/11/2021 - 23:12",
      arquivo: "AAAAAAAAAAAAAAA",
      feedbacks: [
        {
          tipo: "POTENCIALIDADE",
          descricao: "Lorem ipsum dolor sit."
        },
        {
          tipo: "FRAGILIDADE",
          descricao: "praesentium quia."
        },
        {
          tipo: "POTENCIALIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        },
        {
          tipo: "FRAGILIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        }
      ]
    },
    {
      data: "29/11/2021 - 23:12",
      arquivo: "AAAAAAAAAAAAAAA",
      feedbacks: [
        {
          tipo: "POTENCIALIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        },
        {
          tipo: "FRAGILIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        },
        {
          tipo: "POTENCIALIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        },
        {
          tipo: "FRAGILIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        }
      ]
    },
    {
      data: "29/11/2021 - 23:12",
      arquivo: "AAAAAAAAAAAAAAA",
      feedbacks: [
        {
          tipo: "POTENCIALIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        },
        {
          tipo: "FRAGILIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        },
        {
          tipo: "POTENCIALIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        },
        {
          tipo: "FRAGILIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        }
      ]
    },
    {
      data: "29/11/2021 - 23:12",
      arquivo: "AAAAAAAAAAAAAAA",
      feedbacks: [
        {
          tipo: "POTENCIALIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        },
        {
          tipo: "FRAGILIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        },
        {
          tipo: "POTENCIALIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        },
        {
          tipo: "FRAGILIDADE",
          descricao: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, officia, culpa tempore, vitae tenetur molestiae sint odio cumque aut voluptas earum commodi dolore nostrum nobis dolor nihil? Iusto, praesentium quia."
        }
      ]
    }
  ]

  return (
    <div id="versoes-pitch-deck">
      <div className="d-flex justify-content-between">
        <div className="w-50 cor-background-feedbacks p-3">
          <div>
            <Botao
              titulo="potencialidades"
              onClick={() => trocarListaFeedbacks("POTENCIALIDADES")}
              id="id-btn-feedbacks-potencialidades"
              classes="btn btn-warning botao-menor-personalizado"
            />
          </div>
          <div className="mt-2">
            <Botao
              titulo="fragilidades"
              onClick={() => trocarListaFeedbacks("FRAGILIDADES")}
              id="id-btn-feedbacks-fragilidades"
              classes="btn btn-warning botao-menor-personalizado espacamento-botoes"
            />
          </div>
          <div id="id-lista-feedbacks" className="mt-3">
            <List
              className="cor-background-feedbacks"
              sx={{
                width: "100%",
                position: "relative",
                overflow: "auto",
                maxHeight: 368,
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {feedbacks.map((feedback, index) => (
                <li key={index} className="rounded mb-3 p-3 borda-laranja align-self-center cor-background-card">
                  <div>
                    <h6 className="mb-2">
                      {feedback.tipo}
                    </h6>
                  </div>
                  <div>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={2}
                      value={feedback.descricao}
                      className="w-100 p-2 ps-0 cor-background-card border-0"
                      style={{
                        height: 150,
                        resize: "none",
                      }}
                      disabled={true}
                    />
                  </div>

                </li>
              ))}
            </List>
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
            {versoes.map((versao, index) => (
              <li key={index} className="rounded mb-3 pe-3 ps-3 borda-laranja align-self-center">
                <ul>
                  <li
                    className="d-flex justify-content-between align-items-center mt-2 mb-2 w-100"
                  >
                    <i
                      className="fa fa-picture-o cursor-pointer"
                      onClick={() => escolherVersao(versao.feedbacks)}
                      style={{ color: "#fc7a00", fontSize: "20pt" }}
                    ></i>

                    <h6 style={{ margin: 0 }}>
                      Data: {versao.data}
                    </h6>
                    <div className="align-self-center">
                      <i
                        className="fa-solid fa-download cursor-pointer"
                        onClick={() => baixarArquivo(versao.arquivo)}
                      ></i>
                    </div>
                  </li>
                </ul>
              </li>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default VersoesPitchDeck;

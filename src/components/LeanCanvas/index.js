import React, { useContext, useState, useEffect } from "react";

import { TextareaAutosize } from "@mui/material";

import {
  MSG044,
  MSG045,
  MSG046,
  MSG047,
  MSG048,
  MSG049,
  MSG050,
  MSG051,
  MSG052,
} from "../../utils/mensagens";

import "./styles.css";

function LeanCanvas(props) {
  const {
    descricaoParcerias,
    descricaoAtividades,
    descricaoRecursos,
    descricaoProposta,
    descricaoRelacionamento,
    descricaoCanais,
    descricaoSegmentos,
    descricaoEstrutura,
    descricaoFonte,
  } = props;

  const [ajudaParcerias] = useState(MSG044);
  const [ajudaAtividades] = useState(MSG045);
  const [ajudaRecursos] = useState(MSG046);
  const [ajudaProposta] = useState(MSG047);
  const [ajudaRelacionamento] = useState(MSG048);
  const [ajudaCanais] = useState(MSG049);
  const [ajudaSegmentos] = useState(MSG050);
  const [ajudaEstrutura] = useState(MSG051);
  const [ajudaFonte] = useState(MSG052);

  return (
    <div id="lean-canvas">
      <div className="d-flex justify-content-between w-100">
        <div className="border border-dark w-100 border-end-0">
          <div id="campo-parcerias-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4 pb-1">Parcerias principais</h6>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fc7a00" }}
                title={ajudaParcerias}
              ></i>
            </div>
            <div className="text-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="digite aqui"
                defaultValue={descricaoParcerias != null ? descricaoParcerias : null}
                className="w-100 p-1"
                style={{
                  height: 350,
                  resize: "none",
                }}
              />
            </div>
          </div>
        </div>
        <div className="border border-dark w-100 border-end-0">
          <div id="campo-atividades-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4 pb-1">Atividades principais</h6>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fc7a00" }}
                title={ajudaAtividades}
              ></i>
            </div>
            <div className="text-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="digite aqui"
                defaultValue={descricaoAtividades != null ? descricaoAtividades : null}
                className="w-100 p-1"
                style={{
                  height: 150,
                  resize: "none",
                }}
              />
            </div>
          </div>
          <div className="border border-end-0 border-start-0 border-bottom-0 border-dark">
            <div id="campo-recursos-lean-canvas" className="p-2">
              <div className="d-flex justify-content-between">
                <h6>Recursos principais</h6>
                <i
                  className="fa fa-question-circle"
                  style={{ color: "#fc7a00" }}
                  title={ajudaRecursos}
                ></i>
              </div>
              <div className="text-center">
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={2}
                  placeholder="digite aqui"
                  defaultValue={descricaoRecursos != null ? descricaoRecursos : null}
                  className="w-100 p-1"
                  style={{
                    height: 150,
                    resize: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border border-dark w-100 border-end-0">
          <div id="campo-proposta-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4 pb-1">Proposta de valor</h6>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fc7a00" }}
                title={ajudaProposta}
              ></i>
            </div>
            <div className="text-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="digite aqui"
                defaultValue={descricaoProposta != null ? descricaoProposta : null}
                className="w-100 p-1"
                style={{
                  height: 350,
                  resize: "none",
                }}
              />
            </div>
          </div>
        </div>
        <div className="border border-dark w-100 border-end-0">
          <div id="campo-relacionamento-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6>Relacionamento com clientes</h6>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fc7a00" }}
                title={ajudaRelacionamento}
              ></i>
            </div>
            <div className="text-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="digite aqui"
                defaultValue={descricaoRelacionamento != null ? descricaoRelacionamento : null}
                className="w-100 p-1"
                style={{
                  height: 150,
                  resize: "none",
                }}
              />
            </div>
          </div>
          <div className="border border-end-0 border-start-0 border-bottom-0 border-dark">
            <div id="campo-canais-lean-canvas" className="p-2">
              <div className="d-flex justify-content-between">
                <h6>Canais</h6>
                <i
                  className="fa fa-question-circle"
                  style={{ color: "#fc7a00" }}
                  title={ajudaCanais}
                ></i>
              </div>
              <div className="text-center">
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={2}
                  placeholder="digite aqui"
                  defaultValue={descricaoCanais != null ? descricaoCanais : null}
                  className="w-100 p-1"
                  style={{
                    height: 150,
                    resize: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border border-dark w-100">
          <div id="campo-segmentos-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4 pb-1">Segmentos clientes</h6>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fc7a00" }}
                title={ajudaSegmentos}
              ></i>
            </div>
            <div className="text-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="digite aqui"
                defaultValue={descricaoSegmentos != null ? descricaoSegmentos : null}
                className="w-100 p-1"
                style={{
                  height: 350,
                  resize: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between w-100">
        <div className="border border-dark w-100 border-end-0 border-top-0">
          <div id="campo-estrutura-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6>Estrutura de custos</h6>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fc7a00" }}
                title={ajudaEstrutura}
              ></i>
            </div>
            <div className="text-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="digite aqui"
                defaultValue={descricaoEstrutura != null ? descricaoEstrutura : null}
                className="w-100 p-1"
                style={{
                  height: 150,
                  resize: "none",
                }}
              />
            </div>
          </div>
        </div>
        <div className="border border-dark w-100 border-top-0">
          <div id="campo-fonte-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6>Fonte de receita</h6>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fc7a00" }}
                title={ajudaFonte}
              ></i>
            </div>
            <div className="text-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="digite aqui"
                defaultValue={descricaoFonte != null ? descricaoFonte : null}
                className="w-100 p-1"
                style={{
                  height: 150,
                  resize: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeanCanvas;

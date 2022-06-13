import React, { useContext, useState, useEffect } from "react";

import { TextareaAutosize } from '@mui/material';
import {
  MSG043,
  MSG044,
  MSG045,
  MSG046,
  MSG047,
  MSG048,
  MSG049,
  MSG050,
  MSG051
} from "../../utils/mensagens";

import "./styles.css";

function LeanCanvas(props) {

  const {
    descricaoParcerias,
    descricaoAtividades,
    descricaoRecursos,
    descricaoProposta,
    descricaoRelacionamento,
    descricaoCanvas,
    descricaoSegmentos,
    descricaoEstrutura,
    descricaoFonte
  } = props;

  const [ajudaParcerias,] = useState(MSG043);
  const [ajudaAtividades,] = useState(MSG044);
  const [ajudaRecursos,] = useState(MSG045);
  const [ajudaProposta,] = useState(MSG046);
  const [ajudaRelacionamento,] = useState(MSG047);
  const [ajudaCanvas,] = useState(MSG048);
  const [ajudaSegmentos,] = useState(MSG049);
  const [ajudaEstrutura,] = useState(MSG050);
  const [ajudaFonte,] = useState(MSG051);

  const CampoLeanCanvas = (props) => {

    const { nomeCampo, descricao, ajuda, altura, classes } = props;

    return (
      <div id="campo-lean-canvas" className="p-2">
        <div className="d-flex justify-content-between">
          <h6 className={classes}>{nomeCampo}</h6>
          <i className="fa fa-question-circle" title={ajuda}></i>
        </div>
        <div className="text-center">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={2}
            placeholder="digite aqui"
            defaultValue={descricao != null ? descricao : null}
            className="w-100 p-1"
            style={{
              height: altura,
              resize: "none"
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div id="lean-canvas">
      <div className="d-flex justify-content-between w-100">
        <div className="border border-dark w-100 border-end-0">
          <CampoLeanCanvas
            nomeCampo="Parcerias principais"
            descricao={descricaoParcerias}
            ajuda={ajudaParcerias}
            altura={350}
            classes="mb-4 pb-1"
          />
        </div>
        <div className="border border-dark w-100 border-end-0">
          <div className="">
            <CampoLeanCanvas
              nomeCampo="Atividades principais"
              descricao={descricaoAtividades}
              ajuda={ajudaAtividades}
              altura={150}
              classes="mb-4 pb-1"
            />
          </div>
          <div className="border border-end-0 border-start-0 border-bottom-0 border-dark">
            <CampoLeanCanvas
              nomeCampo="Recursos principais"
              descricao={descricaoRecursos}
              ajuda={ajudaRecursos}
              altura={150}
            />
          </div>
        </div>
        <div className="border border-dark w-100 border-end-0">
          <CampoLeanCanvas
            nomeCampo="Proposta de valor"
            descricao={descricaoProposta}
            ajuda={ajudaProposta}
            altura={350}
            classes="mb-4 pb-1"
          />
        </div>
        <div className="border border-dark w-100 border-end-0">
          <div className="">
            <CampoLeanCanvas
              nomeCampo="Relacionamento com clientes"
              descricao={descricaoRelacionamento}
              ajuda={ajudaRelacionamento}
              altura={150}
            />
          </div>
          <div className="border border-end-0 border-start-0 border-bottom-0 border-dark">
            <CampoLeanCanvas
              nomeCampo="Canvas"
              descricao={descricaoCanvas}
              ajuda={ajudaCanvas}
              altura={150}
            />
          </div>
        </div>
        <div className="border border-dark w-100">
          <CampoLeanCanvas
            nomeCampo="Segmentos clientes"
            descricao={descricaoSegmentos}
            ajuda={ajudaSegmentos}
            altura={350}
            classes="mb-4 pb-1"
          />
        </div>
      </div>
      <div className="d-flex justify-content-between w-100">
        <div className="border border-dark w-100 border-end-0 border-top-0">
          <CampoLeanCanvas
            nomeCampo="Estrutura de custos"
            descricao={descricaoEstrutura}
            ajuda={ajudaEstrutura}
            altura={150}
          />
        </div>
        <div className="border border-dark w-100 border-top-0">
          <CampoLeanCanvas
            nomeCampo="Fonte de receita"
            descricao={descricaoFonte}
            ajuda={ajudaFonte}
            altura={150}
          />
        </div>
      </div>
    </div>
  );
}

export default LeanCanvas;
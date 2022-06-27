import React, { useContext, useState, useEffect } from "react";

import { TextareaAutosize } from "@mui/material";

import {
  MSG000,
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

  const [id, setId] = useState(0);
  const [problema, setProblema] = useState(MSG000);
  const [solucao, setSolucao] = useState(MSG000);
  const [metricas, setMetricas] = useState(MSG000);
  const [proposta, setProposta] = useState(MSG000);
  const [vantagem, setVantagem] = useState(MSG000);
  const [canais, setCanais] = useState(MSG000);
  const [segmentos, setSegmentos] = useState(MSG000);
  const [estrutura, setEstrutura] = useState(MSG000);
  const [fonte, setFonte] = useState(MSG000);
  const [etapaSolucaoCanvas, setetapaSolucaoCanvas] = useState(null);

  const [leanCanvas, setLeanCanvas] = useState({
    id: 0,
    problema: "",
    solucao: "",
    metricasChave: "",
    propostaValor: "",
    vantagemCompetitiva: "",
    canais: "",
    segmentosDeClientes: "",
    estruturaDeCusto: "",
    fontesDeReceita: "",
    etapaSolucaoCanvas: null
  });

  const [ajudaProblema] = useState(MSG044);
  const [ajudaSolucao] = useState(MSG045);
  const [ajudaMetricas] = useState(MSG046);
  const [ajudaProposta] = useState(MSG047);
  const [ajudaVantagem] = useState(MSG048);
  const [ajudaCanais] = useState(MSG049);
  const [ajudaSegmentos] = useState(MSG050);
  const [ajudaEstrutura] = useState(MSG051);
  const [ajudaFonte] = useState(MSG052);

  const handleProblema = () => {
    console.log("logou leanCanvas")
    console.log(leanCanvas)
    console.log("logou campo problema")
    console.log(problema)
    leanCanvas.problema = problema;
    props.handleLeanCanvas(leanCanvas);
    console.log("logou leanCanvas 2")
    console.log(leanCanvas)
    console.log("logou campo problema 2")
    console.log(problema)
  }

  const handleSolucao = () => {
    leanCanvas.solucao = solucao;
    props.handleLeanCanvas(leanCanvas);
  }

  const handleMetricas = () => {
    leanCanvas.metricasChave = metricas;
    props.handleLeanCanvas(leanCanvas);
  }

  const handleProposta = () => {
    leanCanvas.propostaValor = proposta;
    props.handleLeanCanvas(leanCanvas);
  }

  const handleVantagem = () => {
    leanCanvas.vantagemCompetitiva = vantagem;
    props.handleLeanCanvas(leanCanvas);
  }

  const handleCanais = () => {
    leanCanvas.canais = canais;
    props.handleLeanCanvas(leanCanvas);
  }

  const handleSegmentos = () => {
    leanCanvas.segmentosDeClientes = segmentos;
    props.handleLeanCanvas(leanCanvas);
  }

  const handleEstrutura = () => {
    leanCanvas.estruturaDeCusto = estrutura;
    props.handleLeanCanvas(leanCanvas);
  }

  const handleFonte = () => {
    leanCanvas.fontesDeReceita = fonte;
    props.handleLeanCanvas(leanCanvas);
  }

  return (
    <div id="lean-canvas">
      <div className="d-flex justify-content-between w-100">
        <div className="border border-dark w-100 border-end-0">
          <div id="campo-problema-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4 pb-1">Problema</h6>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fc7a00" }}
                title={ajudaProblema}
              ></i>
            </div>
            <div className="text-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="digite aqui"
                defaultValue={problema}
                // value={problema}
                className="w-100 p-1"
                onChange={() => {
                  handleProblema();
                }}
                style={{
                  height: 350,
                  resize: "none",
                }}
              />
            </div>
          </div>
        </div>
        <div className="border border-dark w-100 border-end-0">
          <div id="campo-solucao-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4 pb-1">Solução</h6>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fc7a00" }}
                title={ajudaSolucao}
              ></i>
            </div>
            <div className="text-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="digite aqui"
                defaultValue={solucao}
                className="w-100 p-1"
                onChange={() => {
                  handleSolucao();
                }}
                style={{
                  height: 150,
                  resize: "none",
                }}
              />
            </div>
          </div>
          <div className="border border-end-0 border-start-0 border-bottom-0 border-dark">
            <div id="campo-metricas-lean-canvas" className="p-2">
              <div className="d-flex justify-content-between">
                <h6>Métricas chave</h6>
                <i
                  className="fa fa-question-circle"
                  style={{ color: "#fc7a00" }}
                  title={ajudaMetricas}
                ></i>
              </div>
              <div className="text-center">
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={2}
                  placeholder="digite aqui"
                  defaultValue={metricas}
                  className="w-100 p-1"
                  onChange={() => {
                    handleMetricas();
                  }}
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
                defaultValue={proposta}
                className="w-100 p-1"
                onChange={() => {
                  handleProposta();
                }}
                style={{
                  height: 350,
                  resize: "none",
                }}
              />
            </div>
          </div>
        </div>
        <div className="border border-dark w-100 border-end-0">
          <div id="campo-vantagem-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6>Vantagem Competitiva</h6>
              <i
                className="fa fa-question-circle"
                style={{ color: "#fc7a00" }}
                title={ajudaVantagem}
              ></i>
            </div>
            <div className="text-center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="digite aqui"
                defaultValue={vantagem}
                className="w-100 p-1"
                onChange={() => {
                  handleVantagem();
                }}
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
                  defaultValue={canais}
                  className="w-100 p-1"
                  onChange={() => {
                    handleCanais();
                  }}
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
                defaultValue={segmentos}
                className="w-100 p-1"
                onChange={() => {
                  handleSegmentos();
                }}
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
                defaultValue={estrutura}
                className="w-100 p-1"
                onChange={() => {
                  handleEstrutura();
                }}
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
                defaultValue={fonte}
                className="w-100 p-1"
                onChange={() => {
                  handleFonte();
                }}
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

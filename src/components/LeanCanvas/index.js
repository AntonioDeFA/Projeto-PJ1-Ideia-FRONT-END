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
  const { leanCanvas } = props;

  const [problema, setProblema] = useState(MSG000);
  const [solucao, setSolucao] = useState(MSG000);
  const [metricas, setMetricas] = useState(MSG000);
  const [proposta, setProposta] = useState(MSG000);
  const [vantagem, setVantagem] = useState(MSG000);
  const [canais, setCanais] = useState(MSG000);
  const [segmentos, setSegmentos] = useState(MSG000);
  const [estrutura, setEstrutura] = useState(MSG000);
  const [fonte, setFonte] = useState(MSG000);

  const [ajudaProblema] = useState(MSG044);
  const [ajudaSolucao] = useState(MSG045);
  const [ajudaMetricas] = useState(MSG046);
  const [ajudaProposta] = useState(MSG047);
  const [ajudaVantagem] = useState(MSG048);
  const [ajudaCanais] = useState(MSG049);
  const [ajudaSegmentos] = useState(MSG050);
  const [ajudaEstrutura] = useState(MSG051);
  const [ajudaFonte] = useState(MSG052);

  const handleProblema = (newValue) => {
    leanCanvas.problema = newValue;
    props.handleLeanCanvas(leanCanvas);
  };

  const handleSolucao = (newValue) => {
    leanCanvas.solucao = newValue;
    props.handleLeanCanvas(leanCanvas);
  };

  const handleMetricas = (newValue) => {
    leanCanvas.metricasChave = newValue;
    props.handleLeanCanvas(leanCanvas);
  };

  const handleProposta = (newValue) => {
    leanCanvas.propostaValor = newValue;
    props.handleLeanCanvas(leanCanvas);
  };

  const handleVantagem = (newValue) => {
    leanCanvas.vantagemCompetitiva = newValue;
    props.handleLeanCanvas(leanCanvas);
  };

  const handleCanais = (newValue) => {
    leanCanvas.canais = newValue;
    props.handleLeanCanvas(leanCanvas);
  };

  const handleSegmentos = (newValue) => {
    leanCanvas.segmentosDeClientes = newValue;
    props.handleLeanCanvas(leanCanvas);
  };

  const handleEstrutura = (newValue) => {
    leanCanvas.estruturaDeCusto = newValue;
    props.handleLeanCanvas(leanCanvas);
  };

  const handleFonte = (newValue) => {
    leanCanvas.fontesDeReceita = newValue;
    props.handleLeanCanvas(leanCanvas);
  };

  useEffect(() => {
    setProblema(leanCanvas.problema);
    setSolucao(leanCanvas.solucao);
    setMetricas(leanCanvas.metricasChave);
    setProposta(leanCanvas.propostaValor);
    setVantagem(leanCanvas.vantagemCompetitiva);
    setCanais(leanCanvas.canais);
    setSegmentos(leanCanvas.segmentosDeClientes);
    setEstrutura(leanCanvas.estruturaDeCusto);
    setFonte(leanCanvas.fontesDeReceita);
  }, []);

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
                value={problema}
                className="w-100 p-1"
                onChange={(event) => {
                  setProblema(event.target.value);
                  handleProblema(event.target.value);
                }}
                style={{
                  height: 350,
                  resize: "none",
                }}
                disabled={props.isTelaFeedbacks}
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
                value={solucao}
                className="w-100 p-1"
                onChange={(event) => {
                  setSolucao(event.target.value);
                  handleSolucao(event.target.value);
                }}
                style={{
                  height: 150,
                  resize: "none",
                }}
                disabled={props.isTelaFeedbacks}
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
                  value={metricas}
                  className="w-100 p-1"
                  onChange={(event) => {
                    setMetricas(event.target.value);
                    handleMetricas(event.target.value);
                  }}
                  style={{
                    height: 150,
                    resize: "none",
                  }}
                  disabled={props.isTelaFeedbacks}
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
                value={proposta}
                className="w-100 p-1"
                onChange={(event) => {
                  setProposta(event.target.value);
                  handleProposta(event.target.value);
                }}
                style={{
                  height: 350,
                  resize: "none",
                }}
                disabled={props.isTelaFeedbacks}
              />
            </div>
          </div>
        </div>
        <div className="border border-dark w-100 border-end-0">
          <div id="campo-vantagem-lean-canvas" className="p-2">
            <div className="d-flex justify-content-between">
              <h6 className={props.isTelaFeedbacks ? "" : "mb-4 pb-1"}>
                Vantagem Competitiva
              </h6>
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
                value={vantagem}
                className="w-100 p-1"
                onChange={(event) => {
                  setVantagem(event.target.value);
                  handleVantagem(event.target.value);
                }}
                style={{
                  height: 150,
                  resize: "none",
                }}
                disabled={props.isTelaFeedbacks}
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
                  value={canais}
                  className="w-100 p-1"
                  onChange={(event) => {
                    setCanais(event.target.value);
                    handleCanais(event.target.value);
                  }}
                  style={{
                    height: 150,
                    resize: "none",
                  }}
                  disabled={props.isTelaFeedbacks}
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
                value={segmentos}
                className="w-100 p-1"
                onChange={(event) => {
                  setSegmentos(event.target.value);
                  handleSegmentos(event.target.value);
                }}
                style={{
                  height: 350,
                  resize: "none",
                }}
                disabled={props.isTelaFeedbacks}
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
                value={estrutura}
                className="w-100 p-1"
                onChange={(event) => {
                  setEstrutura(event.target.value);
                  handleEstrutura(event.target.value);
                }}
                style={{
                  height: 150,
                  resize: "none",
                }}
                disabled={props.isTelaFeedbacks}
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
                value={fonte}
                className="w-100 p-1"
                onChange={(event) => {
                  setFonte(event.target.value);
                  handleFonte(event.target.value);
                }}
                style={{
                  height: 150,
                  resize: "none",
                }}
                disabled={props.isTelaFeedbacks}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeanCanvas;

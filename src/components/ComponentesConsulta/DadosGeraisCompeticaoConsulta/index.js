import React, { useContext, useState, useEffect } from "react";

import api from "./../../../services/api";
import Botao from "./../../Botao/index";
import StoreContext from "./../../../store/context";
import { formatarData, obterDatas } from "../../../services/utils";
import {
  MSG000,
  MSG032,
  MSG033,
  MSG034,
  MSG035,
} from "./../../../utils/mensagens";

import "./styles.css";
import { TextField } from "@mui/material";

function DadosGeraisCompeticaoConsulta(props) {
  const [nome, setNome] = useState(MSG000);
  const [dominio, setDominio] = useState(MSG000);
  const [regulamento, setRegulamento] = useState(MSG000);
  const [tempoMaxPitch, setTempoMaxPitch] = useState(MSG000);
  const [qntdMinMembros, setQntdMinMembros] = useState(MSG000);
  const [qntdMaxMembros, setQntdMaxMembros] = useState(MSG000);
  const [dataInicioInscricoes, setDataInicioInscricoes] = useState(MSG000);
  const [dataTerminoInscricoes, setDataTerminoInscricoes] = useState(MSG000);
  const [dataInicioAquecimento, setDataInicioAquecimento] = useState(MSG000);
  const [dataTerminoAquecimento, setDataTerminoAquecimento] = useState(MSG000);
  const [dataInicioImersao, setDataInicioImersao] = useState(MSG000);
  const [dataTerminoImersao, setDataTerminoImersao] = useState(MSG000);
  const [dataInicioPitch, setDataInicioPitch] = useState(MSG000);
  const [dataTerminoPitch, setDataTerminoPitch] = useState(MSG000);

  const { token } = useContext(StoreContext);

  const buscarDadosGerais = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/competicao/dados-gerais/${props?.id}`).then((response) => {
      const { data } = response;

      setNome(data.nomeCompeticao);
      setDominio(data.dominioCompeticao);
      setRegulamento(data.arquivoRegulamentoCompeticao);
      setTempoMaxPitch(data.tempoMaximoVideoEmSeg / 60);
      setQntdMinMembros(data.qntdMinimaMembrosPorEquipe);
      setQntdMaxMembros(data.qntdMaximaMembrosPorEquipe);

      let etapa1 = obterDatas(data.etapas, MSG032);
      let etapa2 = obterDatas(data.etapas, MSG033);
      let etapa3 = obterDatas(data.etapas, MSG034);
      let etapa4 = obterDatas(data.etapas, MSG035);

      let data1 = formatarData(etapa1.dataInicio);
      let data2 = formatarData(etapa1.dataTermino);
      let data3 = formatarData(etapa2.dataInicio);
      let data4 = formatarData(etapa2.dataTermino);
      let data5 = formatarData(etapa3.dataInicio);
      let data6 = formatarData(etapa3.dataTermino);
      let data7 = formatarData(etapa4.dataInicio);
      let data8 = formatarData(etapa4.dataTermino);

      setDataInicioInscricoes(data1.toLocaleDateString());
      setDataTerminoInscricoes(data2.toLocaleDateString());
      setDataInicioAquecimento(data3.toLocaleDateString());
      setDataTerminoAquecimento(data4.toLocaleDateString());
      setDataInicioImersao(data5.toLocaleDateString());
      setDataTerminoImersao(data6.toLocaleDateString());
      setDataInicioPitch(data7.toLocaleDateString());
      setDataTerminoPitch(data8.toLocaleDateString());
    });
  };

  const baixarRegulamento = () => {
    var byteCharacters = window.atob(regulamento);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: "application/pdf;base64" });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  useEffect(() => {
    buscarDadosGerais();
  }, [props.id]);

  return (
    <div id="id-panel-dados-gerais" className="d-flex justify-content-between">
      <div id="id-dados-da-competicao">
        <h5 className="mb-5">Dados da Competição</h5>

        <div className="div-input-readonly">
          <TextField
            readOnly
            type="text"
            size="small"
            value={nome}
            color="warning"
            variant="filled"
            label="Nome da Competição"
            className="input-readonly"
          />
        </div>

        <div className="d-flex justify-content-between div-input-readonly">
          <div style={{ marginRight: "30px" }}>
            <TextField
              readOnly
              type="text"
              size="small"
              color="warning"
              variant="filled"
              value={qntdMinMembros}
              className="input-small"
              label="Min. membros por equipe"
            />
          </div>
          <div>
            <TextField
              readOnly
              type="text"
              size="small"
              color="warning"
              variant="filled"
              value={qntdMaxMembros}
              className="input-small"
              label="Max. membros por equipe"
            />
          </div>
        </div>

        <div className="div-input-readonly">
          <TextField
            readOnly
            type="text"
            size="small"
            color="warning"
            variant="filled"
            className="input-readonly"
            label="Domínio restrito para inscritos"
            value={!!dominio ? dominio : "Não há um domínio especificado"}
          />
        </div>

        <div className="div-input-readonly">
          <TextField
            readOnly
            type="text"
            size="small"
            color="warning"
            variant="filled"
            value={tempoMaxPitch}
            className="input-small"
            label="Tempo máx. pitch(min)"
          />
        </div>
      </div>

      <div id="id-etapas-da-competicao">
        <h5 className="mb-5">Etapas da Competição</h5>

        <div className="d-flex justify-content-between div-input-readonly">
          <div style={{ marginRight: "30px" }}>
            <TextField
              readOnly
              type="text"
              size="small"
              color="warning"
              variant="filled"
              value={dataInicioInscricoes}
              className="input-small"
              label="Início inscrições"
            />
          </div>
          <div>
            <TextField
              readOnly
              type="text"
              size="small"
              color="warning"
              variant="filled"
              value={dataTerminoInscricoes}
              className="input-small"
              label="Término inscrições"
            />
          </div>
        </div>

        <div className="d-flex justify-content-between div-input-readonly">
          <div style={{ marginRight: "30px" }}>
            <TextField
              readOnly
              type="text"
              size="small"
              color="warning"
              variant="filled"
              value={dataInicioAquecimento}
              className="input-small"
              label="Início aquecimento"
            />
          </div>
          <div>
            <TextField
              readOnly
              type="text"
              size="small"
              color="warning"
              variant="filled"
              value={dataTerminoAquecimento}
              className="input-small"
              label="Término aquecimento"
            />
          </div>
        </div>

        <div className="d-flex justify-content-between div-input-readonly">
          <div style={{ marginRight: "30px" }}>
            <TextField
              readOnly
              type="text"
              size="small"
              color="warning"
              variant="filled"
              value={dataInicioImersao}
              className="input-small"
              label="Início imersão"
            />
          </div>
          <div>
            <TextField
              readOnly
              type="text"
              size="small"
              color="warning"
              variant="filled"
              value={dataTerminoImersao}
              className="input-small"
              label="Término imersão"
            />
          </div>
        </div>

        <div className="d-flex justify-content-between div-input-readonly">
          <div style={{ marginRight: "30px" }}>
            <TextField
              readOnly
              type="text"
              size="small"
              color="warning"
              variant="filled"
              value={dataInicioPitch}
              className="input-small"
              label="Início pitch"
            />
          </div>
          <div>
            <TextField
              readOnly
              type="text"
              size="small"
              color="warning"
              variant="filled"
              value={dataTerminoPitch}
              className="input-small"
              label="Término pitch"
            />
          </div>
        </div>

        <Botao
          id="btn-regulamento-para-teste"
          classes="btn btn-warning botao-menor-personalizado"
          titulo="Regulamento da competição"
          onClick={() => baixarRegulamento()}
        >
          <i className="fa-solid fa-download"></i>
        </Botao>
      </div>
    </div>
  );
}

export default DadosGeraisCompeticaoConsulta;

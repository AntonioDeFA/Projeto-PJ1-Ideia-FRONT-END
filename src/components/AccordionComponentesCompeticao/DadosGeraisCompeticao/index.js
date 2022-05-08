import React, { useState } from "react";

import { Box, Input, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  MSG000,
  MSG015,
  MSG016,
  MSG017,
  MSG018,
  MSG019,
  MSG021,
} from "../../../utils/mensagens";

import "./styles.css";
import { UploadFile } from "@mui/icons-material";
import Botao from "../../Botao";
import { validarCamposObrigatorios } from "./../../../services/utils";

function DadosGeraisCompeticao(props) {
  const [nome, setNome] = useState(MSG000);
  const [dominio, setDominio] = useState(MSG000);
  const [regulamento, setRegulamento] = useState(MSG000);
  const [tempoMaxPitch, setTempoMaxPitch] = useState(MSG000);
  const [qntdMinMembros, setQntdMinMembros] = useState(MSG000);
  const [qntdMaxMembros, setQntdMaxMembros] = useState(MSG000);
  const [dataInicioInscricoes, setDataInicioInscricoes] = useState(null);
  const [dataTerminoInscricoes, setDataTerminoInscricoes] = useState(null);

  const [errorNome, setErrorNome] = useState(false);
  const [errorRegulamento, setErrorRegulamento] = useState(false);
  const [errorTempoMaxPitch, setErrorTempoMaxPitch] = useState(false);
  const [errorQntdMinMembros, setErrorQntdMinMembros] = useState(false);
  const [errorQntdMaxMembros, setErrorQntdMaxMembros] = useState(false);
  const [errorDataInicioInscricoes, setErrorDataInicioInscricoes] =
    useState(false);
  const [errorDataTerminoInscricoes, setErrorDataTerminoInscricoes] =
    useState(false);

  const [mensagemNome, setMensagemNome] = useState(MSG000);
  const [mensagemRegulamento, setMensagemRegulamento] = useState(MSG000);
  const [mensagemTempoMaxPitch, setMensagemTempoMaxPitch] = useState(MSG000);
  const [mensagemQntdMinMembros, setMensagemQntdMinMembros] = useState(MSG000);
  const [mensagemQntdMaxMembros, setMensagemQntdMaxMembros] = useState(MSG000);
  const [mensagemDataInicioInscricoes, setMensagemDataInicioInscricoes] =
    useState(MSG000);
  const [mensagemDataTerminoInscricoes, setMensagemDataTerminoInscricoes] =
    useState(MSG000);

  const salvarDadosGerais = () => {
    props.setDadosGeraisOk(false);
    let statusNome = validarCamposObrigatorios(
      nome,
      setErrorNome,
      setMensagemNome
    );

    let statusTempoMaxPitch = validarCamposObrigatorios(
      tempoMaxPitch,
      setErrorTempoMaxPitch,
      setMensagemTempoMaxPitch
    );

    let statusQntdMinMembros = validarCamposObrigatorios(
      qntdMinMembros,
      setErrorQntdMinMembros,
      setMensagemQntdMinMembros
    );

    let statusQntdMaxMembros = validarCamposObrigatorios(
      qntdMaxMembros,
      setErrorQntdMaxMembros,
      setMensagemQntdMaxMembros
    );

    let statusDataInicioInscricoes = validarCamposObrigatorios(
      dataInicioInscricoes,
      setErrorDataInicioInscricoes,
      setMensagemDataInicioInscricoes
    );
    let statusDataTerminoInscricoes = validarCamposObrigatorios(
      dataTerminoInscricoes,
      setErrorDataTerminoInscricoes,
      setMensagemDataTerminoInscricoes
    );

    if (
      statusNome &&
      statusTempoMaxPitch &&
      statusQntdMinMembros &&
      statusQntdMaxMembros &&
      statusDataInicioInscricoes &&
      statusDataTerminoInscricoes
    ) {
      let hoje = new Date();
      if (tempoMaxPitch < 3) {
        setErrorTempoMaxPitch(true);
        setMensagemTempoMaxPitch(MSG015);
      } else if (qntdMinMembros < 1) {
        setErrorQntdMinMembros(true);
        setMensagemQntdMinMembros(MSG016);
      } else if (qntdMaxMembros <= qntdMinMembros) {
        setErrorQntdMaxMembros(true);
        setMensagemQntdMaxMembros(MSG017);
      } else if (dataInicioInscricoes <= hoje) {
        setErrorDataInicioInscricoes(true);
        setMensagemDataInicioInscricoes(MSG021);
      } else if (dataInicioInscricoes > dataTerminoInscricoes) {
        setErrorDataTerminoInscricoes(true);
        setMensagemDataTerminoInscricoes(MSG018);
      } else if (nome.length < 3 || nome.length > 16) {
        setErrorNome(true);
        setMensagemNome(MSG019);
      } else {
        const dadosGerais = {
          nome,
          dominio,
          regulamento,
          tempoMaxPitch,
          qntdMinMembros,
          qntdMaxMembros,
          dataInicioInscricoes,
          dataTerminoInscricoes,
        };
        props.handleDadosGerais(dadosGerais);
      }
    }
  };

  return (
    <div id="dados-gerais-content">
      <Box component="form" noValidate autoComplete="off">
        <div className="datas-inicio-termino inputs-lado-a-lado">
          <div id="dataInicioDiv">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={{ color: "#ffc107" }}
                format="DD-MM-YYYY"
                disablePast
                label="Inicio das inscrições *"
                value={dataInicioInscricoes}
                onChange={(dataInicioInscricoes) => {
                  setDataInicioInscricoes(new Date(dataInicioInscricoes));
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    className="input-irmao"
                    color="warning"
                    variant="filled"
                    id="input-data-inicio-inscricoes"
                    helperText={mensagemDataInicioInscricoes}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div id="dataTerminoDiv" className="input-irmao-direito">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={{ color: "#ffc107" }}
                format="DD-MM-YYYY"
                disablePast
                minDate={dataInicioInscricoes}
                label="Término das inscrições *"
                value={dataTerminoInscricoes}
                onChange={(dataTerminoInscricoes) => {
                  setDataTerminoInscricoes(new Date(dataTerminoInscricoes));
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    className="input-irmao"
                    color="warning"
                    variant="filled"
                    id="input-data-termino-inscricoes"
                    helperText={mensagemDataTerminoInscricoes}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div>
          <TextField
            className="input-cadastro-competicao"
            error={errorNome}
            helperText={mensagemNome}
            id="input-nome-competicao"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
            label="Nome da competição *"
            type="text"
            variant="filled"
            color="warning"
            size="small"
          />
        </div>

        <div className="inputs-lado-a-lado">
          <div id="qntdMinMemrosDiv">
            <TextField
              className="input-irmao"
              error={errorQntdMinMembros}
              helperText={mensagemQntdMinMembros}
              id="input-data-inicio-inscricoes"
              value={qntdMinMembros}
              onChange={(e) => {
                setQntdMinMembros(e.target.value);
              }}
              label="Qntd mín. de membros *"
              type="number"
              variant="filled"
              color="warning"
              size="small"
            />
          </div>
          <div id="qntdMaxMemrosDiv" className="input-irmao-direito">
            <TextField
              className="input-irmao"
              error={errorQntdMaxMembros}
              helperText={mensagemQntdMaxMembros}
              id="input-data-inicio-inscricoes"
              value={qntdMaxMembros}
              onChange={(e) => {
                setQntdMaxMembros(e.target.value);
              }}
              label="Qntd máx. de membros *"
              type="number"
              variant="filled"
              color="warning"
              size="small"
              min="3"
            />
          </div>
        </div>

        <div>
          <TextField
            className="input-cadastro-competicao"
            id="input-dominio-competicao"
            value={dominio}
            onChange={(e) => {
              setDominio(e.target.value);
            }}
            label="Domínio restrito para inscritos"
            type="text"
            variant="filled"
            color="warning"
            size="small"
            placeholder="Ex.: gmail.com"
          />
        </div>

        <div className="input-cadastro-competicao">
          <label htmlFor="contained-button-file">
            <Input
              id="contained-button-file"
              multiple
              type="file"
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              color="warning"
              component="span"
              startIcon={<UploadFile />}
            >
              <strong>Regulamento da competição</strong>
            </Button>
          </label>
        </div>

        <div id="tempoMaximoPitch" className="input-cadastro-competicao">
          <TextField
            className="input-irmao"
            error={errorTempoMaxPitch}
            helperText={mensagemTempoMaxPitch}
            id="input-data-inicio-inscricoes"
            value={tempoMaxPitch}
            onChange={(e) => {
              setTempoMaxPitch(e.target.value);
            }}
            label="Tempo máx. pitch (min) *"
            type="number"
            variant="filled"
            color="warning"
            size="small"
          />
        </div>
      </Box>
      <div className="input-cadastro-competicao">
        <Botao
          titulo="salvar dados gerais"
          classes="btn btn-warning botao-menor-personalizado"
          id="btn-salvar-dados-gerais-competicao"
          onClick={salvarDadosGerais}
        />
      </div>
    </div>
  );
}

export default DadosGeraisCompeticao;

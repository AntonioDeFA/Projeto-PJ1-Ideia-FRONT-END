import React, { useState } from "react";

import { Box, Input, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MSG000 } from "../../../utils/mensagens";

import "./styles.css";
import { UploadFile } from "@mui/icons-material";

function DadosGeraisCompeticao() {
  const [nome, setNome] = useState(MSG000);
  const [dominio, setDominio] = useState(MSG000);
  const [regulamento, setRegulamento] = useState(MSG000);
  const [tempoMaxPitch, setTempoMaxPitch] = useState(MSG000);
  const [qntdMinMembros, setQntdMinMembros] = useState(MSG000);
  const [qntdMaxMembros, setQntdMaxMembros] = useState(MSG000);
  const [dataInicioInscricoes, setDataInicioInscricoes] = useState(null);
  const [dataTerminoInscricoes, setDataTerminoInscricoes] = useState(null);

  const [errorNome, setErrorNome] = useState(MSG000);
  const [errorDominio, setErrorDominio] = useState(MSG000);
  const [errorRegulamento, setErrorRegulamento] = useState(MSG000);
  const [errorTempoMaxPitch, setErrorTempoMaxPitch] = useState(MSG000);
  const [errorQntdMinMembros, setErrorQntdMinMembros] = useState(MSG000);
  const [errorQntdMaxMembros, setErrorQntdMaxMembros] = useState(MSG000);
  const [errorDataInicioInscricoes, setErrorDataInicioInscricoes] =
    useState(MSG000);
  const [errorDataTerminoInscricoes, setErrorDataTerminoInscricoes] =
    useState(MSG000);

  const [mensagemNome, setMensagemNome] = useState(MSG000);
  const [mensagemDominio, setMensagemDominio] = useState(MSG000);
  const [mensagemRegulamento, setMensagemRegulamento] = useState(MSG000);
  const [mensagemTempoMaxPitch, setMensagemTempoMaxPitch] = useState(MSG000);
  const [mensagemQntdMinMembros, setMensagemQntdMinMembros] = useState(MSG000);
  const [mensagemQntdMaxMembros, setMensagemQntdMaxMembros] = useState(MSG000);
  const [mensagemDataInicioInscricoes, setMensagemDataInicioInscricoes] =
    useState(MSG000);
  const [mensagemDataTerminoInscricoes, setMensagemDataTerminoInscricoes] =
    useState(MSG000);

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
                label="Inicio das inscrições"
                value={dataInicioInscricoes}
                onChange={(dataInicioInscricoes) => {
                  setDataInicioInscricoes(dataInicioInscricoes);
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    className="input-irmao"
                    color="warning"
                    variant="filled"
                    id="input-data-inicio-inscricoes"
                    error={errorDataInicioInscricoes}
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
                label="Término das inscrições"
                value={dataTerminoInscricoes}
                onChange={(dataTerminoInscricoes) => {
                  setDataTerminoInscricoes(dataTerminoInscricoes);
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    className="input-irmao"
                    color="warning"
                    variant="filled"
                    id="input-data-termino-inscricoes"
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
            label="Nome da competição"
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
              label="Qntd mín. de membros"
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
              label="Qntd máx. de membros"
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
            error={errorDominio}
            helperText={mensagemDominio}
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

        <div id="tempoMaximoPitch">
          <TextField
            className="input-irmao"
            error={errorTempoMaxPitch}
            helperText={mensagemTempoMaxPitch}
            id="input-data-inicio-inscricoes"
            value={tempoMaxPitch}
            onChange={(e) => {
              setTempoMaxPitch(e.target.value);
            }}
            label="Tempo máx. pitch (min)"
            type="number"
            variant="filled"
            color="warning"
            size="small"
          />
        </div>
      </Box>
    </div>
  );
}

export default DadosGeraisCompeticao;

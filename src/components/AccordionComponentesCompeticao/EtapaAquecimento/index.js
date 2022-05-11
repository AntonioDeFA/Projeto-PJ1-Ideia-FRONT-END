import React, { useContext, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Input, TextField } from "@mui/material";

import Table from "@mui/material/Table";
import Botao from "../../Botao";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import IdCompeticaoContext from "../../../utils/context/idCompeticaoContext";
import {
  MSG000,
  MSG006,
  MSG018,
  MSG027,
  MSG031,
} from "../../../utils/mensagens";
import DadosGeraisContext from "../../../utils/context/dadosGeraisContext";
import {
  saoDuasDatasIguais,
  validarCamposObrigatorios,
} from "../../../services/utils";

import "./styles.css";
import Mensagem from "../../Mensagem";

function EtapaAquecimento(props) {
  const dadosGerais = useContext(DadosGeraisContext);
  const idCompeticaoHook = useContext(IdCompeticaoContext);

  const [dataInicioAquecimento, setDataInicioAquecimento] = useState(null);
  const [dataTerminoAquecimento, setDataTerminoAquecimento] = useState(null);

  const [, setErrorDataInicioAquecimento] = useState(false);
  const [, setErrorDataTerminoAquecimento] = useState(false);

  const [mensagemDataInicioAquecimento, setMensagemDataInicioAquecimento] =
    useState(MSG000);
  const [mensagemDataTerminoAquecimento, setMensagemDataTerminoAquecimento] =
    useState(MSG000);

  const [mensagemLink, setMensagemLink] = useState(MSG000);
  const [errorLink, setErrorLink] = useState(false);
  const [link, setLink] = useState(MSG000);

  const [arquivo, setArquivo] = useState(MSG000);

  const [links, setLinks] = useState([]);
  const [arquivos, setArquivos] = useState([]);

  const [mudou, setMudou] = useState(true);
  const [mensagemErro, setMensagemErro] = useState(MSG000);

  const salvarEtapaAquecimento = () => {
    props.setEtapaAquecimentoOk(false);

    let statusDataInicioAquecimento = validarCamposObrigatorios(
      dataInicioAquecimento,
      setErrorDataInicioAquecimento,
      setMensagemDataInicioAquecimento
    );
    let statusDataTerminoAquecimento = validarCamposObrigatorios(
      dataTerminoAquecimento,
      setErrorDataTerminoAquecimento,
      setMensagemDataTerminoAquecimento
    );

    if (statusDataInicioAquecimento && statusDataTerminoAquecimento) {
      if (dataInicioAquecimento > dataTerminoAquecimento) {
        setErrorDataTerminoAquecimento(true);
        setMensagemDataTerminoAquecimento(MSG018);
      } else if (
        dadosGerais.dataTerminoInscricoes > dataInicioAquecimento ||
        saoDuasDatasIguais(
          dadosGerais.dataTerminoInscricoes,
          dataInicioAquecimento
        )
      ) {
        setErrorDataInicioAquecimento(true);
        setMensagemDataInicioAquecimento(MSG027);
      } else if (links.length === 0 && arquivos.length === 0) {
        setMensagemErro(MSG031);
      } else {
        setMensagemErro(MSG000);
        const dadosAquecimento = {
          dataInicioAquecimento,
          dataTerminoAquecimento,
        };
        props.handleEtapaAquecimento(dadosAquecimento);
      }
    }
  };

  const adicionarLink = async () => {
    if (link) {
      links.push(link);
    }
    await setTimeout(() => {
      setMudou(false);
      setMudou(true);
    }, 100);

    setLink(MSG000);
  };

  const adicionarArquivo = () => {
    if (arquivo) {
      arquivos.push(arquivo);
    }
  };

  const removerLink = async (index) => {
    links.splice(index, 1);
    let linksAtt = links;

    await setTimeout(() => {
      setLinks(linksAtt);
    }, 400);

    setMudou(false);
    setMudou(true);
  };

  const removerArquivo = async (index) => {
    arquivos.splice(index - 1, 1);
    let arquivosAtt = arquivos;

    await setTimeout(() => {
      setArquivos(arquivosAtt);
    }, 400);
  };

  const Tables = () => {
    return (
      <div className="inputs-lado-a-lado mt-4">
        <TableContainer component={Paper} className="me-2">
          <Table sx={{ minWidth: 170 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Nome (links)</TableCell>
                <TableCell align="right">Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mudou
                ? links.map((url, index) => (
                    <TableRow
                      key={url}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {url}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          className="me-2"
                          onClick={() => removerLink(index)}
                        >
                          <i className="fa-solid fa-trash-can p-0"></i>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} className="ms-2 me-2">
          <Table sx={{ minWidth: 170 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Nome (Arquivo)</TableCell>
                <TableCell align="right">Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arquivos.map((documento) => (
                <TableRow
                  key={documento}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {documento}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      className="me-2"
                      onClick={removerArquivo}
                    >
                      <i className="fa-solid fa-trash-can p-0"></i>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  return (
    <div id="etapa-aquecimento-content">
      <div style={{ width: "50%", marginBottom: "20px" }}>
        {mensagemErro !== "" ? (
          <Mensagem mensagem={mensagemErro} tipoMensagem={MSG006} />
        ) : null}
      </div>
      <Box component="form" noValidate autoComplete="off">
        <div className="datas-inicio-termino inputs-lado-a-lado">
          <div id="dataInicioDiv">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={{ color: "#ffc107" }}
                format="DD-MM-YYYY"
                disablePast
                label="Inicio da etapa *"
                value={dataInicioAquecimento}
                onChange={(dataInicioAquecimento) => {
                  setDataInicioAquecimento(new Date(dataInicioAquecimento));
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    className="input-irmao"
                    color="warning"
                    variant="filled"
                    id="input-data-inicio-Aquecimento"
                    helperText={mensagemDataInicioAquecimento}
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
                minDate={dataInicioAquecimento}
                label="Término da etapa *"
                value={dataTerminoAquecimento}
                onChange={(dataTerminoAquecimento) => {
                  setDataTerminoAquecimento(new Date(dataTerminoAquecimento));
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    className="input-irmao"
                    color="warning"
                    variant="filled"
                    id="input-data-termino-Aquecimento"
                    helperText={mensagemDataTerminoAquecimento}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
      </Box>
      <div>
        <TextField
          className="input-cadastro-competicao"
          error={errorLink}
          helperText={mensagemLink}
          id="input-link"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
          label="Adicione um link da internet *"
          type="text"
          variant="filled"
          color="warning"
          size="small"
        />
      </div>
      <div className="inputs-lado-a-lado">
        <div className="w-50">
          <Botao
            titulo="adicionar"
            classes="btn btn-warning botao-menor-personalizado "
            onClick={adicionarLink}
          />
        </div>
        <div className="w-50 me-2">
          <div className="inputs-lado-a-lado justify-content-end">
            <label htmlFor="contained-button-file">
              <Input
                id="contained-button-file"
                type="file"
                value={arquivo}
                style={{ display: "none" }}
              />
              <h6 className="border rounded p-2 mb-0 mt-2">
                Upload de arquivos
              </h6>
            </label>
            <Button
              className="rounded-pill ms-3"
              variant="contained"
              color="warning"
              component="span"
              onClick={adicionarArquivo}
            >
              <strong>+</strong>
            </Button>
          </div>
        </div>
      </div>
      <Tables />

      <div className="input-cadastro-competicao mt-4">
        <Botao
          titulo="salvar dados"
          classes="btn btn-warning botao-menor-personalizado"
          id="btn-salvar-dados-etapa-aquecimento"
          onClick={salvarEtapaAquecimento}
        />
      </div>
    </div>
  );
}

export default EtapaAquecimento;

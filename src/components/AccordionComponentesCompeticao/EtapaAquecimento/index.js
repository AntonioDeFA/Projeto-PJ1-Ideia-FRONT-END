import React, { useContext, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, TextField } from "@mui/material";

import Table from "@mui/material/Table";
import Botao from "../../Botao";
import Mensagem from "../../Mensagem";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import {
  MSG000,
  MSG018,
  MSG027,
  MSG006,
  MSG004,
  MSG031,
} from "../../../utils/mensagens";
import DadosGeraisContext from "../../../utils/context/dadosGeraisContext";
import {
  saoDuasDatasIguais,
  validarCamposObrigatorios,
} from "../../../services/utils";

import "./styles.css";

function EtapaAquecimento(props) {
  const dadosGerais = useContext(DadosGeraisContext);

  const [dataInicioAquecimento, setDataInicioAquecimento] = useState(null);
  const [dataTerminoAquecimento, setDataTerminoAquecimento] = useState(null);

  const [, setErrorDataInicioAquecimento] = useState(false);
  const [, setErrorDataTerminoAquecimento] = useState(false);

  const [mensagemDataInicioAquecimento, setMensagemDataInicioAquecimento] =
    useState(MSG000);
  const [mensagemDataTerminoAquecimento, setMensagemDataTerminoAquecimento] =
    useState(MSG000);
  const [mensagemErro, setMensagemErro] = useState(MSG000);

  const [mensagemLink, setMensagemLink] = useState(MSG000);
  const [errorLink, setErrorLink] = useState(false);
  const [link, setLink] = useState(MSG000);

  const [links, setLinks] = useState([]);
  const [arquivos, setArquivos] = useState([]);

  const [mudou, setMudou] = useState(true);

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
          materiaisDeEstudo: formatarArrayMateriaisDeEstudo(),
        };

        props.handleEtapaAquecimento(dadosAquecimento);
      }
    }
  };

  const adicionarLink = async () => {
    setErrorLink(false);
    setMensagemLink(MSG000);

    if (!!link) {
      links.push({
        link,
        tipo: "LINK",
      });

      await setTimeout(() => {
        setMudou(false);
        setMudou(true);
      }, 100);
    } else {
      setErrorLink(true);
      setMensagemLink(MSG004);
    }

    setLink(MSG000);
  };

  const adicionarArquivo = async () => {
    let arquivoInput = document.getElementById("id-arquivo").files[0];

    if (arquivoInput) {
      let tipo = "VIDEO";
      let extensaoPdf = /(.pdf)$/i;

      if (extensaoPdf.exec(arquivoInput.name)) {
        tipo = "PDF";
      }

      arquivos.push({
        arquivoInput,
        tipo,
      });
    }

    await setTimeout(() => {
      setMudou(false);
      setMudou(true);
    }, 100);
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
    arquivos.splice(index, 1);
    let arquivosAtt = arquivos;

    await setTimeout(() => {
      setArquivos(arquivosAtt);
    }, 400);

    setMudou(false);
    setMudou(true);
  };

  const formatarArrayMateriaisDeEstudo = () => {
    let materiais = [];

    atribuirMaterialLink(materiais, links);
    atribuirMaterialEstudo(materiais, arquivos);

    return materiais;
  };

  const atribuirMaterialLink = (materiais, array) => {
    array.forEach((material) =>
      materiais.push({
        link: material.link,
        tipoMaterialEstudo: material.tipo,
        categoriaMaterialEstudo: {
          enumeracao: 1,
          nome: "Categoria 1",
        },
      })
    );
  };

  const atribuirMaterialEstudo = (materiais, array) => {
    array.forEach((material) => {
      var reader = new FileReader();
      var fileByteArray = [];
      reader.readAsArrayBuffer(material.arquivoInput);
      reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
          var arrayBuffer = evt.target.result,
            array = new Uint8Array(arrayBuffer);
          for (var i = 0; i < array.length; i++) {
            fileByteArray.push(array[i]);
          }
        }
      };

      materiais.push({
        arquivoEstudo: fileByteArray,
        tipoMaterialEstudo: material.tipo,
        categoriaMaterialEstudo: {
          enumeracao: 2,
          nome: "Categoria 2",
        },
      });
    });
  };

  const Tables = () => {
    return (
      <div className="inputs-lado-a-lado mt-3">
        <TableContainer component={Paper} className="me-2">
          <Table sx={{ minWidth: 170 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Links anexados</TableCell>
                <TableCell align="right">Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mudou
                ? links.map((url, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {url.link}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          className="me-1"
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
        <TableContainer component={Paper} className="ms-2">
          <Table sx={{ minWidth: 170 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Arquivos anexados</TableCell>
                <TableCell align="right">Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mudou
                ? arquivos.map((documento, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {documento.arquivoInput.name}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          className="me-2"
                          onClick={() => removerArquivo(index)}
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
      </div>
    );
  };

  return (
    <div id="etapa-aquecimento-content">
      <div style={{ width: "50%" }} className="mb-3">
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

      <div className="row mt-5">
        <div className="col d-flex justify-content-between align-items-center">
          <TextField
            className="input-cadastro-competicao-icone-plus"
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
          <Button
            className="rounded-pill ms-3"
            variant="contained"
            color="warning"
            component="span"
            onClick={adicionarLink}
          >
            <i className="fa-solid fa-plus icon-plus"></i>
          </Button>
        </div>
        <div className="col d-flex justify-content-between align-items-center input-group">
          <input
            type="file"
            id="id-arquivo"
            name="avatar"
            accept="video/*,.pdf"
            className="input-file-aquecimento form-control"
          />
          <Button
            className="rounded-pill ms-3"
            variant="contained"
            color="warning"
            component="span"
            onClick={adicionarArquivo}
          >
            <i className="fa-solid fa-plus icon-plus"></i>
          </Button>
        </div>
      </div>

      <Tables />

      <div className="input-cadastro-competicao mt-4">
        <Botao
          titulo="salvar"
          classes="btn btn-warning botao-menor-personalizado"
          id="btn-salvar-dados-etapa-aquecimento"
          onClick={salvarEtapaAquecimento}
        />
      </div>
    </div>
  );
}

export default EtapaAquecimento;

import React, { useState } from "react";
import { Box, Input, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MSG000 } from "../../../utils/mensagens";
import Botao from "../../Botao";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./styles.css";

function EtapaAquecimento() {

  const [dataInicioInscricoes, setDataInicioInscricoes] = useState(null);
  const [dataTerminoInscricoes, setDataTerminoInscricoes] = useState(null);
  const [mensagemDataInicioInscricoes, setMensagemDataInicioInscricoes] =
    useState(MSG000);
  const [mensagemDataTerminoInscricoes, setMensagemDataTerminoInscricoes] =
    useState(MSG000);

  const [mensagemLink, setMensagemLink] = useState(MSG000);
  const [errorLink, setErrorLink] = useState(false);
  const [link, setLink] = useState(MSG000);

  const [arquivo, setArquivo] = useState(MSG000);


  const [links, setLinks] = useState([]);
  const [arquivos, setArquivos] = useState([]);

  const [mudou, setMudou] = useState(true);

  const Tables = () => {

    return (
      < div className="inputs-lado-a-lado mt-4" >
        <TableContainer component={Paper} className="me-2 ms-2">
          <Table sx={{ minWidth: 170 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Nome (links)</TableCell>
                <TableCell align="right">Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {links.map((url, index) => (
                <TableRow
                  key={url}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {url}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton edge="end" aria-label="delete" className="me-2" onClick={removerLink}>
                      <i className="fa-solid fa-trash-can p-0"></i>
                    </IconButton>
                  </TableCell>
                </TableRow>

              ))}
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
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {documento}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton edge="end" aria-label="delete" className="me-2" onClick={removerArquivo}>
                      <i className="fa-solid fa-trash-can p-0"></i>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div >
    );
  }

  const adicionarLink = () => {
    if (link) {
      links.push(link);
    }
  }

  const adicionarArquivo = () => {
    if (arquivo) {
      arquivos.push(arquivo);
    }
  }

  const removerLink = async (index) => {

    links.splice(index - 1, 1);
    let linksAtt = links;

    await setTimeout(() => {
      setLinks(linksAtt);
    }, 400);

  }

  const removerArquivo = async (index) => {

    arquivos.splice(index - 1, 1);
    let arquivosAtt = arquivos;

    await setTimeout(() => {
      setArquivos(arquivosAtt);
    }, 400);

  }

  return (
    <div id="etapa-aquecimento-content">
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
            titulo="ADICIONAR"
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
    </div>
  );
}

export default EtapaAquecimento;

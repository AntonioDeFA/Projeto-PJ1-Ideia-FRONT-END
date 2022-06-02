import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import api from "../../../services/api";
import Botao from "../../Botao";
import Mensagem from "../../Mensagem";
import StoreContext from "../../../store/context";
import DadosGeraisContext from "../../../utils/context/dadosGeraisContext";
import IsAtualizarContext from "../../../utils/context/isAtualizarContext";
import IdCompeticaoContext from "../../../utils/context/idCompeticaoContext";
import {
  MSG000,
  MSG006,
  MSG004,
  MSG018,
  MSG027,
  MSG031,
  MSG033,
} from "../../../utils/mensagens";
import {
  obterDatas,
  isDataDefault,
  saoDuasDatasIguais,
  formatarEtapasParaPatch,
  validarCamposObrigatorios,
} from "../../../services/utils";

import "./styles.css";

function EtapaAquecimento(props) {
  const dadosGerais = useContext(DadosGeraisContext);
  const IsAtualizar = useContext(IsAtualizarContext);
  const idCompeticaoHook = useContext(IdCompeticaoContext);

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

  const [datasInformadas, setDatasInformadas] = useState(true);

  const { token } = useContext(StoreContext);

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

        api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
        api
          .get(`/competicao/dados-gerais/${idCompeticaoHook}`)
          .then((response) => {
            let etapas = formatarEtapasParaPatch(response.data.etapas);

            etapas.map((etapa) => {
              if (etapa.tipoEtapa === MSG033) {
                etapa.dataInicio = [
                  Number(dadosAquecimento.dataInicioAquecimento.getFullYear()),
                  Number(dadosAquecimento.dataInicioAquecimento.getMonth()) + 1,
                  Number(dadosAquecimento.dataInicioAquecimento.getDate()),
                ];
                etapa.dataTermino = [
                  Number(dadosAquecimento.dataTerminoAquecimento.getFullYear()),
                  Number(dadosAquecimento.dataTerminoAquecimento.getMonth()) +
                    1,
                  Number(dadosAquecimento.dataTerminoAquecimento.getDate()),
                ];
              }
            });

            api.defaults.headers.patch["Authorization"] = `Bearer ${token}`;
            api
              .patch(`/competicao/update/${idCompeticaoHook}`, {
                etapas,
                materiaisDeEstudo: dadosAquecimento.materiaisDeEstudo,
                isElaboracao: true,
              })
              .then((response) => {
                console.log(response.data);
                props.handleEtapaAquecimento(dadosAquecimento);
              })
              .catch((error) => {
                console.log(error.response.data);
              });
          })
          .catch((error) => {
            console.log(error);
          });
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
      props.setEtapaAquecimentoOk(false);

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
      let result = await toBase64(arquivoInput);
      result = result.replace("data:video/mp4;base64,", "");

      let nome = arquivoInput.name;

      let tipo = "VIDEO";
      let extensaoPdf = /(.pdf)$/i;

      if (extensaoPdf.exec(arquivoInput.name)) {
        tipo = "PDF";
        result = result.replace("data:application/pdf;base64,", "");
      }

      arquivos.push({
        nome,
        result,
        tipo,
      });

      props.setEtapaAquecimentoOk(false);
    }

    await setTimeout(() => {
      setMudou(false);
      setMudou(true);
    }, 100);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const removerLink = async (index) => {
    links.splice(index, 1);
    let linksAtt = links;
    props.setEtapaAquecimentoOk(false);

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
    props.setEtapaAquecimentoOk(false);

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
      materiais.push({
        arquivoEstudo: material.result,
        tipoMaterialEstudo: material.tipo,
        categoriaMaterialEstudo: {
          enumeracao: 2,
          nome: "Categoria 2",
        },
      });
    });
  };

  const [dadosGeraisConsultados, setDadosGeraisConsultados] = useState(null);

  useEffect(() => {
    let data1 = new Date();
    let data2 = new Date();

    if (IsAtualizar) {
      api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
      api
        .get(`/competicao/dados-gerais/${idCompeticaoHook}`)
        .then((response) => {
          setDadosGeraisConsultados(response.data);

          let datas = obterDatas(response.data.etapas, MSG033);
          if (
            isDataDefault(
              datas?.dataInicio[2],
              datas?.dataInicio[1],
              datas?.dataInicio[0]
            ) &&
            isDataDefault(
              datas?.dataTermino[2],
              datas?.dataTermino[1],
              datas?.dataTermino[0]
            )
          ) {
            setDatasInformadas(false);
            props.setEtapaAquecimentoOk(false);
          } else {
            setDatasInformadas(true);
            data1.setDate(datas?.dataInicio[2]);
            data1.setMonth(datas?.dataInicio[1] - 1);
            data1.setFullYear(datas?.dataInicio[0]);
            setDataInicioAquecimento(data1);

            data2.setDate(datas?.dataTermino[2]);
            data2.setMonth(datas?.dataTermino[1] - 1);
            data2.setFullYear(datas?.dataTermino[0]);
            setDataTerminoAquecimento(data2);
          }

          api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
          api.get(`/${idCompeticaoHook}/materiais-estudo`).then((response) => {
            const { data } = response;

            let listaLinks = [];
            let listaArquivos = [];

            data.map((material, index) => {
              if (material.tipoMaterialEstudo === "LINK") {
                listaLinks.push({
                  link: material.link,
                  tipo: "LINK",
                });
              } else {
                listaArquivos.push({
                  nome: "Material da competição " + (index + 1),
                  result: material.arquivoEstudo,
                  tipo: material.tipoMaterialEstudo,
                });
                // TODO atribuir arquivos aqui
              }
            });

            setLinks(listaLinks);
            setArquivos(listaArquivos);

            if (
              datasInformadas &&
              (listaLinks.length !== 0 || listaArquivos.length !== 0)
            ) {
              const dadosAquecimento = {
                dataInicioAquecimento: data1,
                dataTerminoAquecimento: data2,
                materiaisDeEstudo: formatarArrayMateriaisDeEstudo(),
              };
              props.handleEtapaAquecimento(dadosAquecimento, false);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [idCompeticaoHook]);

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
                        <a
                          href={url.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.link}
                        </a>
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
                        {documento.nome}
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
                disabled={IsAtualizar && datasInformadas}
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
                disabled={IsAtualizar && datasInformadas}
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

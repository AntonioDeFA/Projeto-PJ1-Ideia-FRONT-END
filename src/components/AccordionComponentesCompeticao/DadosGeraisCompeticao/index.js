import React, { useContext, useState, useEffect } from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import api from "./../../../services/api";
import Botao from "../../Botao";
import Mensagem from "../../Mensagem";
import StoreContext from "../../../store/context";
import IsAtualizarContext from "../../../utils/context/isAtualizarContext";
import idCompeticaoContext from "../../../utils/context/idCompeticaoContext";
import DadosGeraisConsultadosContext from "../../../utils/context/dadosGeraisConsultadosContext";
import {
  obterDatas,
  validarCamposObrigatorios,
} from "./../../../services/utils";
import {
  MSG000,
  MSG006,
  MSG015,
  MSG016,
  MSG017,
  MSG018,
  MSG019,
  MSG021,
  MSG032,
  MSG033,
  MSG034,
  MSG035,
  MSG037,
} from "../../../utils/mensagens";

import "./styles.css";

function DadosGeraisCompeticao(props) {
  const idCompeticaoHook = useContext(idCompeticaoContext);
  const IsAtualizar = useContext(IsAtualizarContext);
  const dadosGeraisConsultados = useContext(DadosGeraisConsultadosContext);

  const [nome, setNome] = useState(MSG000);
  const [dominio, setDominio] = useState(MSG000);
  const [regulamento, setRegulamento] = useState(MSG000);
  const [tempoMaxPitch, setTempoMaxPitch] = useState(MSG000);
  const [qntdMinMembros, setQntdMinMembros] = useState(MSG000);
  const [qntdMaxMembros, setQntdMaxMembros] = useState(MSG000);
  const [dataInicioInscricoes, setDataInicioInscricoes] = useState(null);
  const [dataTerminoInscricoes, setDataTerminoInscricoes] = useState(null);

  const [errorNome, setErrorNome] = useState(false);
  const [errorTempoMaxPitch, setErrorTempoMaxPitch] = useState(false);
  const [errorQntdMinMembros, setErrorQntdMinMembros] = useState(false);
  const [errorQntdMaxMembros, setErrorQntdMaxMembros] = useState(false);
  const [, setErrorDataInicioInscricoes] = useState(false);
  const [, setErrorDataTerminoInscricoes] = useState(false);
  const [contemArquivo, setContemArquivo] = useState(false);

  const [mensagemNome, setMensagemNome] = useState(MSG000);
  const [mensagemTempoMaxPitch, setMensagemTempoMaxPitch] = useState(MSG000);
  const [mensagemQntdMinMembros, setMensagemQntdMinMembros] = useState(MSG000);
  const [mensagemQntdMaxMembros, setMensagemQntdMaxMembros] = useState(MSG000);
  const [mensagemDataInicioInscricoes, setMensagemDataInicioInscricoes] =
    useState(MSG000);
  const [mensagemDataTerminoInscricoes, setMensagemDataTerminoInscricoes] =
    useState(MSG000);

  const [mensagemErro, setMensagemErro] = useState(MSG000);

  const { token } = useContext(StoreContext);

  const salvarDadosGerais = async () => {
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
      // let arquivoInput = document.getElementById("contained-button-file")
      //   .files[0];

      if (tempoMaxPitch < 3) {
        setErrorTempoMaxPitch(true);
        setMensagemTempoMaxPitch(MSG015);
      } else if (qntdMinMembros < 1) {
        setErrorQntdMinMembros(true);
        setMensagemQntdMinMembros(MSG016);
      } else if (Number(qntdMaxMembros) <= Number(qntdMinMembros)) {
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
      } else if (!contemArquivo) {
        setMensagemErro(MSG037);
      } else {
        setMensagemErro(MSG000);

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

        let novaCompeticao = {
          nomeCompeticao: nome,
          qntdMaximaMembrosPorEquipe: Number(qntdMaxMembros),
          qntdMinimaMembrosPorEquipe: Number(qntdMinMembros),
          tempoMaximoVideoEmSeg: Number(tempoMaxPitch) * 60,
          arquivoRegulamentoCompeticao: regulamento,
          dominioCompeticao: dominio,
          etapas: [
            {
              dataInicio: [
                Number(dataInicioInscricoes.getFullYear()),
                Number(dataInicioInscricoes.getMonth()) + 1,
                Number(dataInicioInscricoes.getDate()),
              ],
              dataTermino: [
                Number(dataTerminoInscricoes.getFullYear()),
                Number(dataTerminoInscricoes.getMonth()) + 1,
                Number(dataTerminoInscricoes.getDate()),
              ],
              tipoEtapa: MSG032,
            },
            {
              dataInicio: [2000, 1, 1],
              dataTermino: [2000, 1, 1],
              tipoEtapa: MSG033,
            },
            {
              dataInicio: [2000, 1, 1],
              dataTermino: [2000, 1, 1],
              tipoEtapa: MSG034,
            },
            {
              dataInicio: [2000, 1, 1],
              dataTermino: [2000, 1, 1],
              tipoEtapa: MSG035,
            },
          ],
        };

        salvarCompeticaoEmElaboracao(novaCompeticao, dadosGerais);
        setContemArquivo(false);
      }
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFormatarDocumento = async () => {
    let arquivoInput = document.getElementById("contained-button-file")
      .files[0];
    let result = await toBase64(arquivoInput);
    result = result.replace("data:application/pdf;base64,", "");
    setTimeout(() => {
      setRegulamento(result);
      setContemArquivo(true);
    }, 400);
  };

  const salvarCompeticaoEmElaboracao = (competicao, dadosGerais) => {
    setMensagemErro(MSG000);
    if (idCompeticaoHook === 0) {
      api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
      api
        .post("/competicao", competicao)
        .then((response) => {
          props.setIdCompeticaoHook(response.data.idCompeticao);
          props.handleDadosGerais(dadosGerais);
        })
        .catch((error) => {
          console.log(error.response.data);
          setMensagemErro(error.response.data.motivosErros[0]);
        });
    } else {
      api.defaults.headers.put["Authorization"] = `Bearer ${token}`;
      api
        .put(`/competicao/update/${idCompeticaoHook}`, competicao)
        .then((response) => {
          props.handleDadosGerais(dadosGerais);
        })
        .catch((error) => {
          console.log(error.response.data);
          setMensagemErro(error.response.data.motivosErros[0]);
        });
    }
  };

  useEffect(() => {
    if (IsAtualizar) {
      let datas = obterDatas(dadosGeraisConsultados?.etapas, MSG032);
      console.log(datas);

      setNome(dadosGeraisConsultados?.nomeCompeticao);
      setQntdMinMembros(dadosGeraisConsultados?.qntdMinimaMembrosPorEquipe);
      setQntdMaxMembros(dadosGeraisConsultados?.qntdMaximaMembrosPorEquipe);
      setTempoMaxPitch(dadosGeraisConsultados?.tempoMaximoVideoEmSeg / 60);
      setDominio(dadosGeraisConsultados?.dominioCompeticao);
      adicionarArquivoAoInput(
        dadosGeraisConsultados?.arquivoRegulamentoCompeticao
      );
      // TODO setar regulamento

      let data1 = new Date();
      data1.setDate(datas?.dataInicio[2]);
      data1.setMonth(datas?.dataInicio[1] - 1);
      data1.setFullYear(datas?.dataInicio[0]);
      setDataInicioInscricoes(data1);

      let data2 = new Date();
      data2.setDate(datas?.dataTermino[2]);
      data2.setMonth(datas?.dataTermino[1] - 1);
      data2.setFullYear(datas?.dataTermino[0]);
      setDataTerminoInscricoes(data2);

      const dadosGerais = {
        nome: dadosGeraisConsultados?.nomeCompeticao,
        dominio: dadosGeraisConsultados?.dominioCompeticao,
        regulamento,
        tempoMaxPitch: dadosGeraisConsultados?.tempoMaximoVideoEmSeg / 60,
        qntdMinMembros: dadosGeraisConsultados?.qntdMinimaMembrosPorEquipe,
        qntdMaxMembros: dadosGeraisConsultados?.qntdMaximaMembrosPorEquipe,
        dataInicioInscricoes: data1,
        dataTerminoInscricoes: data2,
      };

      props.handleDadosGerais(dadosGerais, false);
    }
  }, [dadosGeraisConsultados]);

  const adicionarArquivoAoInput = (regulamento) => {
    setRegulamento(dadosGeraisConsultados?.arquivoRegulamentoCompeticao);
    setContemArquivo(true);
  };

  return (
    <div id="dados-gerais-content">
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
                disabled={IsAtualizar}
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
                disabled={IsAtualizar}
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
              disabled={IsAtualizar}
              className="input-irmao"
              error={errorQntdMinMembros}
              helperText={mensagemQntdMinMembros}
              id="input-data-qntd-min-membros"
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
              disabled={IsAtualizar}
              className="input-irmao"
              error={errorQntdMaxMembros}
              helperText={mensagemQntdMaxMembros}
              id="input-data-qntd-max-membros"
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
            disabled={IsAtualizar}
            className="input-cadastro-competicao"
            id="input-dominio-competicao"
            value={dominio}
            onChange={(e) => {
              setDominio(e.target.value);
            }}
            label="Domínio restrito para participantes"
            type="text"
            variant="filled"
            color="warning"
            size="small"
            placeholder="Ex.: gmail.com"
          />
        </div>

        <div className="input-cadastro-competicao">
          <label htmlFor="contained-button-file">
            Regulamento da competição
            <input
              type="file"
              id="contained-button-file"
              accept=".pdf"
              className="form-control"
              onChange={(e) => {
                handleFormatarDocumento();
              }}
            />
          </label>
          {IsAtualizar ? (
            <h6 className="text-success mt-2">
              Você já possui um regulamento, mas pode subistituí-lo se desejar.
            </h6>
          ) : null}
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
          titulo="salvar"
          classes="btn btn-warning botao-menor-personalizado"
          id="btn-salvar-dados-gerais-competicao"
          onClick={salvarDadosGerais}
        />
      </div>
    </div>
  );
}

export default DadosGeraisCompeticao;

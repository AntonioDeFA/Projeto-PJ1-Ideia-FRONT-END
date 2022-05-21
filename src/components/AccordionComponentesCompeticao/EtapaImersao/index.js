import React, { useContext, useEffect, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import api from "../../../services/api";
import Botao from "../../Botao";
import Mensagem from "../../Mensagem";
import StoreContext from "../../../store/context";
import IsAtualizarContext from "../../../utils/context/isAtualizarContext";
import IdCompeticaoContext from "../../../utils/context/idCompeticaoContext";
import EtapaAquecimentoContext from "../../../utils/context/etapaAquecimentoContext";
import TabelaAddConsultorAvaliador from "../../Tabelas/TabelaAddConsultorAvaliador";
import DadosGeraisConsultadosContext from "../../../utils/context/dadosGeraisConsultadosContext";
import {
  MSG000,
  MSG006,
  MSG018,
  MSG024,
  MSG028,
  MSG034,
  MSG040,
} from "../../../utils/mensagens";
import {
  formatarEtapasParaPatch,
  isDataDefault,
  saoDuasDatasIguais,
  validarCamposObrigatorios,
} from "../../../services/utils";

import "./styles.css";

function EtapaImersao(props) {
  const IsAtualizar = useContext(IsAtualizarContext);
  const dadosAquecimento = useContext(EtapaAquecimentoContext);
  const idCompeticaoHook = useContext(IdCompeticaoContext);
  const dadosGeraisConsultados = useContext(DadosGeraisConsultadosContext);

  const [dataInicioImersao, setDataInicioImersao] = useState(null);
  const [dataTerminoImersao, setDataTerminoImersao] = useState(null);

  const [, setErrorDataInicioImersao] = useState(false);
  const [, setErrorDataTerminoImersao] = useState(false);

  const [mensagemDataInicioImersao, setMensagemDataInicioImersao] =
    useState(MSG000);
  const [mensagemDataTerminoImersao, setMensagemDataTerminoImersao] =
    useState(MSG000);

  const [qntdConsultores, setQntdConsultores] = useState(0);

  const [mensagemErro, setMensagemErro] = useState(MSG000);

  const [datasInformadas, setDatasInformadas] = useState(true);

  const { token } = useContext(StoreContext);

  const handleQntdUsuarios = (quantidade) => {
    setQntdConsultores(quantidade);
    if (quantidade <= 0) {
      props.setEtapaImersaoOk(false);
    }
  };

  const salvarEtapaImersao = () => {
    props.setEtapaImersaoOk(false);
    setMensagemErro(MSG000);

    let statusDataInicioImersao = validarCamposObrigatorios(
      dataInicioImersao,
      setErrorDataInicioImersao,
      setMensagemDataInicioImersao
    );
    let statusDataTerminoImersao = validarCamposObrigatorios(
      dataTerminoImersao,
      setErrorDataTerminoImersao,
      setMensagemDataTerminoImersao
    );

    if (statusDataInicioImersao && statusDataTerminoImersao) {
      if (dataInicioImersao > dataTerminoImersao) {
        setErrorDataTerminoImersao(true);
        setMensagemDataTerminoImersao(MSG018);
      } else if (
        dadosAquecimento?.dataTerminoAquecimento > dataInicioImersao ||
        saoDuasDatasIguais(
          dadosAquecimento.dataTerminoAquecimento,
          dataInicioImersao
        )
      ) {
        setErrorDataInicioImersao(true);
        setMensagemDataInicioImersao(MSG028);
      } else if (qntdConsultores === 0) {
        setMensagemErro(MSG040.replace("{1}", "consultores"));
      } else {
        let etapas = formatarEtapasParaPatch(dadosGeraisConsultados.etapas);

        etapas[2] = {
          dataInicio: [
            Number(dataInicioImersao.getFullYear()),
            Number(dataInicioImersao.getMonth()) + 1,
            Number(dataInicioImersao.getDate()),
          ],
          dataTermino: [
            Number(dataTerminoImersao.getFullYear()),
            Number(dataTerminoImersao.getMonth()) + 1,
            Number(dataTerminoImersao.getDate()),
          ],
          tipoEtapa: MSG034,
        };

        api.defaults.headers.patch["Authorization"] = `Bearer ${token}`;
        api
          .patch(`/competicao/update/${idCompeticaoHook}`, {
            etapas,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error.response.data);
          });

        const dadosImersao = {
          dataInicioImersao,
          dataTerminoImersao,
        };
        props.handleEtapaImersao(dadosImersao);
      }
    }
  };

  useEffect(() => {
    if (IsAtualizar) {
      let datas = dadosGeraisConsultados?.etapas[2];

      if (
        isDataDefault(
          datas?.dataInicio[2],
          datas?.dataInicio[1] - 1,
          datas?.dataInicio[0]
        ) &&
        isDataDefault(
          datas?.dataTermino[2],
          datas?.dataTermino[1] - 1,
          datas?.dataTermino[0]
        )
      ) {
        setDatasInformadas(false);
      } else {
        let data = new Date();
        data.setDate(datas?.dataInicio[2]);
        data.setMonth(datas?.dataInicio[1] - 1);
        data.setFullYear(datas?.dataInicio[0]);
        setDataInicioImersao(data);

        data = new Date();
        data.setDate(datas?.dataTermino[2]);
        data.setMonth(datas?.dataTermino[1] - 1);
        data.setFullYear(datas?.dataTermino[0]);
        setDataTerminoImersao(data);
      }
    }

    if (datasInformadas && qntdConsultores > 0) {
      const dadosImersao = {
        dataInicioImersao,
        dataTerminoImersao,
      };
      props.handleEtapaImersao(dadosImersao);
    }
  }, [dadosGeraisConsultados]);

  return (
    <div id="etapa-imersao-content">
      <div style={{ width: "50%", marginBottom: "20px" }}>
        {mensagemErro !== "" ? (
          <Mensagem mensagem={mensagemErro} tipoMensagem={MSG006} />
        ) : null}
      </div>
      <Box component="form" noValidate autoComplete="off">
        <div className="datas-inicio-termino inputs-lado-a-lado">
          <div id="dataInicioImersaoDiv">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled={IsAtualizar && datasInformadas}
                sx={{ color: "#ffc107" }}
                format="DD-MM-YYYY"
                disablePast
                label="Inicio da etapa *"
                value={dataInicioImersao}
                onChange={(dataInicioImersao) => {
                  setDataInicioImersao(new Date(dataInicioImersao));
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    className="input-irmao"
                    color="warning"
                    variant="filled"
                    id="input-data-inicio-imersao"
                    helperText={mensagemDataInicioImersao}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div id="dataTerminoImersaoDiv" className="input-irmao-direito">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled={IsAtualizar && datasInformadas}
                sx={{ color: "#ffc107" }}
                format="DD-MM-YYYY"
                disablePast
                minDate={dataInicioImersao}
                label="Término da etapa *"
                value={dataTerminoImersao}
                onChange={(dataTerminoImersao) => {
                  setDataTerminoImersao(new Date(dataTerminoImersao));
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    className="input-irmao"
                    color="warning"
                    variant="filled"
                    id="input-data-termino-imersao"
                    helperText={mensagemDataTerminoImersao}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
      </Box>

      <h5 className="mt-5 mb-4">Consultores</h5>

      <TabelaAddConsultorAvaliador
        dominioCompeticao={props.dominioCompeticao}
        tipoUsuario={MSG024}
        handleQntdUsuarios={handleQntdUsuarios}
      />

      <div className="input-cadastro-competicao mt-4">
        <Botao
          titulo="salvar"
          classes="btn btn-warning botao-menor-personalizado"
          id="btn-salvar-dados-etapa-imersao"
          onClick={salvarEtapaImersao}
        />
      </div>
    </div>
  );
}

export default EtapaImersao;

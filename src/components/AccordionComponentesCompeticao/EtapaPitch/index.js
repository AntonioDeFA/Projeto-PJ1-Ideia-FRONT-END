import React, { useContext, useEffect, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Botao from "../../Botao";
import Mensagem from "../../Mensagem";
import IsAtualizarContext from "../../../utils/context/isAtualizarContext";
import EtapaImersaoContext from "../../../utils/context/etapaImersaoContext";
import TabelaAddConsultorAvaliador from "./../../Tabelas/TabelaAddConsultorAvaliador/index";
import DadosGeraisConsultadosContext from "../../../utils/context/dadosGeraisConsultadosContext";
import {
  MSG000,
  MSG006,
  MSG018,
  MSG025,
  MSG029,
  MSG040,
} from "./../../../utils/mensagens";
import {
  isDataDefault,
  saoDuasDatasIguais,
  validarCamposObrigatorios,
} from "./../../../services/utils";

import "./styles.css";

function EtapaPitch(props) {
  const IsAtualizar = useContext(IsAtualizarContext);
  const dadosImersao = useContext(EtapaImersaoContext);
  const dadosGeraisConsultados = useContext(DadosGeraisConsultadosContext);

  const [dataInicioPitch, setDataInicioPitch] = useState(null);
  const [dataTerminoPitch, setDataTerminoPitch] = useState(null);

  const [, setErrorDataInicioPitch] = useState(false);
  const [, setErrorDataTerminoPitch] = useState(false);

  const [mensagemDataInicioPitch, setMensagemDataInicioPitch] =
    useState(MSG000);
  const [mensagemDataTerminoPitch, setMensagemDataTerminoPitch] =
    useState(MSG000);

  const [qntdAvaliadores, setQntdAvaliadores] = useState(0);

  const [mensagemErro, setMensagemErro] = useState(MSG000);

  const [datasInformadas, setDatasInformadas] = useState(true);

  const handleQntdUsuarios = (quantidade) => {
    setQntdAvaliadores(quantidade);
    if (quantidade <= 0) {
      props.setEtapaPitchOk(false);
    }
  };

  const salvarEtapaPitch = () => {
    props.setEtapaPitchOk(false);
    setMensagemErro(MSG000);

    let statusDataInicioPitch = validarCamposObrigatorios(
      dataInicioPitch,
      setErrorDataInicioPitch,
      setMensagemDataInicioPitch
    );
    let statusDataTerminoPitch = validarCamposObrigatorios(
      dataTerminoPitch,
      setErrorDataTerminoPitch,
      setMensagemDataTerminoPitch
    );

    if (statusDataInicioPitch && statusDataTerminoPitch) {
      if (dataInicioPitch > dataTerminoPitch) {
        setErrorDataTerminoPitch(true);
        setMensagemDataTerminoPitch(MSG018);
      } else if (
        dadosImersao?.dataTerminoImersao > dataInicioPitch ||
        saoDuasDatasIguais(dadosImersao.dataTerminoImersao, dataInicioPitch)
      ) {
        setErrorDataInicioPitch(true);
        setMensagemDataInicioPitch(MSG029);
      } else if (qntdAvaliadores === 0) {
        setMensagemErro(MSG040.replace("{1}", "avaliadores"));
      } else {
        const dadosPitch = {
          dataInicioPitch,
          dataTerminoPitch,
        };
        props.handleEtapaPitch(dadosPitch);
      }
    }
  };

  useEffect(() => {
    let datas = dadosGeraisConsultados?.estapas[3];

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
      setDataInicioPitch(data);

      data = new Date();
      data.setDate(datas?.dataTermino[2]);
      data.setMonth(datas?.dataTermino[1] - 1);
      data.setFullYear(datas?.dataTermino[0]);
      setDataTerminoPitch(data);
    }
  }, [dadosGeraisConsultados]);

  return (
    <div id="etapa-pitch-content">
      <div style={{ width: "50%", marginBottom: "20px" }}>
        {mensagemErro !== "" ? (
          <Mensagem mensagem={mensagemErro} tipoMensagem={MSG006} />
        ) : null}
      </div>
      <Box component="form" noValidate autoComplete="off">
        <div className="datas-inicio-termino inputs-lado-a-lado">
          <div id="dataInicioPitchDiv">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled={IsAtualizar && datasInformadas}
                sx={{ color: "#ffc107" }}
                format="DD-MM-YYYY"
                disablePast
                label="Inicio da etapa *"
                value={dataInicioPitch}
                onChange={(dataInicioPitch) => {
                  setDataInicioPitch(new Date(dataInicioPitch));
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    className="input-irmao"
                    color="warning"
                    variant="filled"
                    id="input-data-inicio-pitch"
                    helperText={mensagemDataInicioPitch}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div id="dataTerminoPitchDiv" className="input-irmao-direito">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled={IsAtualizar && datasInformadas}
                sx={{ color: "#ffc107" }}
                format="DD-MM-YYYY"
                disablePast
                minDate={dataInicioPitch}
                label="Término da etapa *"
                value={dataTerminoPitch}
                onChange={(dataTerminoPitch) => {
                  setDataTerminoPitch(new Date(dataTerminoPitch));
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    className="input-irmao"
                    color="warning"
                    variant="filled"
                    id="input-data-termino-pitch"
                    helperText={mensagemDataTerminoPitch}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
      </Box>

      <h5 className="mt-5 mb-4">Avaliadores</h5>

      <TabelaAddConsultorAvaliador
        dominioCompeticao={props.dominioCompeticao}
        tipoUsuario={MSG025}
        handleQntdUsuarios={handleQntdUsuarios}
      />

      <div className="input-cadastro-competicao mt-4">
        <Botao
          titulo="salvar"
          classes="btn btn-warning botao-menor-personalizado"
          id="btn-salvar-dados-etapa-pitch"
          onClick={salvarEtapaPitch}
        />
      </div>
    </div>
  );
}

export default EtapaPitch;

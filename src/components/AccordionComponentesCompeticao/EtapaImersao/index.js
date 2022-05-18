import React, { useContext, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Botao from "../../Botao";
import TabelaAddConsultorAvaliador from "../../Tabelas/TabelaAddConsultorAvaliador";
import {
  MSG000,
  MSG006,
  MSG018,
  MSG024,
  MSG028,
  MSG040,
} from "../../../utils/mensagens";
import Mensagem from "../../Mensagem";
import EtapaAquecimentoContext from "../../../utils/context/etapaAquecimentoContext";

import {
  saoDuasDatasIguais,
  validarCamposObrigatorios,
} from "../../../services/utils";

import "./styles.css";

function EtapaImersao(props) {
  const dadosAquecimento = useContext(EtapaAquecimentoContext);

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
        const dadosImersao = {
          dataInicioImersao,
          dataTerminoImersao,
        };
        props.handleEtapaImersao(dadosImersao);
      }
    }
  };

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
                    id="input-data-inicio-inscricoes"
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
                    id="input-data-termino-inscricoes"
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

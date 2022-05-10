import React, { useContext, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Botao from "../../Botao";
import TabelaAddConsultorAvaliador from "../../Tabelas/TabelaAddConsultorAvaliador";
import { MSG000, MSG018, MSG024, MSG028 } from "../../../utils/mensagens";

import "./styles.css";
import {
  saoDuasDatasIguais,
  validarCamposObrigatorios,
} from "../../../services/utils";
import EtapaAquecimentoContext from "../../../utils/context/etapaAquecimentoContext";

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

  const salvarEtapaImersao = () => {
    props.setEtapaImersaoOk(false);

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
      />

      <div className="input-cadastro-competicao mt-4">
        <Botao
          titulo="salvar dados"
          classes="btn btn-warning botao-menor-personalizado"
          id="btn-salvar-dados-etapa-imersao"
          onClick={salvarEtapaImersao}
        />
      </div>
    </div>
  );
}

export default EtapaImersao;

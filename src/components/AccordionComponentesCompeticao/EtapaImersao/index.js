import React, { useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import TabelaAddConsultorAvaliador from "../../Tabelas/TabelaAddConsultorAvaliador";
import { MSG000 } from "../../../utils/mensagens";

import "./styles.css";

function EtapaImersao() {
  const [dataInicioImersao, setDataInicioImersao] = useState(null);
  const [dataTerminoImersao, setDataTerminoImersao] = useState(null);

  const [mensagemDataInicioImersao, setMensagemDataInicioImersao] =
    useState(MSG000);
  const [mensagemDataTerminoImersao, setMensagemDataTerminoImersao] =
    useState(MSG000);

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

      <TabelaAddConsultorAvaliador />
    </div>
  );
}

export default EtapaImersao;

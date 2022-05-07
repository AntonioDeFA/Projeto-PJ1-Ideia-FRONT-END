import React, { useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { MSG000 } from "./../../../utils/mensagens";

import "./styles.css";
import TabelaAddConsultorAvaliador from "./../../Tabelas/TabelaAddConsultorAvaliador/index";

function EtapaPitch() {
  const [dataInicioPitch, setDataInicioPitch] = useState(null);
  const [dataTerminoPitch, setDataTerminoPitch] = useState(null);

  const [mensagemDataInicioPitch, setMensagemDataInicioPitch] =
    useState(MSG000);
  const [mensagemDataTerminoPitch, setMensagemDataTerminoPitch] =
    useState(MSG000);

  return (
    <div id="etapa-pitch-content">
      <Box component="form" noValidate autoComplete="off">
        <div className="datas-inicio-termino inputs-lado-a-lado">
          <div id="dataInicioPitchDiv">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
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
                    id="input-data-inicio-inscricoes"
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
                    id="input-data-termino-inscricoes"
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

      <TabelaAddConsultorAvaliador />
    </div>
  );
}

export default EtapaPitch;

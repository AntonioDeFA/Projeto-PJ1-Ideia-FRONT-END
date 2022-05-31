import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import Botao from "../../components/Botao";
import DefaultHeader from "../../components/DefaultHeader";
import { MSG000 } from "../../utils/mensagens";
import { IdCompeticaoProvider } from "./../../utils/context/idCompeticaoContext";
import DadosGeraisCompeticaoConsulta from "../../components/ComponentesConsulta/DadosGeraisCompeticaoConsulta";
import { TabPanel, valueProps } from "../../utils/constantes";

import "./styles.css";

function Equipe() {
  const navigate = useNavigate();
  const { idCompeticao } = useParams();

  const [value, setValue] = React.useState(0);

  const [mensagemErro, setMensagemErro] = useState(MSG000);

  useEffect(() => {}, []);

  return (
    <div id="dados-competicao">
      <DefaultHeader />
      <div className=" ps-3 pe-4 pt-3 d-flex justify-content-between">
        <h1 className="ps-3 ms-1 titulos-principais">Competição</h1>
        <Botao
          titulo="voltar"
          classes="btn me-4 btn-warning botao-menor-personalizado"
          onClick={() => navigate("/inicio")}
        />
      </div>
      <div className="p-3 d-flex justify-content-center">
        <Box sx={{ width: "1050px" }} className="ps-2 pe-3">
          <div className="mt-3">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                textColor="inherit"
                indicatorColor="inherit"
                aria-label="basic tabs example"
              >
                <Tab label={"Dados Gerais"} {...valueProps(0)} />
                <Tab label={"Equipes"} {...valueProps(1)} />
                <Tab label={"Resultado Geral"} {...valueProps(2)} />
              </Tabs>
            </Box>

            <TabPanel color="warning" value={value} index={0}>
              <IdCompeticaoProvider value={idCompeticao}>
                <DadosGeraisCompeticaoConsulta />
              </IdCompeticaoProvider>
            </TabPanel>

            <TabPanel color="warning" value={value} index={1}>
              {/* <PainelEquipes /> */}
            </TabPanel>
            <TabPanel color="warning" value={value} index={1}>
              {/* <PainelResultadoGeral /> */}
            </TabPanel>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Equipe;

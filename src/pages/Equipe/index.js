import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Tabs, Tab } from "@mui/material";

import api from "./../../services/api";
import Botao from "../../components/Botao";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import PainelPitchDeck from "./../../components/AbasTelaEquipe/PainelPitchDeck/index";
import PainelAvaliacao from "./../../components/AbasTelaEquipe/PainelAvaliacao/index";
import PainelLeanCanvas from "./../../components/AbasTelaEquipe/PainelLeanCanvas/index";
import PainelDadosEquipe from "./../../components/AbasTelaEquipe/PainelDadosEquipe/index";
import PainelResultadoGeral from "../../components/ComponentesConsulta/PainelResultadoGeral";
import { TabPanel, valueProps } from "../../utils/constantes";
import PainelMateriaisAquecimento from "./../../components/AbasTelaEquipe/PainelMateriaisAquecimento/index";
import DadosGeraisCompeticaoConsulta from "../../components/ComponentesConsulta/DadosGeraisCompeticaoConsulta";

import "./styles.css";
import { MSG033, MSG034, MSG035, MSG043 } from "./../../utils/mensagens";

function Equipe() {
  const navigate = useNavigate();
  const { idEquipe, papelUsuario } = useParams();

  const { token, setToken } = useContext(StoreContext);

  const [value, setValue] = useState(0);

  const [equipe, setEquipe] = useState(null);

  const handleSairDaTela = () => {
    if (papelUsuario === "USUARIO_LIDER") {
      navigate("/inicio");
    } else {
      setToken("");
      navigate("/");
    }
  };

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/equipe/dados/${idEquipe}`)
      .then((response) => {
        setEquipe(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [idEquipe, token]);

  return (
    <div id="dados-competicao">
      <DefaultHeader isLoginViaToken={papelUsuario === "USUARIO_TOKEN"} />

      <div className="ps-3 pe-4 pt-3 d-flex justify-content-between">
        <h1 className="ps-3 ms-1 titulos-principais">
          Equipe {equipe?.nomeEquipe}
        </h1>

        {papelUsuario === "USUARIO_LIDER" ? (
          <Botao
            titulo="voltar"
            classes="btn me-4 btn-warning botao-menor-personalizado"
            onClick={handleSairDaTela}
          />
        ) : null}
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
                <Tab label={"Competição"} {...valueProps(0)} />
                <Tab label={"Equipe"} {...valueProps(1)} />

                {equipe?.etapaVigenteStr === MSG033 ? (
                  <Tab label={"Aquecimento"} {...valueProps(2)} />
                ) : null}

                {equipe?.etapaVigenteStr === MSG034 ? (
                  <Tab label={"Lean Canvas"} {...valueProps(2)} />
                ) : null}

                {equipe?.etapaVigenteStr === MSG034 ? (
                  <Tab label={"Pitch Deck"} {...valueProps(3)} />
                ) : null}

                {equipe?.etapaVigenteStr === MSG035 ? (
                  <Tab label={"Avaliação"} {...valueProps(2)} />
                ) : null}

                {equipe?.etapaVigenteStr === MSG043 ? (
                  <Tab label={"Resultado Geral"} {...valueProps(2)} />
                ) : null}
              </Tabs>
            </Box>

            <TabPanel value={value} index={0} className="tab-customizada">
              <DadosGeraisCompeticaoConsulta
                id={equipe?.idCompeticaoCadastrada}
                isLider={papelUsuario === "USUARIO_LIDER"}
              />
            </TabPanel>

            <TabPanel value={value} index={1} className="tab-customizada">
              <PainelDadosEquipe id={equipe?.id} />
            </TabPanel>

            {equipe?.etapaVigenteStr === MSG033 ? (
              <TabPanel value={value} index={2} className="tab-customizada">
                <PainelMateriaisAquecimento
                  id={equipe?.idCompeticaoCadastrada}
                />
              </TabPanel>
            ) : null}

            {equipe?.etapaVigenteStr === MSG034 ? (
              <TabPanel value={value} index={2} className="tab-customizada">
                <PainelLeanCanvas idEquipe={equipe?.id} />
              </TabPanel>
            ) : null}

            {equipe?.etapaVigenteStr === MSG034 ? (
              <TabPanel value={value} index={3} className="tab-customizada">
                <PainelPitchDeck />
              </TabPanel>
            ) : null}

            {equipe?.etapaVigenteStr === MSG035 ? (
              <TabPanel value={value} index={2} className="tab-customizada">
                <PainelAvaliacao />
              </TabPanel>
            ) : null}

            {equipe?.etapaVigenteStr === MSG043 ? (
              <TabPanel value={value} index={2} className="tab-customizada">
                <PainelResultadoGeral id={equipe?.idCompeticaoCadastrada} />
              </TabPanel>
            ) : null}
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Equipe;

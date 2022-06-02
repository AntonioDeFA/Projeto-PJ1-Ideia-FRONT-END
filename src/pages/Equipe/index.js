import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Tabs, Tab } from "@mui/material";

import api from "./../../services/api";
import Botao from "../../components/Botao";
import { MSG000 } from "../../utils/mensagens";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import PainelPitchDeck from "./../../components/AbasTelaEquipe/PainelPitchDeck/index";
import PainelAvaliacao from "./../../components/AbasTelaEquipe/PainelAvaliacao/index";
import PainelLeanCanvas from "./../../components/AbasTelaEquipe/PainelLeanCanvas/index";
import PainelDadosEquipe from "./../../components/AbasTelaEquipe/PainelDadosEquipe/index";
import PainelResultadoGeral from "./../../components/AbasTelaEquipe/PainelResultadoGeral/index";
import { IdCompeticaoProvider } from "./../../utils/context/idCompeticaoContext";
import { TabPanel, valueProps } from "../../utils/constantes";
import PainelMateriaisAquecimento from "./../../components/AbasTelaEquipe/PainelMateriaisAquecimento/index";
import DadosGeraisCompeticaoConsulta from "../../components/ComponentesConsulta/DadosGeraisCompeticaoConsulta";

import "./styles.css";

function Equipe() {
  const navigate = useNavigate();
  const { idEquipe, papelUsuario } = useParams();

  const { token, setToken } = useContext(StoreContext);

  const [value, setValue] = useState(0);

  const [equipe, setEquipe] = useState(null);

  const [mensagemErro, setMensagemErro] = useState(MSG000);

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
    api.get(`/equipe/dados/${idEquipe}`).then((response) => {
      setEquipe(response.data);
    });
  }, []);

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
                <Tab label={"Aquecimento"} {...valueProps(2)} />
                <Tab label={"Lean Canvas"} {...valueProps(3)} />
                <Tab label={"Pitch Deck"} {...valueProps(4)} />
                <Tab label={"Avaliação"} {...valueProps(5)} />
                <Tab label={"Resultado Geral"} {...valueProps(6)} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <DadosGeraisCompeticaoConsulta
                id={equipe?.idCompeticaoCadastrada}
              />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <PainelDadosEquipe id={equipe?.id} />
            </TabPanel>

            <TabPanel value={value} index={2}>
              <PainelMateriaisAquecimento />
            </TabPanel>

            <TabPanel value={value} index={3}>
              <PainelLeanCanvas idEquipe={equipe?.id} />
            </TabPanel>

            <TabPanel value={value} index={4}>
              <PainelPitchDeck />
            </TabPanel>

            <TabPanel value={value} index={5}>
              <PainelAvaliacao />
            </TabPanel>

            <TabPanel value={value} index={6}>
              <PainelResultadoGeral />
            </TabPanel>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Equipe;

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Tabs, Tab } from "@mui/material";

import api from "./../../services/api";
import Botao from "../../components/Botao";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import VersoesPitchDeck from "../../components/AbasVersoesArtefatos/VersoesPitchDeck";
import VersoesLeanCanvas from "../../components/AbasVersoesArtefatos/VersoesLeanCanvas";
import { TabPanel, valueProps } from "../../utils/constantes";

import "./styles.css";

function VersoesArtefatos() {
  const navigate = useNavigate();
  const { idEquipe, papelUsuario } = useParams();

  const { token } = useContext(StoreContext);

  const [value, setValue] = useState(0);

  const [equipe, setEquipe] = useState(null);

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
  }, [token]);

  return (
    <div id="pagina-versoes-artefatos">
      <DefaultHeader isLoginViaToken={papelUsuario === "USUARIO_TOKEN"} />

      <div className="ps-3 pe-4 pt-3 d-flex justify-content-between">
        <div>
          <div>
            <h1 className="ps-3 ms-1 titulos-principais">
              Equipe {equipe?.nomeEquipe}
            </h1>
          </div>
        </div>
        <Botao
          titulo="voltar"
          classes="btn me-4 btn-warning botao-menor-personalizado"
          onClick={() => {
            navigate(`/equipe/${idEquipe}/${papelUsuario}`);
          }}
        />
      </div>
      <div>
        <h5 style={{ marginLeft: "37px" }}>
          Aqui poderão ver os feedbacks dos Lean Canvas e Pitch Decks submetidos
          para consultoria.
        </h5>
      </div>

      <div className="p-3 d-flex justify-content-center">
        <Box sx={{ width: "97.8%" }} className="ps-2 pe-3">
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
                <Tab label={"Lean Canvas"} {...valueProps(0)} />
                <Tab label={"Pitch Deck"} {...valueProps(1)} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0} className="tab-customizada">
              <VersoesLeanCanvas
                idEquipe={idEquipe}
                papelUsuario={papelUsuario}
              />
            </TabPanel>

            <TabPanel value={value} index={1} className="tab-customizada">
              <VersoesPitchDeck idEquipe={idEquipe} />
            </TabPanel>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default VersoesArtefatos;

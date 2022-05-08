import DefaultHeader from "../../components/DefaultHeader";

import "./styles.css";

import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Botao from "../../components/Botao";
import DadosGeraisCompeticao from "./../../components/AccordionComponentesCompeticao/DadosGeraisCompeticao/index";
import QuestoesAvaliativasPitches from "./../../components/AccordionComponentesCompeticao/QuestoesAvaliativasPitches/index";
import EtapaAquecimento from "./../../components/AccordionComponentesCompeticao/EtapaAquecimento/index";
import EtapaImersao from "./../../components/AccordionComponentesCompeticao/EtapaImersao/index";
import EtapaPitch from "./../../components/AccordionComponentesCompeticao/EtapaPitch/index";
import { Box } from "@mui/material";
import { MSG022, MSG023 } from "../../utils/mensagens";

function CadastroCompeticao() {
  const [dadosGerais, setDadosGerais] = useState(null);
  const [dadosImersao, setDadosImersao] = useState(null);
  const [dadosPitch, setDadosPitch] = useState(null);

  const [dadosGeraisOk, setDadosGeraisOk] = useState(false);
  const [etapaImersaoOk, setEtapaImersaoOk] = useState(false);
  const [etapaPitchOk, setEtapaPitchOk] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDadosGerais = (dadosGerais) => {
    setDadosGerais(dadosGerais);
    setDadosGeraisOk(true);
  };

  const handleEtapaImersao = (dadosImersao) => {
    setDadosImersao(dadosImersao);
    setEtapaImersaoOk(true);
  };

  const handleEtapaPitch = (dadosPitch) => {
    setDadosPitch(dadosPitch);
    setEtapaPitchOk(true);
  };

  const handleAccordionImersao = () => {
    return dadosGeraisOk === false;
  };
  const handleAccordionPitch = () => {
    return etapaImersaoOk === false;
  };

  return (
    <div id="cadastro-equipe">
      <DefaultHeader />
      <div className="elementos-centralizados mt-5">
        <div className="accordion" id="accordion-id">
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{ border: "1px solid #ffc107", width: "1050px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                sx={{ backgroundColor: "#ffc107" }}
                id="panel1bh-header"
              >
                <Typography
                  variant="h5"
                  sx={{ width: "33%", flexShrink: 0, color: "white" }}
                >
                  <Box sx={{ display: "flex" }}>
                    {dadosGeraisOk ? (
                      <div className="icone-ok">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                    ) : null}
                    Dados Gerais
                  </Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "20px" }}>
                <DadosGeraisCompeticao
                  handleDadosGerais={handleDadosGerais}
                  setDadosGeraisOk={setDadosGeraisOk}
                />
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{ border: "1px solid #ffc107" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                sx={{ backgroundColor: "#ffc107" }}
                id="panel1bh-header"
              >
                <Typography
                  variant="h5"
                  sx={{ width: "43%", flexShrink: 0, color: "white" }}
                >
                  Questões Avaliativas dos Pitches
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "20px" }}>
                <QuestoesAvaliativasPitches />
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              sx={{ border: "1px solid #ffc107" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                sx={{ backgroundColor: "#ffc107" }}
                id="panel1bh-header"
              >
                <Typography
                  variant="h5"
                  sx={{ width: "33%", flexShrink: 0, color: "white" }}
                >
                  Etapa de Aquecimento
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "20px" }}>
                <EtapaAquecimento />
              </AccordionDetails>
            </Accordion>
          </div>

          <div title={handleAccordionImersao() ? MSG022 : null}>
            <Accordion
              disabled={handleAccordionImersao()}
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              sx={{ border: "1px solid #ffc107" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                sx={{ backgroundColor: "#ffc107" }}
                id="panel1bh-header"
              >
                <Typography
                  variant="h5"
                  sx={{ width: "33%", flexShrink: 0, color: "white" }}
                >
                  <Box sx={{ display: "flex" }}>
                    {etapaImersaoOk ? (
                      <div className="icone-ok">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                    ) : null}
                    Etapa de Imersão
                  </Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "20px" }}>
                <EtapaImersao
                  handleEtapaImersao={handleEtapaImersao}
                  setEtapaImersaoOk={setEtapaImersaoOk}
                />
              </AccordionDetails>
            </Accordion>
          </div>

          <div title={handleAccordionPitch() ? MSG022 : null}>
            <Accordion
              disabled={handleAccordionPitch()}
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
              sx={{ border: "1px solid #ffc107" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                sx={{ backgroundColor: "#ffc107" }}
                id="panel1bh-header"
              >
                <Typography
                  variant="h5"
                  sx={{ width: "33%", flexShrink: 0, color: "white" }}
                >
                  <Box sx={{ display: "flex" }}>
                    {etapaPitchOk ? (
                      <div className="icone-ok">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                    ) : null}
                    Etapa de Pitch
                  </Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "20px" }}>
                <EtapaPitch
                  handleEtapaPitch={handleEtapaPitch}
                  setEtapaPitchOk={setEtapaPitchOk}
                />
              </AccordionDetails>
            </Accordion>
          </div>
          <div id="botoes-competicao">
            <div id="btn-confirmar" title={!etapaPitchOk ? MSG023 : null}>
              <Botao
                id="btn-confirmar-inscricao-para-teste"
                titulo="salvar"
                onClick={null}
                disabled={!etapaPitchOk}
                classes="btn btn-warning botao-menor-personalizado"
              />
            </div>
            <div id="btn-cancelar-confirmacao">
              <Botao
                titulo="cancelar"
                id="btn-cancelar-confirmacao-inscricao-para-teste"
                classes="btn btn-secondary botao-menor-personalizado"
                onClick={null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroCompeticao;

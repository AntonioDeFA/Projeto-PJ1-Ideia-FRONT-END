import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import Botao from "../../components/Botao";
import EtapaPitch from "./../../components/AccordionComponentesCompeticao/EtapaPitch/index";
import EtapaImersao from "./../../components/AccordionComponentesCompeticao/EtapaImersao/index";
import DefaultHeader from "../../components/DefaultHeader";
import EtapaAquecimento from "./../../components/AccordionComponentesCompeticao/EtapaAquecimento/index";
import {
  MSG000,
  MSG022,
  MSG023,
  MSG032,
  MSG033,
  MSG034,
  MSG035,
} from "../../utils/mensagens";
import DadosGeraisCompeticao from "./../../components/AccordionComponentesCompeticao/DadosGeraisCompeticao/index";
import { DadosGeraisProvider } from "../../utils/context/dadosGeraisContext";
import { EtapaImersaoProvider } from "./../../utils/context/etapaImersaoContext";
import QuestoesAvaliativasPitches from "./../../components/AccordionComponentesCompeticao/QuestoesAvaliativasPitches/index";
import { EtapaAquecimentoProvider } from "./../../utils/context/etapaAquecimentoContext";

import "./styles.css";
import { IdCompeticaoProvider } from "../../utils/context/idCompeticaoContext";
import api from "../../services/api";
import StoreContext from "../../store/context";

import {} from "react-router-dom";
import { ExpandedAccordionProvider } from "../../utils/context/expandedAccordionContext";

function CadastroCompeticao() {
  const { idCompeticao } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { token } = useContext(StoreContext);

  const [isAtualizar, setAtualizar] = useState(false);

  const [dadosGerais, setDadosGerais] = useState(null);
  const [questoesAvaliativas, setQuestoesAvaliativas] = useState(null);
  const [dadosAquecimento, setDadosAquecimento] = useState(null);
  const [dadosImersao, setDadosImersao] = useState(null);
  const [dadosPitch, setDadosPitch] = useState(null);

  const [dadosGeraisOk, setDadosGeraisOk] = useState(false);
  const [questoesAvaliativasOk, setQuestoesAvaliativasOk] = useState(false);
  const [etapaAquecimentoOk, setEtapaAquecimentoOk] = useState(false);
  const [etapaImersaoOk, setEtapaImersaoOk] = useState(false);
  const [etapaPitchOk, setEtapaPitchOk] = useState(false);

  const [expanded, setExpanded] = useState("panel1");

  const [idCompeticaoHook, setIdCompeticaoHook] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDadosGerais = (dadosGerais) => {
    setDadosGerais(dadosGerais);
    setDadosGeraisOk(true);
    setExpanded("panel2");
  };

  const handleQuestoesAvaliativas = (questoesAvaliativas) => {
    setQuestoesAvaliativas(questoesAvaliativas);
    setQuestoesAvaliativasOk(true);
    setExpanded("panel3");
  };

  const handleEtapaAquecimento = (dadosAquecimento) => {
    setDadosAquecimento(dadosAquecimento);
    setEtapaAquecimentoOk(true);
    setExpanded("panel4");
  };

  const handleEtapaImersao = (dadosImersao) => {
    setDadosImersao(dadosImersao);
    setEtapaImersaoOk(true);
    setExpanded("panel5");
  };

  const handleEtapaPitch = (dadosPitch) => {
    setDadosPitch(dadosPitch);
    setEtapaPitchOk(true);
    setExpanded(MSG000);
  };

  const handleAccordionAquecimento = () => {
    return dadosGeraisOk === false;
  };
  const handleAccordionImersao = () => {
    return etapaAquecimentoOk === false;
  };
  const handleAccordionPitch = () => {
    return etapaImersaoOk === false;
  };

  const salvarCompeticao = () => {
    if (idCompeticaoHook !== 0) {
      let competicaoAtualizada = {
        nomeCompeticao: dadosGerais.nome,
        tempoMaximoVideoEmSeg: Number(dadosGerais.tempoMaxPitch) * 60,
        questoesAvaliativas: questoesAvaliativas,
        materiaisDeEstudo: dadosAquecimento.materiaisDeEstudo,
        etapas: [
          {
            dataInicio: [
              Number(dadosGerais.dataInicioInscricoes.getFullYear()),
              Number(dadosGerais.dataInicioInscricoes.getMonth()) + 1,
              Number(dadosGerais.dataInicioInscricoes.getDate()),
            ],
            dataTermino: [
              Number(dadosGerais.dataTerminoInscricoes.getFullYear()),
              Number(dadosGerais.dataTerminoInscricoes.getMonth()) + 1,
              Number(dadosGerais.dataTerminoInscricoes.getDate()),
            ],
            tipoEtapa: MSG032,
          },
          {
            dataInicio: [
              Number(dadosAquecimento.dataInicioAquecimento.getFullYear()),
              Number(dadosAquecimento.dataInicioAquecimento.getMonth()) + 1,
              Number(dadosAquecimento.dataInicioAquecimento.getDate()),
            ],
            dataTermino: [
              Number(dadosAquecimento.dataTerminoAquecimento.getFullYear()),
              Number(dadosAquecimento.dataTerminoAquecimento.getMonth()) + 1,
              Number(dadosAquecimento.dataTerminoAquecimento.getDate()),
            ],
            tipoEtapa: MSG033,
          },
          {
            dataInicio: [
              Number(dadosImersao.dataInicioImersao.getFullYear()),
              Number(dadosImersao.dataInicioImersao.getMonth()) + 1,
              Number(dadosImersao.dataInicioImersao.getDate()),
            ],
            dataTermino: [
              Number(dadosImersao.dataTerminoImersao.getFullYear()),
              Number(dadosImersao.dataTerminoImersao.getMonth()) + 1,
              Number(dadosImersao.dataTerminoImersao.getDate()),
            ],
            tipoEtapa: MSG034,
          },
          {
            dataInicio: [
              Number(dadosPitch.dataInicioPitch.getFullYear()),
              Number(dadosPitch.dataInicioPitch.getMonth()) + 1,
              Number(dadosPitch.dataInicioPitch.getDate()),
            ],
            dataTermino: [
              Number(dadosPitch.dataTerminoPitch.getFullYear()),
              Number(dadosPitch.dataTerminoPitch.getMonth()) + 1,
              Number(dadosPitch.dataTerminoPitch.getDate()),
            ],
            tipoEtapa: MSG035,
          },
        ],
      };

      api.defaults.headers.patch["Authorization"] = `Bearer ${token}`;
      api
        .patch(`/competicao/update/${idCompeticaoHook}`, competicaoAtualizada)
        .then((response) => {
          console.log(response.data);
          return navigate("/inicio");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  const cancelar = () => {
    return navigate("/inicio");
  };

  useEffect(() => {
    const { pathname } = location;

    if (pathname.includes("atualizar-competicao")) {
      setIdCompeticaoHook(idCompeticao);
      setAtualizar(true);

      api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
      api
        .get(`/competicao/dados-gerais/${idCompeticao}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [location, idCompeticao]);

  return (
    <div id="cadastro-equipe">
      <DefaultHeader />
      <IdCompeticaoProvider value={idCompeticaoHook}>
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
                    setIdCompeticaoHook={setIdCompeticaoHook}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
            <div
              title={
                handleAccordionAquecimento() && !isAtualizar ? MSG022 : null
              }
            >
              <Accordion
                disabled={handleAccordionAquecimento() && !isAtualizar}
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
                    <Box sx={{ display: "flex" }}>
                      {questoesAvaliativasOk ? (
                        <div className="icone-ok">
                          <i className="fa-solid fa-circle-check"></i>
                        </div>
                      ) : null}
                      Questões Avaliativas dos Pitches
                    </Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "20px" }}>
                  <QuestoesAvaliativasPitches
                    handleQuestoesAvaliativas={handleQuestoesAvaliativas}
                    setQuestoesAvaliativasOk={setQuestoesAvaliativasOk}
                    isAtualizar={isAtualizar}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
            <div
              title={
                handleAccordionAquecimento() && !isAtualizar ? MSG022 : null
              }
            >
              <DadosGeraisProvider value={dadosGerais}>
                <Accordion
                  disabled={handleAccordionAquecimento() && !isAtualizar}
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
                      <Box sx={{ display: "flex" }}>
                        {etapaAquecimentoOk ? (
                          <div className="icone-ok">
                            <i className="fa-solid fa-circle-check"></i>
                          </div>
                        ) : null}
                        Etapa de Aquecimento
                      </Box>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: "20px" }}>
                    <EtapaAquecimento
                      handleEtapaAquecimento={handleEtapaAquecimento}
                      setEtapaAquecimentoOk={setEtapaAquecimentoOk}
                      isAtualizar={isAtualizar}
                    />
                  </AccordionDetails>
                </Accordion>
              </DadosGeraisProvider>
            </div>

            <ExpandedAccordionProvider value={expanded}>
              <DadosGeraisProvider value={dadosGerais}>
                <div
                  title={
                    handleAccordionImersao() && !isAtualizar ? MSG022 : null
                  }
                >
                  <EtapaAquecimentoProvider value={dadosAquecimento}>
                    <Accordion
                      disabled={handleAccordionImersao() && !isAtualizar}
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
                          dominioCompeticao={dadosGerais?.dominioCompeticao}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </EtapaAquecimentoProvider>
                </div>

                <div
                  title={handleAccordionPitch() && !isAtualizar ? MSG022 : null}
                >
                  <EtapaImersaoProvider value={dadosImersao}>
                    <Accordion
                      disabled={handleAccordionPitch() && !isAtualizar}
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
                          dominioCompeticao={dadosGerais?.dominioCompeticao}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </EtapaImersaoProvider>
                </div>
              </DadosGeraisProvider>
            </ExpandedAccordionProvider>

            <div id="botoes-competicao">
              <div id="btn-confirmar" title={!etapaPitchOk ? MSG023 : null}>
                <Botao
                  id="btn-confirmar-inscricao-para-teste"
                  titulo="salvar"
                  onClick={salvarCompeticao}
                  disabled={
                    !(
                      dadosGeraisOk &&
                      etapaAquecimentoOk &&
                      etapaImersaoOk &&
                      etapaPitchOk &&
                      questoesAvaliativasOk
                    ) && !isAtualizar
                  }
                  classes="btn btn-warning botao-menor-personalizado"
                />
              </div>
              <div id="btn-cancelar-confirmacao">
                <Botao
                  titulo="voltar"
                  id="btn-cancelar-confirmacao-inscricao-para-teste"
                  classes="btn btn-secondary botao-menor-personalizado"
                  onClick={cancelar}
                />
              </div>
            </div>
          </div>
        </div>
      </IdCompeticaoProvider>
    </div>
  );
}

export default CadastroCompeticao;

import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Modal,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import Botao from "../../components/Botao";
import Mensagem from "../../components/Mensagem";
import StoreContext from "../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import { styleModals, TabPanel, valueProps } from "../../utils/constantes";
import { MSG000, MSG006 } from "../../utils/mensagens";
import { IdCompeticaoProvider } from "./../../utils/context/idCompeticaoContext";
import DadosGeraisCompeticaoConsulta from "../../components/ComponentesConsulta/DadosGeraisCompeticaoConsulta";

import "./styles.css";

function DadosCompeticao() {
  const { token } = useContext(StoreContext);
  const { idCompeticao, papelUsuario } = useParams();

  const [nome, setNome] = useState(MSG000);

  const [value, setValue] = React.useState(0);

  const [mensagemErro, setMensagemErro] = useState(MSG000);

  const [resultados, setResultados] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [consultores, setConsultores] = useState([]);

  const [openModalEscolherConsultor, setOpenModalEscolherConsultor] =
    React.useState(false);

  const handleCloseModalEscolherConsultor = () =>
    setOpenModalEscolherConsultor(false);
  const handleOpenModalEscolherConsultor = () =>
    setOpenModalEscolherConsultor(true);

  const [mudou, setMudou] = useState(true);

  const [idEquipeEscolhida, setIdEquipeEscolhida] = useState(0);
  const [idConsultor, setIdConsultor] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    buscarNomeCompeticao();
    buscarEquipes();
    buscarConsultores();
    buscarResultados();
  }, []);

  const buscarNomeCompeticao = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/competicao/dados-gerais/${idCompeticao}`).then((response) => {
      setNome(response.data.nomeCompeticao);
    });
  };

  const buscarEquipes = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/competicao/equipes/${idCompeticao}`).then((response) => {
      const { data } = response;
      setEquipes(data);
    });
  };

  const buscarConsultores = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/competicao/consultores/${idCompeticao}`).then((response) => {
      const { data } = response;
      setConsultores(data);
    });
  };

  const buscarResultados = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/competicao/resultados-gerais/${idCompeticao}`)
      .then((response) => {
        const { data } = response;
        setResultados(data);
      });
  };

  const adicionarIdEquipeEAbrirModal = (idEquipe) => {
    setIdEquipeEscolhida(idEquipe);
    handleOpenModalEscolherConsultor();
  };

  const adicionarConsultorAEquipe = () => {
    if (idEquipeEscolhida !== 0 && idConsultor !== 0) {
      api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
      api
        .post(
          `/competicao/adicionar-consultor/${idCompeticao}/${idEquipeEscolhida}/${idConsultor}`
        )
        .then((response) => {
          setIdEquipeEscolhida(0);
          setIdConsultor(0);
          setMensagemErro(MSG000);
          handleCloseModalEscolherConsultor();
          buscarEquipes();
        });
    } else {
      setMensagemErro("Escolha um consultor");
    }
  };

  const deletarEquipe = (idEquipe) => {
    api.defaults.headers.delete["Authorization"] = `Bearer ${token}`;
    api
      .delete(`/competicao/deletar-equipe/${idCompeticao}/${idEquipe}`)
      .then((response) => {
        buscarEquipes();
      });
    setMudou(false);
    setMudou(true);
  };

  const PainelEquipes = () => {
    return (
      <div id="painel-equipes">
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 420,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          {mudou
            ? equipes.map((equipe, index) => (
                <li key={index} className="border border-dark rounded m-3 p-2">
                  <ul>
                    <ListItem
                      secondaryAction={
                        <div>
                          <IconButton
                            edge="end"
                            aria-label="adicionar"
                            className="me-1"
                            id="botao-atualizar-questao"
                            onClick={() =>
                              adicionarIdEquipeEAbrirModal(equipe.id)
                            }
                          >
                            <i className="fa-solid fa-user-plus hover-azul p-0 text-warning"></i>
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deletarEquipe(equipe.id)}
                          >
                            <i className="fa-solid fa-trash-can p-0"></i>
                          </IconButton>
                        </div>
                      }
                      key={equipe.id}
                    >
                      <ListItemText primary={equipe.nome} />
                    </ListItem>
                  </ul>
                </li>
              ))
            : null}
        </List>
      </div>
    );
  };

  const PainelResultadoGeral = () => {
    return (
      <div id="id-painel-resultado-geral">
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 420,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          {resultados.map((resultado, index) => (
            <li key={index} className="border border-dark rounded m-3 p-2">
              <ul>
                <ListItem key={index}>
                  <div
                    className="d-flex justify-content-between align-items-center mt-2 mb-2 w-100"
                    id="resultado-geral"
                  >
                    <h6 style={{ fontWeight: "bolder" }}>{index + 1}°</h6>
                    <h6>{resultado.nome}</h6>
                    <h6>
                      {" "}
                      <strong>{resultado.notaAtribuida}</strong> /
                      {resultado.notaMaximaCompeticao}
                    </h6>
                  </div>
                </ListItem>
              </ul>
            </li>
          ))}
        </List>
      </div>
    );
  };

  return (
    <div id="dados-competicao">
      <DefaultHeader iconeDestaque="trofeu" />
      <div className=" ps-3 pe-4 pt-3 d-flex justify-content-between">
        <h1 className="ps-3 ms-1 titulos-principais">Competição {nome}</h1>
        <Botao
          titulo="voltar"
          classes="btn me-4 btn-warning botao-menor-personalizado"
          onClick={() => navigate("/inicio")}
        />
      </div>
      <div className="p-3 d-flex justify-content-center">
        <Box sx={{ width: "1050px" }} className="ps-2 pe-3">
          <div className="mt-3 mb-5">
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
                {papelUsuario === "ORGANIZADOR" ? (
                  <Tab label={"Equipes"} {...valueProps(1)} />
                ) : null}
                <Tab label={"Resultado Geral"} {...valueProps(2)} />
              </Tabs>
            </Box>

            <TabPanel color="warning" value={value} index={0}>
              <DadosGeraisCompeticaoConsulta id={idCompeticao} />
            </TabPanel>

            {papelUsuario === "ORGANIZADOR" ? (
              <TabPanel color="warning" value={value} index={1}>
                <PainelEquipes />
              </TabPanel>
            ) : null}
            <TabPanel
              color="warning"
              value={value}
              index={papelUsuario === "ORGANIZADOR" ? 2 : 1}
            >
              <PainelResultadoGeral />
            </TabPanel>
          </div>
        </Box>
      </div>

      <Modal
        open={openModalEscolherConsultor}
        onClose={handleCloseModalEscolherConsultor}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModals} style={{ width: 600 }}>
          <div style={{ width: "50%" }} className="mb-3">
            {mensagemErro !== "" ? (
              <Mensagem mensagem={mensagemErro} tipoMensagem={MSG006} />
            ) : null}
          </div>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "20px" }}
          >
            Escolha um consultor !
          </Typography>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 320,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {consultores.map((consultor, index) => (
              <li
                key={index}
                className="border border-warning rounded mb-3 p-2 list-group-item list-group-item-action"
              >
                <ul onClick={() => setIdConsultor(consultor.id)}>
                  <ListItem key={consultor.id}>
                    <h6 className="mt-2">
                      Nome: {consultor.nomeConsultor}
                      <br />
                      <br />
                      Email: {consultor.emailConsultor}
                    </h6>
                  </ListItem>
                </ul>
              </li>
            ))}
          </List>
          <Botao
            titulo="adicionar"
            classes="btn btn-warning botao-menor-personalizado mt-4"
            onClick={() => adicionarConsultorAEquipe()}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default DadosCompeticao;

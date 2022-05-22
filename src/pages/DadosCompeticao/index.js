import React, { useEffect, useState, useContext } from "react";
import { Box, List, ListItem, ListItemText, IconButton, Modal, Typography, TextField, TextareaAutosize, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";


import Mensagem from "../../components/Mensagem";
import Botao from "../../components/Botao";
import { styleModals } from "../../utils/constantes";

import {
  MSG000
} from "../../utils/mensagens";


import DefaultHeader from "../../components/DefaultHeader";

import "./styles.css";

function DadosCompeticao() {

  const [mensagemErro, setMensagemErro] = useState(MSG000);

  const [value, setValue] = React.useState(0);
  const { idCompeticao, papelUsuario } = useParams();

  const [resultados, setResultados] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [consultores, setConsultores] = useState([]);

  const [openModalEscolherConsultor, setOpenModalEscolherConsultor] =
    React.useState(false);
  const handleCloseModalEscolherConsultor = () => setOpenModalEscolherConsultor(false);
  const handleOpenModalEscolherConsultor = () => {
    console.log("passou aqui primeiro");
    consultores.push({
      id: 1,
      nome: "Consultor 1",
      email: "consultor1@gmail.com"
    });
    setOpenModalEscolherConsultor(true)
  };


  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  };

  const valueProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const PainelDadosGerais = () => {
    return (
      <div id="id-panel-dados-gerais" className="d-flex justify-content-between p-3 pt-4">
        <div id="id-dados-da-competicao">
          <h5 className="mb-5">Dados da Competição</h5>
          <h6 className="mt-3">Nome da Competição</h6>
          <input type="text" value={null} className="border border-2 rounded input-cadastro-competicao" disabled />
          <div className="d-flex justify-content-between">
            <div>
              <h6 >Min. por equipe</h6>
              <input type="text" value={null} className="border border-2 rounded" disabled />
            </div>
            <div>
              <h6 >Max. por equipe</h6>
              <input type="text" value={null} className="border border-2 rounded" disabled />
            </div>
          </div>
          <h6 className="mt-3">Domínio restrito para inscritos</h6>
          <input type="text" value={null} className="border border-2 rounded input-cadastro-competicao" disabled />
          <h6 className="">Tempo máx. pitch(min)</h6>
          <input type="text" value={null} className="border border-2 rounded" disabled />
        </div>
        <div id="id-etapas-da-competicao">
          <h5 className="mb-5">Etapas da Competição</h5>
          <div className="d-flex justify-content-between">
            <div className="pe-3">
              <h6 >Início inscrições</h6>
              <input type="text" value={null} className="border border-2 rounded" disabled />
            </div>
            <div>
              <h6 >Término inscrições</h6>
              <input type="text" value={null} className="border border-2 rounded" disabled />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <h6 >Início aquecimento</h6>
              <input type="text" value={null} className="border border-2 rounded" disabled />
            </div>
            <div>
              <h6 >Término aquecimento</h6>
              <input type="text" value={null} className="border border-2 rounded" disabled />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <h6 >Início imersão</h6>
              <input type="text" value={null} className="border border-2 rounded" disabled />
            </div>
            <div>
              <h6 >Término imersão</h6>
              <input type="text" value={null} className="border border-2 rounded" disabled />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <h6 >Início pitch</h6>
              <input type="text" value={null} className="border border-2 rounded" disabled />
            </div>
            <div>
              <h6 >Término pitch</h6>
              <input type="text" value={null} className="border border-2 rounded" disabled />
            </div>
          </div>
          <Botao
            id="btn-regulamento-para-teste"
            classes="btn btn-warning botao-menor-personalizado mt-3"
            titulo="Regulamento da competição"
            onClick={() => baixarRegulamento()}
          >
            <i className="fa-solid fa-download"></i>
          </Botao>
        </div>
      </div >
    );
  }

  const PainelEquipes = () => {

    let equipesRetornadas = [
      {
        id: 1,
        nome: "Equipe 1"
      },
      {
        id: 2,
        nome: "Equipe 2"
      },
      {
        id: 3,
        nome: "Equipe 3"
      },
      {
        id: 4,
        nome: "Equipe 4"
      },
      {
        id: 5,
        nome: "Equipe 5"
      },
      {
        id: 6,
        nome: "Equipe 6"
      },
      {
        id: 7,
        nome: "Equipe 7"
      }
    ];

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
          {equipesRetornadas.map((equipe, index) => (
            <li key={index} className="border border-warning rounded m-3 p-2">
              <ul>
                <ListItem
                  secondaryAction={
                    <div>
                      <IconButton
                        edge="end"
                        aria-label="adicionar"
                        className="me-1"
                        id="botao-atualizar-questao"
                        onClick={handleOpenModalEscolherConsultor}
                      >
                        <i className="fa-solid fa-user-plus hover-azul p-0 text-warning" ></i>
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deletarEquipe()}
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
          ))}
        </List>
      </div>
    );
  }

  const PainelResultadoGeral = () => {

    let resultadosRetornados = [
      {
        nome: "Equipe 1",
        notaDada: 10,
        notaMax: 10
      },
      {
        nome: "Equipe 2",
        notaDada: 8,
        notaMax: 10
      },
      {
        nome: "Equipe 3",
        notaDada: 9,
        notaMax: 10
      },
      {
        nome: "Equipe 4",
        notaDada: 10,
        notaMax: 10
      },
      {
        nome: "Equipe 5",
        notaDada: 10,
        notaMax: 10
      },
      {
        nome: "Equipe 6",
        notaDada: 10,
        notaMax: 10
      },
      {
        nome: "Equipe 7",
        notaDada: 10,
        notaMax: 10
      }
    ];

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
          {resultadosRetornados.map((resultado, index) => (
            <li key={index} className="border border-warning rounded m-3 p-2">
              <ul>
                <ListItem
                  key={resultado.nome}
                >
                  <div className="d-flex justify-content-between mt-3 w-100">
                    <h6>{index + 1}°</h6>
                    <h6>{resultado.nome}</h6>
                    <h6>{resultado.notaDada}/{resultado.notaMax}</h6>
                  </div>
                </ListItem>
              </ul>
            </li>
          ))}
        </List>
      </div>
    );
  }

  const adicionarConsultorAEquipe = () => {
    console.log("adicionando consultor a equipe")
  }

  const deletarEquipe = () => {
    console.log("deletando equipe")
  }

  const baixarRegulamento = () => {
    console.log("baixando regulamento")
  }

  return (
    <div id="dados-competicao">
      <DefaultHeader />
      <div style={{ width: "50%" }}>
        {mensagemErro !== MSG000 ? (
          <Mensagem mensagem={mensagemErro} tipoMensagem={MSG000} />
        ) : null}
      </div>
      <div className="p-4">
        <Box sx={{ width: "100%" }} className="ps-2 pe-3">
          <div className="d-flex justify-content-between">
            <h1 className="titulos-principais">Competição</h1>
            <Botao
              titulo="voltar"
              classes="btn btn-secondary botao-menor-personalizado"
              onClick={null}
            />
          </div>
          <div className="mt-3">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                aria-label="basic tabs example"
              >

                < Tab
                  label={"Dados Gerais"}
                  {...valueProps(0)}
                />
                {papelUsuario === "ORGANIZADOR" ? (<Tab
                  label={"Equipes"}
                  {...valueProps(1)}
                />) : null}
                <Tab
                  label={"Resultado Geral"}
                  {...valueProps(2)}
                />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <PainelDadosGerais />
            </TabPanel>
            {papelUsuario === "ORGANIZADOR" ? (<TabPanel value={value} index={1}>
              <PainelEquipes />
            </TabPanel>) : null}
            <TabPanel value={value} index={papelUsuario === "ORGANIZADOR" ? 2 : 1}>
              <PainelResultadoGeral />
            </TabPanel>


            <Modal
              open={openModalEscolherConsultor}
              onClose={handleCloseModalEscolherConsultor}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleModals} style={{ width: 600 }}>
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
                    <li key={index} className="border border-warning rounded m-3 p-2">
                      <ul>
                        <ListItem
                          key={consultor.id}
                        >
                          <h6 className="mt-2">
                            Nome: {consultor.nome}
                            <br />
                            <br />
                            Email: {consultor.email}
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
        </Box>
      </div>
    </div>
  );
}

export default DadosCompeticao;
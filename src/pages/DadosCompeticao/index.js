import React, { useEffect, useState, useContext } from "react";
import { Box, List, ListItem, ListItemText, IconButton, Modal, Typography, TextField, TextareaAutosize, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import StoreContext from "../../store/context";
import Mensagem from "../../components/Mensagem";
import Botao from "../../components/Botao";
import { styleModals } from "../../utils/constantes";
import DefaultHeader from "../../components/DefaultHeader";
import { MSG000, MSG006 } from "../../utils/mensagens";

import "./styles.css";

function DadosCompeticao() {

  const [mensagemErro, setMensagemErro] = useState(MSG000);

  const [value, setValue] = React.useState(0);
  const { idCompeticao, papelUsuario } = useParams();

  const [nome, setNome] = useState(MSG000);
  const [dominio, setDominio] = useState(MSG000);
  const [regulamento, setRegulamento] = useState(MSG000);
  const [tempoMaxPitch, setTempoMaxPitch] = useState(MSG000);
  const [qntdMinMembros, setQntdMinMembros] = useState(MSG000);
  const [qntdMaxMembros, setQntdMaxMembros] = useState(MSG000);
  const [dataInicioInscricoes, setDataInicioInscricoes] = useState(MSG000);
  const [dataTerminoInscricoes, setDataTerminoInscricoes] = useState(MSG000);
  const [dataInicioAquecimento, setDataInicioAquecimento] = useState(MSG000);
  const [dataTerminoAquecimento, setDataTerminoAquecimento] = useState(MSG000);
  const [dataInicioImersao, setDataInicioImersao] = useState(MSG000);
  const [dataTerminoImersao, setDataTerminoImersao] = useState(MSG000);
  const [dataInicioPitch, setDataInicioPitch] = useState(MSG000);
  const [dataTerminoPitch, setDataTerminoPitch] = useState(MSG000);

  const [resultados, setResultados] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [consultores, setConsultores] = useState([]);

  const [openModalEscolherConsultor, setOpenModalEscolherConsultor] =
    React.useState(false);
  const handleCloseModalEscolherConsultor = () => setOpenModalEscolherConsultor(false);
  const handleOpenModalEscolherConsultor = () => setOpenModalEscolherConsultor(true);

  const { token } = useContext(StoreContext);
  const [mudou, setMudou] = useState(true);

  const [idEquipeEscolhida, setIdEquipeEscolhida] = useState(0);
  const [idConsultor, setIdConsultor] = useState(0);

  useEffect(() => {
    buscarDadosGerais();
    buscarEquipes();
    buscarConsultores();
    buscarResultados();
  }, []);

  const buscarDadosGerais = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/competicao/dados-gerais/${idCompeticao}`).then((response) => {
      const { data } = response;

      setNome(data.nomeCompeticao);
      setDominio(data.dominioCompeticao);
      setRegulamento(data.arquivoRegulamentoCompeticao);
      setTempoMaxPitch(data.tempoMaximoVideoEmSeg / 60);
      setQntdMinMembros(data.qntdMaximaMembrosPorEquipe);
      setQntdMaxMembros(data.qntdMinimaMembrosPorEquipe);

      let etapa1 = data.etapas[0];
      let etapa2 = data.etapas[1];
      let etapa3 = data.etapas[2];
      let etapa4 = data.etapas[3];

      let data1 = new Date();
      data1.setDate(etapa1.dataInicio[2]);
      data1.setMonth(etapa1.dataInicio[1] - 1);
      data1.setFullYear(etapa1.dataInicio[0]);

      let data2 = new Date();
      data2.setDate(etapa1.dataTermino[2]);
      data2.setMonth(etapa1.dataTermino[1] - 1);
      data2.setFullYear(etapa1.dataTermino[0]);

      let data3 = new Date();
      data3.setDate(etapa2.dataInicio[2]);
      data3.setMonth(etapa2.dataInicio[1] - 1);
      data3.setFullYear(etapa2.dataInicio[0]);

      let data4 = new Date();
      data4.setDate(etapa2.dataTermino[2]);
      data4.setMonth(etapa2.dataTermino[1] - 1);
      data4.setFullYear(etapa2.dataTermino[0]);

      let data5 = new Date();
      data5.setDate(etapa3.dataInicio[2]);
      data5.setMonth(etapa3.dataInicio[1] - 1);
      data5.setFullYear(etapa3.dataInicio[0]);

      let data6 = new Date();
      data6.setDate(etapa3.dataTermino[2]);
      data6.setMonth(etapa3.dataTermino[1] - 1);
      data6.setFullYear(etapa3.dataTermino[0]);

      let data7 = new Date();
      data7.setDate(etapa4.dataInicio[2]);
      data7.setMonth(etapa4.dataInicio[1] - 1);
      data7.setFullYear(etapa4.dataInicio[0]);

      let data8 = new Date();
      data8.setDate(etapa4.dataTermino[2]);
      data8.setMonth(etapa4.dataTermino[1] - 1);
      data8.setFullYear(etapa4.dataTermino[0]);

      setDataInicioInscricoes(data1.toLocaleDateString());
      setDataTerminoInscricoes(data2.toLocaleDateString());
      setDataInicioAquecimento(data3.toLocaleDateString());
      setDataTerminoAquecimento(data4.toLocaleDateString());
      setDataInicioImersao(data5.toLocaleDateString());
      setDataTerminoImersao(data6.toLocaleDateString());
      setDataInicioPitch(data7.toLocaleDateString());
      setDataTerminoPitch(data8.toLocaleDateString());

    });
  }

  const buscarEquipes = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/competicao/equipes/${idCompeticao}`).then((response) => {
      const { data } = response;
      setEquipes(data);

    });
  }

  const buscarConsultores = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/competicao/consultores/${idCompeticao}`).then((response) => {
      const { data } = response;
      setConsultores(data);
    });
  }

  const buscarResultados = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/competicao/resultados-gerais/${idCompeticao}`).then((response) => {
      const { data } = response;
      setResultados(data);
    });
  }

  const adicionarIdEquipeEAbrirModal = (idEquipe) => {
    setIdEquipeEscolhida(idEquipe);
    handleOpenModalEscolherConsultor();
  }

  const adicionarConsultorAEquipe = () => {
    if (idEquipeEscolhida !== 0 && idConsultor !== 0) {
      console.log("entrou")
      api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
      api.post(`/competicao/adicionar-consultor/${idCompeticao}/${idEquipeEscolhida}/${idConsultor}`).then((response) => {
        setIdEquipeEscolhida(0);
        setIdConsultor(0);
        setMensagemErro(MSG000);
        handleCloseModalEscolherConsultor();
        buscarEquipes();

      });
    } else {
      setMensagemErro("Escolha um consultor");
    }
  }

  const deletarEquipe = (idEquipe) => {
    api.defaults.headers.delete["Authorization"] = `Bearer ${token}`;
    api.delete(`/competicao/deletar-equipe/${idCompeticao}/${idEquipe}`).then((response) => {
      buscarEquipes();
    });
    setMudou(false);
    setMudou(true);
  }

  const baixarRegulamento = () => {
    var byteCharacters = window.atob(regulamento);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: 'application/pdf;base64' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

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
          <input type="text" value={nome} className="border border-2 rounded input-cadastro-competicao" disabled />
          <div className="d-flex justify-content-between">
            <div>
              <h6 >Min. por equipe</h6>
              <input type="text" value={qntdMinMembros} className="border border-2 rounded" disabled />
            </div>
            <div>
              <h6 >Max. por equipe</h6>
              <input type="text" value={qntdMaxMembros} className="border border-2 rounded" disabled />
            </div>
          </div>
          <h6 className="mt-3">Domínio restrito para inscritos</h6>
          <input type="text" value={dominio} className="border border-2 rounded input-cadastro-competicao" disabled />
          <h6 className="">Tempo máx. pitch(min)</h6>
          <input type="text" value={tempoMaxPitch} className="border border-2 rounded" disabled />
        </div>
        <div id="id-etapas-da-competicao">
          <h5 className="mb-5">Etapas da Competição</h5>
          <div className="d-flex justify-content-between">
            <div className="pe-3">
              <h6 >Início inscrições</h6>
              <input type="text" value={dataInicioInscricoes} className="border border-2 rounded" disabled />
            </div>
            <div>
              <h6 >Término inscrições</h6>
              <input type="text" value={dataTerminoInscricoes} className="border border-2 rounded" disabled />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <h6 >Início aquecimento</h6>
              <input type="text" value={dataInicioAquecimento} className="border border-2 rounded" disabled />
            </div>
            <div>
              <h6 >Término aquecimento</h6>
              <input type="text" value={dataTerminoAquecimento} className="border border-2 rounded" disabled />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <h6 >Início imersão</h6>
              <input type="text" value={dataInicioImersao} className="border border-2 rounded" disabled />
            </div>
            <div>
              <h6 >Término imersão</h6>
              <input type="text" value={dataTerminoImersao} className="border border-2 rounded" disabled />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <h6 >Início pitch</h6>
              <input type="text" value={dataInicioPitch} className="border border-2 rounded" disabled />
            </div>
            <div>
              <h6 >Término pitch</h6>
              <input type="text" value={dataTerminoPitch} className="border border-2 rounded" disabled />
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
                          onClick={() => adicionarIdEquipeEAbrirModal(equipe.id)}
                        >
                          <i className="fa-solid fa-user-plus hover-azul p-0 text-warning" ></i>
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
            )) : null}
        </List>
      </div>
    );
  }

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
            <li key={index} className="border border-warning rounded m-3 p-2">
              <ul>
                <ListItem
                  key={index}
                >
                  <div className="d-flex justify-content-between mt-3 w-100">
                    <h6>{index + 1}°</h6>
                    <h6>{resultado.nome}</h6>
                    <h6>{resultado.notaAtribuida}/{resultado.notaMaximaCompeticao}</h6>
                  </div>
                </ListItem>
              </ul>
            </li>
          ))}
        </List>
      </div>
    );
  }

  return (
    <div id="dados-competicao">
      <DefaultHeader />
      <div className=" ps-3 pe-4 pt-3 d-flex justify-content-between">
        <h1 className="ps-3 ms-1 titulos-principais">Competição</h1>
        <Botao
          titulo="voltar"
          classes="btn me-4 btn-secondary botao-menor-personalizado"
          onClick={null}
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

            <TabPanel color="warning" value={value} index={0}>
              <PainelDadosGerais />
            </TabPanel>
            {papelUsuario === "ORGANIZADOR" ? (<TabPanel color="warning" value={value} index={1}>
              <PainelEquipes />
            </TabPanel>) : null}
            <TabPanel color="warning" value={value} index={papelUsuario === "ORGANIZADOR" ? 2 : 1}>
              <PainelResultadoGeral />
            </TabPanel>


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
                    <li key={index} className="border border-warning rounded mb-3 p-2 list-group-item list-group-item-action">
                      <ul onClick={() => setIdConsultor(consultor.id)}>
                        <ListItem
                          key={consultor.id}
                        >
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
        </Box>
      </div>
    </div>
  );
}

export default DadosCompeticao;
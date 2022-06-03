import React, { useContext, useState, useEffect } from "react";

import Tab from "@mui/material/Tab";
import List from "@mui/material/List";
import Tabs from "@mui/material/Tabs";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { Box, Modal, TextField, TextareaAutosize } from "@mui/material";

import api from "./../../../services/api";
import Botao from "../../Botao";
import Mensagem from "../../Mensagem";
import StoreContext from "./../../../store/context";
import { styleModals, TabPanel, valueProps } from "../../../utils/constantes";
import IdCompeticaoContext from "../../../utils/context/idCompeticaoContext";
import {
  MSG000,
  MSG004,
  MSG006,
  MSG030,
  MSG036,
  MSG038,
  MSG039,
} from "../../../utils/mensagens";

import "./styles.css";

function QuestoesAvaliativasPitches(props) {
  const idCompeticaoHook = useContext(IdCompeticaoContext);

  const [value, setValue] = React.useState(0);

  const [questoesAdaptabilidade, setQuestaoAdaptabilidade] = useState([]);
  const [questoesInovacao, setQuestaoInovacao] = useState([]);
  const [questoesUtilidade, setQuestaoUtilidade] = useState([]);
  const [questoesSustentabilidade, setQuestaoSustentabilidade] = useState([]);

  const [openModalCriarQuestao, setOpenModalCriarQuestao] =
    React.useState(false);
  const handleOpenModalCriarQuestao = () => setOpenModalCriarQuestao(true);
  const handleCloseModalCriarQuestao = () => {
    setQuestao(MSG000);
    setPontosMax(null);
    setErrorPontosMax(false);
    setMensagemPontosMax(MSG000);
    setMensagemErroQuestao(MSG000);
    setOpenModalCriarQuestao(false);
  };

  const [tipo, setTipo] = useState(MSG000);
  const [questao, setQuestao] = useState(MSG000);
  const [pontosMax, setPontosMax] = useState(MSG000);
  const [indexQuestao, setindexQuestao] = useState(-1);
  const [errorPontosMax, setErrorPontosMax] = useState(false);
  const [mensagemPontosMax, setMensagemPontosMax] = useState(MSG000);
  const [mensagemErroQuestao, setMensagemErroQuestao] = useState(MSG000);

  const [isAtualizarQuestao, setIsAtualizarQuestao] = useState(false);

  const [mensagemErro, setMensagemErro] = useState(MSG000);

  const { token } = useContext(StoreContext);

  const cadastrarNovaQuestaoAvaliativa = () => {
    setErrorPontosMax(false);
    setMensagemPontosMax(MSG000);

    if (!pontosMax) {
      setErrorPontosMax(true);
      setMensagemPontosMax(MSG004);
    } else if (pontosMax <= 4) {
      setErrorPontosMax(true);
      setMensagemPontosMax(MSG036);
    } else if (questao === MSG000) {
      setMensagemErroQuestao(MSG038);
    } else if (questao.length < 5 || questao.length > 80) {
      setMensagemErroQuestao(MSG039);
    } else {
      let lista = questoesSustentabilidade;

      if (tipo === "Adaptabilidade") {
        lista = questoesAdaptabilidade;
      } else if (tipo === "Inovação") {
        lista = questoesInovacao;
      } else if (tipo === "Utilidade") {
        lista = questoesUtilidade;
      }

      if (isAtualizarQuestao) {
        lista.splice(indexQuestao, 1);
      }

      lista.push({
        questao,
        pontosMax,
      });

      setQuestao(MSG000);
      setPontosMax(null);
      setIsAtualizarQuestao(false);
      props.setQuestoesAvaliativasOk(false);

      handleCloseModalCriarQuestao();
    }
  };

  const removerQuestaoAvaliativa = async (index) => {
    let lista = questoesSustentabilidade;

    if (tipo === "Adaptabilidade") {
      lista = questoesAdaptabilidade;
    } else if (tipo === "Inovação") {
      lista = questoesInovacao;
    } else if (tipo === "Utilidade") {
      lista = questoesUtilidade;
    }
    lista.splice(index, 1);

    let questoesAtt = lista;

    await setTimeout(() => {
      if (tipo === "Adaptabilidade") {
        setQuestaoAdaptabilidade(questoesAtt);
      } else if (tipo === "Inovação") {
        setQuestaoInovacao(questoesAtt);
      } else if (tipo === "Utilidade") {
        setQuestaoUtilidade(questoesAtt);
      } else {
        setQuestaoSustentabilidade(questoesAtt);
      }
    }, 400);

    ListPanel(tipo);
  };

  const preencherQuestaoAvaliativa = async (questao, index) => {
    setIsAtualizarQuestao(true);
    setQuestao(questao.questao);
    setPontosMax(questao.pontosMax);
    setindexQuestao(index);

    handleOpenModalCriarQuestao();
  };

  const confirmarQuestoesAvaliativas = () => {
    props.setQuestoesAvaliativasOk(false);

    if (
      questoesSustentabilidade.length === 0 &&
      questoesAdaptabilidade.length === 0 &&
      questoesInovacao.length === 0 &&
      questoesUtilidade.length === 0
    ) {
      setMensagemErro(MSG030);
    } else {
      setMensagemErro(MSG000);
      let questoes = formatarArrayQuestoes();

      api.defaults.headers.patch["Authorization"] = `Bearer ${token}`;
      api
        .patch(`/competicao/update/${idCompeticaoHook}`, {
          questoesAvaliativas: questoes,
          isElaboracao: true,
        })
        .then((response) => {
          console.log(response.data);
          props.handleQuestoesAvaliativas(questoes);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  const formatarArrayQuestoes = () => {
    let questoes = [];

    atribuirQuestoes(questoes, questoesAdaptabilidade, "ADAPTABILIDADE");
    atribuirQuestoes(questoes, questoesInovacao, "INOVACAO");
    atribuirQuestoes(questoes, questoesUtilidade, "UTILIDADE");
    atribuirQuestoes(questoes, questoesSustentabilidade, "SUSTENTABILIDADE");

    return questoes;
  };

  const atribuirQuestoes = (questoes, array, tipoQuestaoAvaliativa) => {
    array.forEach((questao) =>
      questoes.push({
        notaMax: Number(questao.pontosMax),
        questao: questao.questao,
        enumeracao: Number(questoes.length + 1),
        tipoQuestaoAvaliativa,
      })
    );
  };

  const ListPanel = (props) => {
    const { opcao } = props;

    let lista = questoesSustentabilidade;
    setTipo("Sustentabilidade");

    if (opcao === "Adaptabilidade") {
      lista = questoesAdaptabilidade;
      setTipo("Adaptabilidade");
    } else if (opcao === "Inovação") {
      lista = questoesInovacao;
      setTipo("Inovação");
    } else if (opcao === "Utilidade") {
      lista = questoesUtilidade;
      setTipo("Utilidade");
    }

    return (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {lista.map((questao, index) => (
          <li key={index} className="border rounded m-3 p-2">
            <ul>
              <ListItem
                secondaryAction={
                  <div>
                    <IconButton
                      edge="end"
                      aria-label="upload"
                      className="me-1"
                      id="botao-atualizar-questao"
                      onClick={() => preencherQuestaoAvaliativa(questao, index)}
                    >
                      <i className="fa-solid fa-pen-to-square hover-azul p-0"></i>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removerQuestaoAvaliativa(index)}
                    >
                      <i className="fa-solid fa-trash-can p-0"></i>
                    </IconButton>
                  </div>
                }
                key={questao.questao}
              >
                <ListItemText primary={questao.questao} />
              </ListItem>
            </ul>
          </li>
        ))}
      </List>
    );
  };

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/${idCompeticaoHook}/questoes-avaliativas`)
      .then((response) => {
        const { data } = response;

        let listaSustentabilidade = [];
        let listaAdaptabilidade = [];
        let listaInovacao = [];
        let listaUtilidade = [];

        data.map((questao) => {
          let tipo = questao.tipoQuestaoAvaliativa;

          let questaoFormatada = {
            questao: questao.questao,
            pontosMax: questao.notaMax,
          };

          if (tipo === "SUSTENTABILIDADE") {
            listaSustentabilidade.push(questaoFormatada);
          } else if (tipo === "ADAPTABILIDADE") {
            listaAdaptabilidade.push(questaoFormatada);
          } else if (tipo === "INOVACAO") {
            listaInovacao.push(questaoFormatada);
          } else if (tipo === "UTILIDADE") {
            listaUtilidade.push(questaoFormatada);
          }
        });

        setQuestaoSustentabilidade(listaSustentabilidade);
        setQuestaoAdaptabilidade(listaAdaptabilidade);
        setQuestaoInovacao(listaInovacao);
        setQuestaoUtilidade(listaUtilidade);

        if (data.length > 0) {
          let questoes = formatarArrayQuestoes();
          props.handleQuestoesAvaliativas(questoes, false);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [idCompeticaoHook]);

  return (
    <div>
      <div style={{ width: "50%" }}>
        {mensagemErro !== MSG000 ? (
          <Mensagem mensagem={mensagemErro} tipoMensagem={MSG006} />
        ) : null}
      </div>
      <Box sx={{ width: "100%" }}>
        <div className="text-end">
          <Botao
            titulo="adicionar"
            classes="btn btn-warning botao-menor-personalizado "
            id="btn-adicionar-questao-avaliativa"
            onClick={handleOpenModalCriarQuestao}
          />
        </div>
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
            <Tab
              label={`Adaptabilidade (${questoesAdaptabilidade.length})`}
              {...valueProps(0)}
            />
            <Tab
              label={`Inovação (${questoesInovacao.length})`}
              {...valueProps(1)}
            />
            <Tab
              label={`Utilidade (${questoesUtilidade.length})`}
              {...valueProps(2)}
            />
            <Tab
              label={`Sustentabilidade (${questoesSustentabilidade.length})`}
              {...valueProps(3)}
            />
          </Tabs>
        </Box>

        <TabPanel color="warning" value={value} index={0}>
          <ListPanel opcao="Adaptabilidade" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ListPanel opcao="Inovação" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ListPanel opcao="Utilidade" />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ListPanel opcao="Sustentabilidade" />
        </TabPanel>

        <Modal
          open={openModalCriarQuestao}
          onClose={handleCloseModalCriarQuestao}
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
              Questão Avaliativa
            </Typography>
            <div id="pontosMaximos" className="input-quantidade-pontos-max">
              {/* helperText="Quantidade máxima de pontos que essa questão vale" */}
              <TextField
                error={errorPontosMax}
                helperText={mensagemPontosMax}
                id="input-quantidade-max-pontos"
                value={pontosMax}
                onChange={(e) => {
                  setPontosMax(e.target.value);
                }}
                label="Pontuação máxima da questão *"
                type="number"
                variant="filled"
                color="warning"
                size="small"
                style={{ width: "270px" }}
              />
            </div>

            {mensagemErroQuestao !== MSG000 ? (
              <div className="mt-4">
                <Mensagem
                  mensagem={mensagemErroQuestao}
                  tipoMensagem={MSG006}
                />
              </div>
            ) : null}

            <TextareaAutosize
              value={questao}
              onChange={(e) => {
                setQuestao(e.target.value);
              }}
              id="textarea-questao-avaliativa"
              className="border rounded p-3 mt-4 w-100"
              aria-label="minimum height"
              minRows={2}
              placeholder="Digite aqui a questão avaliativa"
              style={{ width: 200, height: 150, resize: "none" }}
            />
            <div className="botoes-cadastro mt-2">
              <Botao
                titulo="salvar"
                id="btn-salvar-questao-avaliativa"
                classes="btn btn-warning botao-menor-personalizado"
                onClick={() => cadastrarNovaQuestaoAvaliativa()}
              />

              <Botao
                titulo="voltar"
                classes="btn btn-secondary botao-menor-personalizado"
                onClick={handleCloseModalCriarQuestao}
              />
            </div>
          </Box>
        </Modal>

        <div className="input-cadastro-competicao mt-4">
          <Botao
            titulo="salvar"
            classes="btn btn-warning botao-menor-personalizado"
            id="btn-confirmar-questoes-avaliativas"
            onClick={confirmarQuestoesAvaliativas}
          />
        </div>
      </Box>
    </div>
  );
}

export default QuestoesAvaliativasPitches;

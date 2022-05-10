import React, { useEffect, useState } from "react";

import Tab from "@mui/material/Tab";
import List from "@mui/material/List";
import Tabs from "@mui/material/Tabs";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { Box, Modal, TextField, TextareaAutosize } from "@mui/material";

import Botao from "../../Botao";
import { MSG000 } from "../../../utils/mensagens";
import { styleModals } from "../../../utils/constantes";

import "./styles.css";

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
          <Typography>{children}</Typography>
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

function QuestoesAvaliativasPitches() {
  const [value, setValue] = React.useState(0);

  const [questoesAdaptabilidade, setQuestaoAdaptabilidade] = useState([]);
  const [questoesInovacao, setQuestaoInovacao] = useState([]);
  const [questoesUtilidade, setQuestaoUtilidade] = useState([]);
  const [questoesSustentabilidade, setQuestaoSustentabilidade] = useState([]);

  const [openModalCriarQuestao, setOpenModalCriarQuestao] =
    React.useState(false);
  const handleOpenModalCriarQuestao = () => setOpenModalCriarQuestao(true);
  const handleCloseModalCriarQuestao = () => setOpenModalCriarQuestao(false);

  const [tipo, setTipo] = useState(MSG000);
  const [questao, setQuestao] = useState(MSG000);
  const [pontosMax, setPontosMax] = useState(MSG000);
  const [indexQuestao, setindexQuestao] = useState(-1);

  const [errorPontosMax, setErrorPontosMax] = useState(false);
  const [errorQuestao, setErrorQuestao] = useState(false);

  const [isAtualizarQuestao, setIsAtualizarQuestao] = useState(false);

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

  const cadastrarNovaQuestaoAvaliativa = () => {
    if (questao && pontosMax) {
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
        pontosMax
      });

      setQuestao(MSG000);
      setPontosMax(null);
      setIsAtualizarQuestao(false);

      handleCloseModalCriarQuestao();
    }
  };

  // const atualizarQuestaoAvaliativa = () => {
  //   setQuestaoObj({
  //     questao,
  //     pontosMax,
  //   });
  //   setIsAtualizarQuestao(false);
  // };

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

    console.log(questao);

    let lista = questoesSustentabilidade;

    if (tipo === "Adaptabilidade") {
      lista = questoesAdaptabilidade;
    } else if (tipo === "Inovação") {
      lista = questoesInovacao;
    } else if (tipo === "Utilidade") {
      lista = questoesUtilidade;
    }

    setQuestao(questao.questao);
    setPontosMax(questao.pontosMax);
    setindexQuestao(index);

    handleOpenModalCriarQuestao();

    // console.log(index);
    console.log(questao);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="text-end">
        <Botao
          titulo="ADICIONAR"
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
          aria-label="basic tabs example"
        >
          <Tab label="Adaptabilidade" {...valueProps(0)} />
          <Tab label="Inovação" {...valueProps(1)} />
          <Tab label="Utilidade" {...valueProps(2)} />
          <Tab label="Sustentabilidade" {...valueProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
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
            Dimensão Avaliativa
          </Typography>
          <div id="pontosMaximos" className="input-quantidade-pontos-max">
            <TextField
              className="input-irmao"
              error={errorPontosMax}
              helperText="Quantidade máxima de pontos que essa questão vale"
              id="input-quantidade-max-pontos"
              value={pontosMax}
              onChange={(e) => {
                setPontosMax(e.target.value);
              }}
              label="Pontos máx"
              type="number"
              variant="filled"
              color="warning"
              size="small"
            />
          </div>
          <TextareaAutosize
            value={questao}
            error={errorQuestao}
            onChange={(e) => {
              setQuestao(e.target.value);
            }}
            className="border rounded p-3 mt-4 w-100"
            aria-label="minimum height"
            minRows={2}
            placeholder="O que você deseja que seja avaliado ?"
            style={{ width: 200, height: 200, resize: "none" }}
          />
          <div className="botoes-cadastro mt-2">
            <Botao
              titulo="salvar"
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
    </Box>
  );
}

export default QuestoesAvaliativasPitches;

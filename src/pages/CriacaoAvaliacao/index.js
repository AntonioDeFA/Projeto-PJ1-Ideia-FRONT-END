import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Modal,
  TextField,
  TextareaAutosize,
  Tabs,
  Tab,
  List,
  Snackbar,
  Alert
} from "@mui/material";

import api from "./../../services/api";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import Botao from "../../components/Botao";
import LeanCanvas from "../../components/LeanCanvas";
import { styleModals, TabPanel, valueProps } from "../../utils/constantes";
import {
  MSG000,
  MSG001,
  MSG005,
  MSG006,
  MSG069,
  MSG070,
  MSG071,
  MSG072
} from "./../../utils/mensagens";

import "./styles.css";

function CriacaoAvaliacao() {

  const [value, setValue] = React.useState(0);
  const [campoNota, setCampoNota] = useState(MSG000);
  const [campoSugestao, setCampoSugestao] = useState(MSG000);
  const [pontMax, setPontMax] = useState(0);
  const [tipo, setTipo] = useState(MSG000);
  const [id, setId] = useState(0);
  const [posicao, setPosicao] = useState(0);
  const [questoesAvaliadas, setQuestoesAvaliadas] = useState([]);
  const [questoes, setQuestoes] = useState([]);
  const [questoesAdaptabilidade, setQuestoesAdaptabilidade] = useState([]);
  const [questoesInovacao, setQuestoesInovacao] = useState([]);
  const [questoesUtilidade, setQuestoesUtilidade] = useState([]);
  const [questoesSustentabilidade, setQuestoesSustentabilidade] = useState([]);
  const [dadosAvaliacao, setDadosAvaliacao] = useState(null);
  const [open, setOpen] = useState(false);
  const [severidade, setSeveridade] = useState(MSG006);
  const [mensagemSnackBar, setMensagemSnackBar] = useState(MSG000);
  const [openModalLeanCanvas, setOpenModalLeanCanvas] =
    React.useState(false);
  const handleOpenModalLeanCanvas = () =>
    setOpenModalLeanCanvas(true);
  ;
  const handleCloseModalLeanCanvas = () =>
    setOpenModalLeanCanvas(false);

  const [openModalAvaliar, setOpenModalAvaliar] =
    React.useState(false);
  const handleOpenModalAvaliar = () =>
    setOpenModalAvaliar(true);
  ;
  const handleCloseModalAvaliar = () =>
    setOpenModalAvaliar(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlerta = (mensagem, severidade) => {
    setMensagemSnackBar(mensagem);
    setSeveridade(severidade);
    setOpen(true);
  };

  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const { idEquipe } = useParams();

  const abrirModalAvaliar = (notaMax, sugestao, nota, index, id) => {
    setPontMax(notaMax);
    setCampoSugestao(sugestao);
    setCampoNota(nota);
    setPosicao(index)
    setId(id);
    handleOpenModalAvaliar();
  }

  const abrirPitch = () => {
    let descricaoType = "video/mp4;base64";

    if (dadosAvaliacao.pitchDeck.tipo === "PDF") {
      descricaoType = "application/pdf;base64";
    }

    var byteCharacters = window.atob(dadosAvaliacao.pitchDeck.arquivoPitchDeck);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: descricaoType });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  const adicionarAvaliacao = () => {

    if (campoSugestao === null || campoNota === null) {
      handleAlerta(MSG001, MSG006);
    } else if (campoSugestao.length < 5) {
      handleAlerta(MSG069, MSG006);
    } else if (campoNota > pontMax) {
      handleAlerta(MSG070, MSG006);
    } else {

      let lista = [];

      if (tipo === "ADAPTABILIDADE") {
        lista = questoesAdaptabilidade;
      } else if (tipo === "INOVACAO") {
        lista = questoesInovacao;
      } else if (tipo === "UTILIDADE") {
        lista = questoesUtilidade;
      } else {
        lista = questoesSustentabilidade;
      }

      lista[posicao].nota = Number(campoNota);
      lista[posicao].sugestao = campoSugestao;

      if (!questoesAvaliadas.includes(id)) {
        questoesAvaliadas.push(id);
      }

      handleCloseModalAvaliar();
      handleAlerta(MSG071, MSG005);
    }
  }

  const enviarAvaliacao = async () => {

    if (questoesAdaptabilidade.length +
      questoesInovacao.length +
      questoesUtilidade.length +
      questoesSustentabilidade.length === questoesAvaliadas.length) {


      questoesAdaptabilidade.map((questao) => {
        questoes.push(
          {
            notaAtribuida: Number(questao.nota),
            idQuestao: Number(questao.id),
            observacao: questao.sugestao
          }
        );
      });

      questoesInovacao.map((questao) => {
        questoes.push(
          {
            notaAtribuida: Number(questao.nota),
            idQuestao: Number(questao.id),
            observacao: questao.sugestao
          }
        );
      });

      questoesUtilidade.map((questao) => {
        questoes.push(
          {
            notaAtribuida: Number(questao.nota),
            idQuestao: Number(questao.id),
            observacao: questao.sugestao
          }
        );
      });

      questoesSustentabilidade.map((questao) => {
        questoes.push(
          {
            notaAtribuida: Number(questao.nota),
            idQuestao: Number(questao.id),
            observacao: questao.sugestao
          }
        );
      });

      setTimeout(() => {
        api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
        api
          .post(`/criar-avaliacao/${idEquipe}`, questoes)
          .then((response) => {
            navigate("/listagem-avaliacao");
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }, 2500);

    } else {
      handleAlerta(MSG072, MSG006);
    }
  }


  const ListaQuestao = (props) => {

    const { opcao } = props;

    let questoes = [];

    if (opcao === "ADAPTABILIDADE") {
      questoes = questoesAdaptabilidade;
      setTipo("ADAPTABILIDADE");
    } else if (opcao === "INOVACAO") {
      questoes = questoesInovacao;
      setTipo("INOVACAO");
    } else if (opcao === "UTILIDADE") {
      questoes = questoesUtilidade;
      setTipo("UTILIDADE");
    } else if (opcao === "SUSTENTABILIDADE") {
      questoes = questoesSustentabilidade;
      setTipo("SUSTENTABILIDADE");
    }

    return (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 390,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {questoes.map((questao, index) => (
          <div key={index} className="borda-laranja rounded p-3">
            <div className="d-flex justify-content-between">
              <h5 className="text-break w-75 ms-2 mb-0 align-self-center">{questao.questaoAvaliativa}</h5>
              <Botao
                titulo="responder questão"
                classes="btn btn-warning botao-menor-personalizado"
                id="btn-lean-canvas-avaliacao"
                onClick={() => abrirModalAvaliar(questao.pontuacaoMaxima, questao.sugestao, questao.nota, index, questao.id)}
              />
            </div>
            {questao.sugestao !== null ? (
              <div>
                <div className="d-flex justify-content-end mt-4">
                  <h5 className="m-0"><strong>{questao.nota}</strong>/{questao.pontuacaoMaxima} </h5>
                </div>
                <TextareaAutosize
                  id="textarea-sugestao-questao-avaliativa"
                  className="border rounded p-3 w-100"
                  aria-label="minimum height"
                  minRows={2}
                  value={questao.sugestao}
                  style={{ width: 200, height: 150, resize: "none" }}
                  disabled={true}
                />
              </div>
            ) :
              (
                <div className="w-25 border border-danger rounded mt-4">
                  <h6 className="m-2 text-center text-danger">
                    Necessita de avaliação.
                  </h6>
                </div>
              )}
          </div>
        ))}
      </List >
    );
  }

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/equipe/${idEquipe}/dados-avaliacao`)
      .then((response) => {
        console.log(response.data);
        setDadosAvaliacao(response.data);
        setQuestoesAdaptabilidade(response.data.questoesAdaptabilidade);
        setQuestoesInovacao(response.data.questoesInovacao);
        setQuestoesUtilidade(response.data.questoesUtilidade);
        setQuestoesSustentabilidade(response.data.questoesSustentabilidade);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div id="pagina-avaliar-equipe">
      <DefaultHeader iconeDestaque="avaliador" />
      <div id="id-criar-avaliacao-equipe">
        <div className="d-flex justify-content-between mb-4">
          <div className="titulos-principais">Nome Competição / Nome Equipe</div>
          <div>
            <Botao
              titulo="lean canvas"
              classes="btn btn-warning botao-menor-personalizado me-2"
              id="btn-lean-canvas-avaliacao"
              onClick={handleOpenModalLeanCanvas}
            />
            <Botao
              titulo="pitch"
              classes="btn btn-warning botao-menor-personalizado me-2"
              id="btn-pitch-avaliacao"
              onClick={() => abrirPitch()}
            />
            <Botao
              titulo="enviar"
              classes="btn btn-warning botao-menor-personalizado me-2"
              id="btn-enviar-avaliacao"
              onClick={() => enviarAvaliacao()}
            />
            <Botao
              titulo="voltar"
              classes="btn btn-secondary botao-menor-personalizado"
              id="btn-voltar-avaliacao"
              onClick={() => {
                navigate("/listagem-avaliacao");
              }}
            />
          </div>
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
              label={`Adaptabilidade`}
              {...valueProps(0)}
            />
            <Tab
              label={`Inovação`}
              {...valueProps(1)}
            />
            <Tab
              label={`Utilidade`}
              {...valueProps(2)}
            />
            <Tab
              label={`Sustentabilidade`}
              {...valueProps(3)}
            />
          </Tabs>
        </Box>

        <TabPanel color="warning" value={value} index={0} className="tab-customizada">
          <ListaQuestao opcao="ADAPTABILIDADE" />
        </TabPanel>
        <TabPanel value={value} index={1} className="tab-customizada">
          <ListaQuestao opcao="INOVACAO" />
        </TabPanel>
        <TabPanel value={value} index={2} className="tab-customizada">
          <ListaQuestao opcao="UTILIDADE" />
        </TabPanel>
        <TabPanel value={value} index={3} className="tab-customizada">
          <ListaQuestao opcao="SUSTENTABILIDADE" />
        </TabPanel>

        <Modal
          open={openModalLeanCanvas}
          onClose={handleCloseModalLeanCanvas}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModals}>
            <div className="w-100">
              <LeanCanvas leanCanvas={dadosAvaliacao?.leanCanvas} isTelaFeedbacks={true} />
              <div className="d-flex justify-content-end mt-3">
                <Botao
                  titulo="fechar"
                  classes="btn btn-warning botao-menor-personalizado"
                  id="btn-pitch-avaliacao"
                  onClick={handleCloseModalLeanCanvas}
                />
              </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={openModalAvaliar}
          onClose={handleCloseModalAvaliar}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModals}>
            <div className="w-100">
              <div className="align-self-center d-flex justify-content-start">
                <TextField
                  id="input-nota-questao"
                  value={campoNota}
                  onChange={(e) => {
                    setCampoNota(e.target.value);
                  }}
                  label="Sua nota"
                  type="number"
                  variant="filled"
                  color="warning"
                  size="small"
                  style={{ width: "150px" }}
                  InputProps={{ inputProps: { min: 0, max: pontMax } }}
                />
                <div
                  className="div-movimentar-nota-maxima border-bottom border-secondary d-flex justify-content-between"
                  title="Esta é a nota máxima que pode ser atribuída nesta questão">
                  <h6 className="m-0 w-50 text-end align-self-center">max:</h6>
                  <h6 className="m-0 w-50 text-start ps-2 align-self-center">
                    {pontMax}
                  </h6>
                </div>
              </div>
            </div>
            <TextareaAutosize
              id="textarea-nota-questao-avaliativa"
              className="border rounded mt-4 p-3 w-100 tamanho-personalizado"
              aria-label="minimum height"
              minRows={2}
              placeholder="Digite aqui sua observação"
              value={campoSugestao}
              onChange={(e) => {
                setCampoSugestao(e.target.value);
              }}
              style={{ width: 200, height: 150, resize: "none" }}
            />
            <div className="d-flex justify-content-between mt-3">
              <Botao
                titulo="concluir"
                classes="btn btn-warning botao-menor-personalizado"
                id="btn-concluir-modal-avaliacao"
                onClick={() => adicionarAvaliacao()}
              />
              <Botao
                titulo="cancelar"
                classes="btn btn-secondary botao-menor-personalizado"
                id="btn-cancelar-modal-avaliacao"
                onClick={handleCloseModalAvaliar}
              />
            </div>
          </Box>
        </Modal>
        <Snackbar open={open} onClose={handleClose} autoHideDuration={5000}>
          <Alert
            onClose={handleClose}
            severity={severidade}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {mensagemSnackBar}
          </Alert>
        </Snackbar>
      </div>
    </div >
  );
}

export default CriacaoAvaliacao;
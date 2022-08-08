import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Modal,
  Typography,
  TextareaAutosize,
  Tabs,
  Tab,
  List,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";

import api from "./../../services/api";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import Botao from "../../components/Botao";
import { styleModals, TabPanel, valueProps } from "../../utils/constantes";
import {
  MSG000,
  MSG005,
  MSG006,
  MSG062,
  MSG063,
  MSG064,
  MSG065,
  MSG067,
  MSG068
} from "./../../utils/mensagens";

import "./styles.css";

function FeedbacksPitch(props) {

  const [value, setValue] = React.useState(0);
  const [listaPotencialidade, setListaPotencialidade] = useState([]);
  const [listaFragilidade, setListaFragilidade] = useState([]);
  const [opcaoTipoFeedback, setOpcaoTipoFeedback] = useState("POTENCIALIDADE");
  const [feedback, setCampoFeedback] = useState(MSG000);
  const [open, setOpen] = useState(false);
  const [severidade, setSeveridade] = useState(MSG006);
  const [mensagemSnackBar, setMensagemSnackBar] = useState(MSG000);
  const [flagAlteracao, setFlagAlteracao] = useState(false);
  const [arquivoPitch, setArquivoPitch] = useState(null);
  const [nomeEquipe, setNomeEquipe] = useState(MSG000);
  const [tipoSelecionado, setTipoSelecionado] = useState("POTENCIALIDADE");

  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const { idEquipe, papelUsuario, idPitch } = useParams();

  const [openModalAlertaEnvioFeedbacks, setOpenModalAlertaEnvioFeedbacks] =
    React.useState(false);
  const handleOpenModalAlertaEnvioFeedbacks = () => {
    if (listaPotencialidade.length === 0 && listaFragilidade.length === 0) {
      handleAlerta(MSG065, MSG006);
      return;
    }
    setOpenModalAlertaEnvioFeedbacks(true);
  };
  const handleCloseModalAlertaEnvioFeedbacks = () =>
    setOpenModalAlertaEnvioFeedbacks(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlerta = (mensagem, severidade) => {
    setMensagemSnackBar(mensagem);
    setSeveridade(severidade);
    setOpen(true);
  };

  const handleRadioButtonsTipoFeedback = (event) => {
    setOpcaoTipoFeedback(event.target.value);
  };

  const mudarBotao = (tipo) => {
    if (tipo === "FRAGILIDADE") {
      setValue(1);
    } else {
      setValue(0);
    }
  }

  const baixarArquivo = () => {
    let descricaoType = "video/mp4;base64";

    if (arquivoPitch.tipoArquivo === "ARQUIVO") {
      descricaoType = "application/pdf;base64";
    }

    var byteCharacters = window.atob(arquivoPitch.arquivo);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: descricaoType });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  const adicionarFeedback = async () => {

    if (feedback.length < 5) {
      handleAlerta(MSG062, MSG006);
    } else {

      const feedbackFormatado = {
        tipoFeedback: opcaoTipoFeedback.toUpperCase(),
        sugestao: feedback,
        tipoArtefato: "PITCH_DECK",
        idArtefato: Number(idPitch),
      };

      api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
      api
        .post(`/criar-feedback/${idEquipe}`, feedbackFormatado)
        .then((response) => {
          setCampoFeedback("");
          handleAlerta(MSG063, MSG005);
          setFlagAlteracao(!flagAlteracao);
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      setTimeout(() => {
        mudarBotao(opcaoTipoFeedback);
      }, 1000);
    }

  }

  const removerFeedback = (idFeedback) => {
    api.defaults.headers.delete["Authorization"] = `Bearer ${token}`;
    api
      .delete(`/deletar-feedback-avaliativo/${idFeedback}`)
      .then((response) => {
        handleAlerta(MSG064, MSG005);
        setFlagAlteracao(!flagAlteracao);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  const enviarFeedbacksParaAEquipe = () => {
    console.log("CLICOU EM ENVIAR");
    api.defaults.headers.put["Authorization"] = `Bearer ${token}`;
    api
      .put("/atualizar-etapa-artefato-pitch",
        {
          idArtefato: idPitch,
          tipoArtefato: "PITCH_DECK",
          novaEtapa: "AVALIADO_CONSULTOR"
        }
      )
      .then((response) => {
        handleAlerta(MSG068, MSG005);
        handleCloseModalAlertaEnvioFeedbacks();

        setTimeout(() => {
          navigate("/listagem-consultoria");
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    handleCloseModalAlertaEnvioFeedbacks(); //apagar essa linha depois
  }

  const Lista = (props) => {

    let lista = [];

    if (props.opcao === "FRAGILIDADE") {
      lista = listaFragilidade;
      setTipoSelecionado("FRAGILIDADE");
    } else {
      lista = listaPotencialidade
      setTipoSelecionado("POTENCIALIDADE");
    }

    if (lista.length === 0) {
      return (
        <h6 className="text-center">
          Este pitch ainda não possui feedbacks de{" "}
          {props.opcao === "POTENCIALIDADE"
            ? "potencialidades"
            : "fragilidades"}
          .
        </h6>
      );
    } else {

      return (
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 350,
            "& ul": { padding: 0 },
          }}
        >
          {lista?.map((feedback, index) => (
            <div
              key={index}
              style={{
                maxHeight: "150px",
                overflowY: "auto",
                position: "relative",
                borderRadius: ".25rem .70rem .25rem .25rem",
              }}
              className="borda-laranja rounded p-3 m-3"
            >
              <h6 style={{ wordBreak: "break-all", margin: 0 }}>
                {feedback.sugestao}
              </h6>
              <i
                id="icone-x-remover"
                title="Remover feedback"
                className="fa-solid fa-circle-xmark cursor-pointer icone-x-remover-feedback-pitch"
                onClick={() => removerFeedback(feedback.idFeedback)}
              ></i>
            </div>
          ))
          }
        </List >
      );
    }

  }

  useEffect(() => {
    let listaPotencialidades = [];
    let listaFragilidades = [];

    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(
        `/pitch-deck/${idPitch}/feedbacks-pitch-consultoria`
      )
      .then((response) => {
        console.log(response.data)
        setArquivoPitch(
          {
            arquivo: response.data.arquivoPitchDeck,
            tipoArquivo: response.data.tipo,
            nome: response.data.nome
          }
        );
        response.data.feedbacksAvaliativos.map((feedback) => {
          feedback.tipoFeedback === "POTENCIALIDADE"
            ? listaPotencialidades.push(feedback)
            : listaFragilidades.push(feedback);
        });

        setListaPotencialidade(listaPotencialidades);
        setListaFragilidade(listaFragilidades);

      })
      .catch((error) => {
        console.log(error.response.data);
      });

    api
      .get(`/equipe/dados/${idEquipe}`)
      .then((response) => {
        setNomeEquipe(response.data.nomeEquipe);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [token, flagAlteracao, idEquipe]);

  return (
    <div id="pagina-feedback-pitch">
      <DefaultHeader
        iconeDestaque="consultor"
        isLoginViaToken={papelUsuario === "USUARIO_TOKEN"}
      />
      <div className="margem-pagina-feedback-pitch">
        <div className="d-flex justify-content-between">
          <h5 className="titulos-principais m-0">Feedback Picth da equipe {nomeEquipe}</h5>
          <div>
            <Botao
              titulo="enviar"
              classes="btn btn-warning botao-menor-personalizado me-2"
              id="btn-enviar-feedbacks-pitch"
              onClick={handleOpenModalAlertaEnvioFeedbacks}
            />
            <Botao
              titulo="voltar"
              classes="btn btn-secondary botao-menor-personalizado"
              id="btn-voltar-feedback-pitch"
              onClick={() => {
                navigate("/listagem-consultoria");
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between mt-5">
          <div className="w-50 pe-2">
            <div className="d-flex justify-content-between mt-1">
              <div className="align-self-center">
                <h5 className="m-0">Feedback</h5>
              </div>
              <FormControl>
                <RadioGroup row value={opcaoTipoFeedback} onChange={handleRadioButtonsTipoFeedback}>
                  <FormControlLabel value="POTENCIALIDADE" control={
                    <Radio
                      sx={{
                        color: "#999",
                        "&.Mui-checked": {
                          color: "#FC7A00",
                        },
                      }}
                    />
                  } label="Potencialidade" />
                  <FormControlLabel value="FRAGILIDADE" control={
                    <Radio
                      sx={{
                        color: "#999",
                        "&.Mui-checked": {
                          color: "#FC7A00",
                        },
                      }}
                    />
                  } label="Fragilidade" className="me-0" />
                </RadioGroup>
              </FormControl>
            </div>
            <TextareaAutosize
              id="textarea-criar-comentario-feedback-pitch"
              className="border rounded p-3 w-100"
              value={feedback}
              onChange={(event) => {
                setCampoFeedback(event.target.value);
              }}
              aria-label="minimum height"
              minRows={2}
              placeholder="Digite aqui seu feedback"
              style={{ width: 200, height: 250, resize: "none" }}
            />
            <Botao
              titulo="adicionar"
              classes="btn btn-warning botao-menor-personalizado me-2"
              id="btn-adicionar-feedback-pitch"
              onClick={() => adicionarFeedback()}
            />
            <div className=" d-flex justify-content-between mt-4 card-feedback-pitch rounded">
              <div className="d-flex justify-content-start">
                {arquivoPitch?.tipoArquivo === "ARQUIVO" ?
                  (<i className="fa fa-file-powerpoint-o fa-2x cor-branca align-self-center"></i>) :
                  (<i class="fa fa-youtube-play fa-2x cor-branca align-self-center"></i>)}
                <h6 className="m-0 cor-branca align-self-center text-break ms-2">{arquivoPitch?.nome}</h6>
              </div>
              <i
                className="fa-solid fa-download cursor-pointer cor-branca align-self-center"
                onClick={() => baixarArquivo()}
              ></i>
            </div>
          </div>
          <div className="w-50 ps-2">
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
                  label={`Potencialidade`}
                  {...valueProps(0)}
                />
                <Tab
                  label={`Fragilidade`}
                  {...valueProps(1)}
                />
              </Tabs>
            </Box>
            <TabPanel color="warning" value={value} index={0}>
              <Lista opcao="POTENCIALIDADE" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Lista opcao="FRAGILIDADE" />
            </TabPanel>
          </div>
        </div>
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
        <Modal
          open={openModalAlertaEnvioFeedbacks}
          onClose={handleCloseModalAlertaEnvioFeedbacks}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModals}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              {MSG067}
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Botao
                titulo="enviar"
                classes="btn btn-warning botao-menor-personalizado"
                onClick={enviarFeedbacksParaAEquipe}
              />
              <Botao
                titulo="cancelar"
                classes="btn btn-secondary botao-menor-personalizado"
                onClick={handleCloseModalAlertaEnvioFeedbacks}
              />
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default FeedbacksPitch;
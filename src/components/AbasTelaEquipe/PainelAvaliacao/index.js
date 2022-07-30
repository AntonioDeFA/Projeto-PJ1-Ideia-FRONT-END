import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  Modal,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { MSG000, MSG005, MSG006, MSG057 } from "../../../utils/mensagens";
import Botao from "../../Botao/index";
import api from "../../../services/api";
import StoreContext from "../../../store/context";
import { styleModals } from "../../../utils/constantes";

import "./styles.css";

function PainelAvaliacao(props) {
  const { token } = useContext(StoreContext);

  const [notasEquipe, setNotaEquipe] = useState([]);

  const [pitch, setPitch] = useState(null);
  const [open, setOpen] = useState(false);
  const [severidade, setSeveridade] = useState(MSG000);
  const [mensagemSnackBar, setMensagemSnackBar] = useState(MSG000);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlerta = (mensagem, severidade) => {
    setMensagemSnackBar(mensagem);
    setSeveridade(severidade);
    setOpen(true);
  };

  const baixarPitchDeApresentacao = () => {
    let tipoArquivo = "video/mp4;base64";

    if (pitch.tipo === "ARQUIVO") {
      tipoArquivo = "application/pdf;base64";
    }

    var byteCharacters = window.atob(pitch.arquivoPitchDeck);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: tipoArquivo });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  const enviarParaAvaliacao = () => {
    handleCloseModal();
    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api
      .post(`/pitch/${props.idEquipe}/enviar-para-avaliacao`)
      .then((response) => {
        handleAlerta(MSG057, MSG005);
      })
      .catch((error) => {
        handleAlerta(error.response.data.motivosErros[0], MSG006);
      });
  };

  const AcordionQuestao = (props) => {
    const { nomeAcordion, notaAtribuida, notaMaxima, questoes } = props;

    return (
      <div id="id-acordion-questao">
        <Accordion
          sx={{ border: "1px solid #ffc107" }}
          className="sombra-acordion"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <div className="d-flex justify-content-between w-100 pe-3">
              <div className="align-self-center m-0">{nomeAcordion}</div>
              <div className="align-self-center m-0">
                NOTA: <strong>{notaAtribuida}</strong> /{notaMaxima}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} className="me-2 sombra-acordion">
              <Table
                sx={{ minWidth: 170 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className="border">Avaliador</TableCell>
                    <TableCell className="border">Questão</TableCell>
                    <TableCell className="border">Comentário</TableCell>
                    <TableCell className="border">Nota</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questoes?.map((questao, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="border text-break"
                      >
                        <div>{questao.avaliador}</div>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className="border text-break"
                      >
                        <div>{questao.questao}</div>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className="border text-break"
                      >
                        <div>{questao.comentario}</div>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className="border text-break"
                      >
                        <div>
                          <strong>{questao.nota}</strong>/{questao.notaMax}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/arquivo-pitch-deck/${props.idEquipe}`)
      .then((response) => {
        setPitch(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/notas-questoes-avaliativas/${props.idEquipe}`)
      .then((response) => {
        setNotaEquipe(response.data);
      })
      .catch((error) => {
        handleAlerta(error.response.data.message, MSG006);
      });
  }, []);

  return (
    <div id="painel-avaliacao">
      <div className="d-flex justify-content-between w-100 mt-2">
        <div
          style={
            props.papelUsuario === "USUARIO_TOKEN"
              ? { width: "175%" }
              : { width: "150%" }
          }
        >
          <h5 style={{ marginBottom: 0 }}>
            Olá competidor, recomenda-se dar uma olhada em seus artefatos antes
            da submissão.
          </h5>
        </div>

        <div className="d-flex justify-content-end w-100">
          <Botao
            titulo="pitch de apresentação"
            classes={
              props.papelUsuario === "USUARIO_TOKEN"
                ? "btn btn-warning botao-menor-personalizado"
                : "btn btn-warning botao-menor-personalizado me-3"
            }
            onClick={() => baixarPitchDeApresentacao()}
          />
          {props.papelUsuario === "USUARIO_TOKEN" ? null : (
            <Botao
              titulo="enviar para avaliação"
              classes="btn btn-warning botao-menor-personalizado"
              onClick={() => handleOpenModal()}
            />
          )}
        </div>
      </div>

      {notasEquipe.length !== 0 ? (
        <div>
          <h5 className="mt-5 mb-4">Notas por grupos de questões</h5>

          <div className="mb-2">
            <AcordionQuestao
              nomeAcordion={"ADAPTABILIDADE"}
              notaAtribuida={notasEquipe?.notaAtribuidaAdaptabilidade}
              notaMaxima={notasEquipe?.notaMaximaAdaptabilidade}
              questoes={notasEquipe?.listaAdaptabilidade}
            />
          </div>
          <div className="mb-2">
            <AcordionQuestao
              nomeAcordion={"INOVAÇÃO"}
              notaAtribuida={notasEquipe?.notaAtribuidaInovacao}
              notaMaxima={notasEquipe?.notaMaximaInovacao}
              questoes={notasEquipe?.listaInovacao}
            />
          </div>
          <div className="mb-2">
            <AcordionQuestao
              nomeAcordion={"UTILIDADE"}
              notaAtribuida={notasEquipe?.notaAtribuidaUtilidade}
              notaMaxima={notasEquipe?.notaMaximaUtilidade}
              questoes={notasEquipe?.listaUtilidade}
            />
          </div>
          <div>
            <AcordionQuestao
              nomeAcordion={"SUSTENTABILIDADE"}
              notaAtribuida={notasEquipe?.notaAtribuidaSustentabilidade}
              notaMaxima={notasEquipe?.notaMaximaSustentabilidade}
              questoes={notasEquipe?.listaSustentabilidade}
            />
          </div>
        </div>
      ) : (
        <h5 className="mt-5 mb-4">
          Depois da avaliação, as notas serão apresentadas aqui.
        </h5>
      )}

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
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModals} style={{ width: 600 }}>
          <h5 className="">
            Esse processo não pode ser desfeito. Você tem certeza que deseja
            submeter para avaliação?
          </h5>
          <h5 className="mb-2">
            Verifique seu Lean Canvas e Pitch deck, e lembre-se de ler o
            regulamento da competição.
          </h5>

          <div className="botoes-cadastro mt-5">
            <Botao
              titulo="enviar"
              id="btn-salvar-questao-avaliativa"
              classes="btn btn-warning botao-menor-personalizado"
              onClick={() => enviarParaAvaliacao()}
            />

            <Botao
              titulo="cancelar"
              classes="btn btn-secondary botao-menor-personalizado"
              onClick={handleCloseModal}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PainelAvaliacao;

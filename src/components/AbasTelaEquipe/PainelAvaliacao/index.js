import React from "react";
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
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Botao from "../../Botao/index";
import { styleModals } from "../../../utils/constantes";

import "./styles.css";

function PainelAvaliacao(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const baixarVideoDeApresentacao = () => {
    console.log("baixando vídeo");
  };

  const enviarParaAvaliacao = () => {
    handleCloseModal();
    console.log("enviando para avaliação");
  };

  const AcordionQuestao = (props) => {
    const { nomeAcordion, notaAtribuida, notaMaxima, questoes } = props;

    let lista = [
      {
        avaliador: "avaliador 1",
        questao: "Questão 1",
        comentario: "Comentário 1",
        nota: 10,
      },
      {
        avaliador: "avaliador 2",
        questao: "Questão 1",
        comentario: "Comentário 1",
        nota: 10,
      },
      {
        avaliador: "avaliador 3",
        questao: "Questão 3",
        comentario: "Comentário 3",
        nota: 10,
      },
      {
        avaliador: "avaliador 4",
        questao: "Questão 4",
        comentario: "Comentário 4",
        nota: 10,
      },
      {
        avaliador: "avaliador 5",
        questao: "Questão 5",
        comentario: "Comentário 5",
        nota: 10,
      },
      {
        avaliador: "avaliador 5",
        questao: "Questão 5",
        comentario: "Comentário 5",
        nota: 10,
      },
      {
        avaliador: "avaliador 5",
        questao: "Questão 5",
        comentario: "Comentário 5",
        nota: 10,
      },
      {
        avaliador: "avaliador 5",
        questao: "Questão 5",
        comentario: "Comentário 5",
        nota: 10,
      },
    ];

    return (
      <div id="id-acordion-questao">
        <Accordion sx={{ border: "1px solid #ffc107" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <div className="d-flex justify-content-between w-100 pe-3">
              <div className="align-self-center m-0">{nomeAcordion}</div>
              <div className="align-self-center m-0">
                NOTA: {notaAtribuida}/{notaMaxima}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} className="me-2">
              <Table
                sx={{ minWidth: 170 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Avaliador</TableCell>
                    <TableCell>Questão</TableCell>
                    <TableCell>Comentário</TableCell>
                    <TableCell>Nota</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lista.map((question, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div>{question.avaliador}</div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div>{question.questao}</div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div>{question.comentario}</div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div>{question.nota}</div>
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

  return (
    <div id="painel-avaliacao">
      <div className="d-flex justify-content-between w-100 mt-2">
        <div style={{ width: "150%" }}>
          <h5 style={{ marginBottom: 0 }}>
            Olá competidor, recomenda-se dar uma olhada em seus artefatos antes
            da submissão.
          </h5>
        </div>

        <div className="d-flex justify-content-end w-100">
          <Botao
            titulo="vídeo de apresentação"
            classes="btn btn-warning botao-menor-personalizado me-3"
            onClick={() => baixarVideoDeApresentacao()}
          />
          <Botao
            titulo="enviar para avaliação"
            classes="btn btn-warning botao-menor-personalizado"
            onClick={() => handleOpenModal()}
          />
        </div>
      </div>

      <h5 className="mt-5 mb-4">Notas por grupos de questões</h5>

      <div className="mb-2">
        <AcordionQuestao
          nomeAcordion={"ADAPTABILIDADE"}
          notaAtribuida={25}
          notaMaxima={50}
        />
      </div>
      <div className="mb-2">
        <AcordionQuestao
          nomeAcordion={"INOVAÇÃO"}
          notaAtribuida={25}
          notaMaxima={70}
        />
      </div>
      <div className="mb-2">
        <AcordionQuestao
          nomeAcordion={"UTILIDADE"}
          notaAtribuida={25}
          notaMaxima={25}
        />
      </div>
      <div>
        <AcordionQuestao
          nomeAcordion={"SUSTENTABILIDADE"}
          notaAtribuida={50}
          notaMaxima={50}
        />
      </div>

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

          <div className="d-flex justify-content-start w-100 mt-4 mb-3">
            <Botao
              titulo="ver pitch deck"
              classes="btn btn-warning botao-menor-personalizado me-3"
              onClick={null}
            />

            <Botao
              titulo="ver canvas"
              classes="btn btn-warning botao-menor-personalizado me-3"
              onClick={null}
            />
          </div>

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

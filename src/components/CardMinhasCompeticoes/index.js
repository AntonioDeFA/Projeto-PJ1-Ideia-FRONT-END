import React, { useContext } from "react";

import "../../assets/styles/global.css";
import "./styles.css";
import { Box, Modal, Typography } from "@mui/material";
import { styleModals } from "../../utils/constantes";
import Botao from "../Botao";
import StoreContext from "../../store/context";
import api from "../../services/api";
import { handleDatas } from "../../services/utils";

function CardMinhasCompeticoes(props) {
  const { token } = useContext(StoreContext);

  const [openModalDeletarCompeticao, setOpenModalDeletarCompeticao] =
    React.useState(false);
  const handleOpenModalDeletarCompeticao = () =>
    setOpenModalDeletarCompeticao(true);
  const handleCloseModalDeletarCompeticao = () =>
    setOpenModalDeletarCompeticao(false);

  const handlePapelUsuario = () => {
    let element = null;
    let papelUsuario = props.card?.papelUsuario;

    if (papelUsuario === "ORGANIZADOR") {
      element = (
        <div className="justify-content-center text-center border border-success mb-5">
          <h6 className="text-success m-0">ORGANIZADOR</h6>
        </div>
      );
    } else if (papelUsuario === "COMPETIDOR") {
      element = (
        <div className="justify-content-center text-center border border-danger mb-5">
          <h6 className="text-danger m-0">COMPETIDOR</h6>
        </div>
      );
    } else if (papelUsuario === "CONSULTOR") {
      element = (
        <div className="justify-content-center text-center border border-primary mb-5">
          <h6 className="text-primary m-0">CONSULTOR</h6>
        </div>
      );
    } else if (papelUsuario === "AVALIADOR") {
      element = (
        <div className="justify-content-center text-center border border-warning mb-5">
          <h6 className="text-warning m-0">AVALIADOR</h6>
        </div>
      );
    }

    return element;
  };

  const handleEtapaCompeticao = () => {
    let element = null;
    let tipoEtapa = props.card?.etapaVigente?.tipoEtapa;

    switch (tipoEtapa) {
      case "INSCRICAO":
        element = <h6 className="text-success fw-bold m-0">INSCRIÇÃO</h6>;
        break;
      case "AQUECIMENTO":
        element = <h6 className="text-danger fw-bold m-0">AQUECIMENTO</h6>;
        break;
      case "IMERSAO":
        element = <h6 className="text-primary fw-bold m-0">IMERSAO</h6>;
        break;
      case "PITCH":
        element = <h6 className="text-warning fw-bold m-0">PITCH</h6>;
        break;
      case "ENCERRADA":
        element = <h6 className="text-secondary fw-bold m-0">ENCERRADA</h6>;
        break;
      default:
        element = <h6 className="fw-bold m-0">Etapa não especificada</h6>;
        break;
    }

    return element;
  };

  const handleMensagemDeletarCompeticao = () => {
    let papelUsuario = props.card.papelUsuario;
    let mensagem = "";

    if (papelUsuario === "ORGANIZADOR") {
      mensagem = " Tem certeza que deseja deletar esta competição?";
    } else if (papelUsuario === "COMPETIDOR") {
      mensagem =
        " Tem certeza que deseja cancelar a inscrição da sua equipe nesta competição?";
    } else {
      mensagem = " Tem certeza que deseja se desligar desta competição?";
    }

    return mensagem;
  };

  const handleDeletarCompeticao = () => {
    api.defaults.headers.delete["Authorization"] = `Bearer ${token}`;
    api
      .delete(`/competicao/delete/${props.card.id}`)
      .then((response) => {
        props.atualizarCards();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    handleCloseModalDeletarCompeticao();
  };

  return (
    <div
      id="component-cardCompeticao"
      className="me-5 margem-personalizada-card"
    >
      <div className="card border border-warning tamanho-card-personalizado">
        <div className="card-header bg-warning">
          <h5 className="card-title fw-bold">{props.card.nomeCompeticao}</h5>
          <div
            className={
              props.card.nomeCompeticao.length < 20
                ? "datas-etapa-bottom"
                : null
            }
          >
            <h6 className="card-subtitle">
              {handleDatas(
                props.card?.etapaVigente?.dataInicio,
                props.card?.etapaVigente?.dataTermino
              )}
            </h6>
          </div>
        </div>

        <div className="card-body">
          {handlePapelUsuario()}

          <div className="navbar p-0 etapa-atual">
            {handleEtapaCompeticao()}

            <div id="icons">
              {props.card.papelUsuario === "ORGANIZADOR" ? (
                <i className="fa-solid fa-pen-to-square hover-azul"></i>
              ) : null}

              <i
                onClick={null}
                className="fa-solid fa-arrow-right-to-bracket hover-azul"
              ></i>
              <i
                onClick={handleOpenModalDeletarCompeticao}
                className="fa-solid fa-trash-can"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={openModalDeletarCompeticao}
        onClose={handleCloseModalDeletarCompeticao}
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
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ color: "red" }}
            ></i>
            {handleMensagemDeletarCompeticao()}
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ color: "red" }}
            ></i>
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Botao
              titulo="confirmar"
              id="btn-confirmar-deletar"
              classes="btn btn-warning botao-menor-personalizado"
              onClick={handleDeletarCompeticao}
            />
            <Botao
              titulo="cancelar"
              classes="btn btn-secondary botao-menor-personalizado"
              onClick={handleCloseModalDeletarCompeticao}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CardMinhasCompeticoes;

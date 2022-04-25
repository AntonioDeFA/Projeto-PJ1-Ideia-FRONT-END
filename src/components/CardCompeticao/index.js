import React, { useContext, useEffect, useState } from "react";

import api from "../../services/api";
import Botao from "../Botao";
import StoreContext from "../../store/context";

import "./styles.css";
import "../../assets/styles/global.css";
import { Box, Modal, Typography } from "@mui/material";
import { styleModals } from "../../utils/constantes";
import { useNavigate } from "react-router-dom";

function CardCompeticao(props) {
  let dataInicio = props.card.etapaVigente.dataInicio;
  let dataTermino = props.card.etapaVigente.dataTermino;

  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const { token } = useContext(StoreContext);

  const navigate = useNavigate();

  const [openModalAlertaDominio, setOpenModalAlertaDominio] =
    React.useState(false);
  const handleOpenModalAlertaDominio = () => setOpenModalAlertaDominio(true);
  const handleCloseModalAlertaDominio = () => setOpenModalAlertaDominio(false);

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get("/usuario-logado").then((response) => {
      const { data } = response;
      setUsuarioLogado(data);
    });
  }, [token]);

  const handleEquipesInscritas = () => {
    let totalEquipesInscritas = props.card.quantidadeDeEquipes;
    if (totalEquipesInscritas === 0) {
      return "Não há equipes inscritas";
    } else if (totalEquipesInscritas === 1) {
      return "1 equipe inscrita";
    } else {
      return `${totalEquipesInscritas} equipes inscritas`;
    }
  };

  const cadastrarEquipe = () => {
    const dominioCompeticao = props.card.dominioCompeticao;
    if (dominioCompeticao !== "") {
      if (dominioCompeticao !== usuarioLogado.email.split("@")[1]) {
        handleOpenModalAlertaDominio();
      } else {
        navigate(`/cadastro-equipe/${props.card.id}`);
      }
    } else {
      navigate(`/cadastro-equipe/${props.card.id}`);
    }
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
              props.card.nomeCompeticao.length <= 15
                ? "datas-etapa-bottom"
                : null
            }
          >
            <h6 className="card-subtitle">
              {dataInicio[2]}/{dataInicio[1]}/{dataInicio[0]} - {dataTermino[2]}
              /{dataTermino[1]}/{dataTermino[0]}
            </h6>
          </div>
        </div>
        <div className="card-body">
          <div className="text-center">
            {props.card.dominioCompeticao ? (
              <p>
                Para quem possui o domínio <br /> {props.card.dominioCompeticao}
              </p>
            ) : (
              <p>Não há domínio especificado</p>
            )}

            <p>{handleEquipesInscritas()}</p>
          </div>
          <div
            className={
              props.card.dominioCompeticao ? "text-end" : "text-end pt-4"
            }
          >
            <Botao
              titulo="inscrever"
              classes="btn btn-warning botao-menor-personalizado"
              onClick={cadastrarEquipe}
            />
          </div>
        </div>
      </div>

      <Modal
        open={openModalAlertaDominio}
        onClose={handleCloseModalAlertaDominio}
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
            ></i>{" "}
            Seu e-mail não possui o domínio correto para esta competição. Por
            favor, escolha outra competição para se inscrever.{" "}
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ color: "red" }}
            ></i>
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Botao
              titulo="OK"
              classes="btn btn-warning botao-menor-personalizado"
              onClick={handleCloseModalAlertaDominio}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CardCompeticao;

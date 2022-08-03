import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Alert, Box, Modal, Snackbar, Typography } from "@mui/material";

import api from "./../../services/api";
import Botao from "../../components/Botao";
import LeanCanvas from "../../components/LeanCanvas";
import {
  MSG000,
  MSG005,
  MSG006,
  MSG065,
  MSG066,
  MSG067,
} from "./../../utils/mensagens";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import { styleModals } from "../../utils/constantes";
import AsideCriacaoFeedbacksLeanCanvas from "../../components/AsideCriacaoFeedbacksLeanCanvas";

import "./styles.css";

function CriacaoFeedbacksLeanCanvas() {
  const navigate = useNavigate();
  const { idEquipe, papelUsuario, idLeanCanvas } = useParams();

  const { token } = useContext(StoreContext);

  const [leanCanvas, setLeanCanvas] = useState({
    problema: "",
    solucao: "",
    metricasChave: "",
    propostaValor: "",
    vantagemCompetitiva: "",
    canais: "",
    segmentosDeClientes: "",
    estruturaDeCusto: "",
    fontesDeReceita: "",
  });

  const [openModalAlertaEnvioFeedbacks, setOpenModalAlertaEnvioFeedbacks] =
    React.useState(false);
  const handleOpenModalAlertaEnvioFeedbacks = () => {
    if (qntdFeedbacks === 0) {
      handleAlerta(MSG065, MSG006);
      return;
    }
    setOpenModalAlertaEnvioFeedbacks(true);
  };
  const handleCloseModalAlertaEnvioFeedbacks = () =>
    setOpenModalAlertaEnvioFeedbacks(false);

  const [nomeEquipe, setNomeEquipe] = useState(MSG000);

  const [mudou, setMudou] = useState(true);

  const [qntdFeedbacks, setQntdFeedbacks] = useState(0);

  const [open, setOpen] = useState(false);
  const [severidade, setSeveridade] = useState(MSG000);
  const [mensagemSnackBar, setMensagemSnackBar] = useState(MSG000);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlerta = (mensagem, severidade) => {
    setMensagemSnackBar(mensagem);
    setSeveridade(severidade);
    setOpen(true);
  };

  const atualizarQntdFeedbacks = (novaQntdFeedbacks) => {
    setQntdFeedbacks(novaQntdFeedbacks);
  };

  const enviarFeedbacksParaAEquipe = () => {
    let leanCanvasNovaEtapa = {
      idArtefato: idLeanCanvas,
      tipoArtefato: "LEAN_CANVAS",
      novaEtapa: "AVALIADO_CONSULTOR",
    };

    api.defaults.headers.put["Authorization"] = `Bearer ${token}`;
    api
      .put("/atualizar-etapa-artefato-pitch", leanCanvasNovaEtapa)
      .then((response) => {
        handleAlerta(MSG066, MSG005);
        handleCloseModalAlertaEnvioFeedbacks();

        setTimeout(() => {
          navigate("/listagem-consultoria");
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/equipe/dados/${idEquipe}`)
      .then((response) => {
        setNomeEquipe(response.data.nomeEquipe);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [idEquipe, token]);

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/lean-canvas/${idLeanCanvas}/EM_CONSULTORIA/feedbacks-consultoria`)
      .then((response) => {
        const { data } = response;

        setLeanCanvas({
          problema: data.problema,
          solucao: data.solucao,
          metricasChave: data.metricasChave,
          propostaValor: data.propostaDeValor,
          vantagemCompetitiva: data.vantagemCompetitiva,
          canais: data.canais,
          segmentosDeClientes: data.segmentosClientes,
          estruturaDeCusto: data.estruturaDeCustos,
          fontesDeReceita: data.fonteDeReceita,
        });

        console.log(data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    setTimeout(() => {
      setMudou(false);
      setMudou(true);
    }, 400);
  }, [token]);

  return (
    <div id="pagina-feedbacks-lean-canvas">
      <DefaultHeader
        iconeDestaque="consultor"
        isLoginViaToken={papelUsuario === "USUARIO_TOKEN"}
      />

      <div id="aside-feedbacks-lean-canvas-componente">
        <AsideCriacaoFeedbacksLeanCanvas
          idEquipe={idEquipe}
          idLeanCanvas={idLeanCanvas}
          atualizarQntdFeedbacks={atualizarQntdFeedbacks}
        />
      </div>

      <div id="dados-lean-canvas-para-leitura">
        <div className="ps-0 pe-4 pt-3 d-flex justify-content-between">
          <div>
            <div>
              <h1 className="ps-3 ms-1 titulos-principais">
                Lean Canvas - Equipe {nomeEquipe}
              </h1>
            </div>
          </div>
          <div>
            <Botao
              titulo="enviar"
              classes="btn me-2 btn-warning botao-menor-personalizado"
              onClick={handleOpenModalAlertaEnvioFeedbacks}
            />
            <Botao
              titulo="voltar"
              classes="btn me-4 btn-secondary botao-menor-personalizado"
              onClick={() => {
                navigate("/listagem-consultoria");
              }}
            />
          </div>
        </div>

        <div className="p-3 d-flex justify-content-center">
          <Box sx={{ width: "1040px" }} className="ps-2 pe-3">
            <div className="mt-3">
              {mudou ? (
                <LeanCanvas leanCanvas={leanCanvas} isTelaFeedbacks={true} />
              ) : null}
            </div>
          </Box>
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
  );
}

export default CriacaoFeedbacksLeanCanvas;

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Snackbar, Alert } from "@mui/material";

import api from "../../../services/api";
import Botao from "../../Botao/index";
import Mensagem from "../../Mensagem";
import LeanCanvas from "../../LeanCanvas/index";
import StoreContext from "../../../store/context";
import { MSG000, MSG001, MSG006, MSG054 } from "../../../utils/mensagens";

import "./styles.css";

function PainelLeanCanvas(props) {
  const navigate = useNavigate();

  const [leanCanvas, setLeanCanvas] = useState({
    id: 0,
    problema: "",
    solucao: "",
    metricasChave: "",
    propostaValor: "",
    vantagemCompetitiva: "",
    canais: "",
    segmentosDeClientes: "",
    estruturaDeCusto: "",
    fontesDeReceita: "",
    etapaSolucaoCanvas: null,
  });

  const [mensagemErro, setMensagemErro] = useState(MSG000);
  const [mudou, setMudou] = useState(true);

  const { token } = useContext(StoreContext);

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

  const handleLeanCanvas = (leanCanvas) => {
    setLeanCanvas(leanCanvas);
  };

  const buscarLeanCanvas = async () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/equipe/${props.idEquipe}/lean-canvas/elaboracao`)
      .then((response) => {
        console.log("Lean canvas retornado");
        console.log(response.data);
        setLeanCanvas(response.data);
      })
      .catch((error) => {
        criarLeanCanvas();
      });
    await setTimeout(() => {
      setMudou(false);
      setMudou(true);
    }, 400);
  };

  const salvar = () => {
    console.log("Lean canvas do painel");
    console.log(leanCanvas);
    console.log(props.idEquipe);

    if (
      leanCanvas.problema?.length > 0 &&
      leanCanvas.solucao?.length > 0 &&
      leanCanvas.metricasChave?.length > 0 &&
      leanCanvas.propostaValor?.length > 0 &&
      leanCanvas.vantagemCompetitiva?.length > 0 &&
      leanCanvas.canais?.length > 0 &&
      leanCanvas.segmentosDeClientes?.length > 0 &&
      leanCanvas.estruturaDeCusto?.length > 0 &&
      leanCanvas.fontesDeReceita?.length > 0
    ) {
      api.defaults.headers.put["Authorization"] = `Bearer ${token}`;
      api
        .put(`/equipe/${props.idEquipe}/lean-canvas`, {
          id: leanCanvas.id,
          problema: leanCanvas.problema,
          solucao: leanCanvas.solucao,
          metricasChave: leanCanvas.metricasChave,
          propostaValor: leanCanvas.propostaValor,
          vantagemCompetitiva: leanCanvas.vantagemCompetitiva,
          canais: leanCanvas.canais,
          segmentosDeClientes: leanCanvas.segmentosDeClientes,
          estruturaDeCusto: leanCanvas.estruturaDeCusto,
          fontesDeReceita: leanCanvas.fontesDeReceita,
        })
        .then((response) => {
          buscarLeanCanvas();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      handleAlerta(MSG001, MSG054);
    }
  };

  const criarLeanCanvas = () => {
    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api
      .post(`/equipe/${props.idEquipe}/lean-canvas`)
      .then((response) => {
        buscarLeanCanvas();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const enviarParaConsultoria = async () => {
    api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    api
      .post(`/equipe/${props.idEquipe}/lean-canvas/enviar-consultoria`)
      .then((response) => {
        buscarLeanCanvas();
      })
      .catch((error) => {
        handleAlerta(error.response.data.message, MSG006);
      });
  };

  useEffect(() => {
    buscarLeanCanvas();
  }, []);

  return (
    <div id="painel-lean-canvas">
      <h5 className="mb-4">
        Olá competidor, aqui você poderá editar seu Lean Canvas para que ele
        possa ser avaliado.
      </h5>
      <div className="d-flex justify-content-end">
        <Botao
          titulo="versões"
          classes={
            props.papelUsuario === "USUARIO_TOKEN"
              ? "btn btn-warning botao-menor-personalizado"
              : "btn btn-warning botao-menor-personalizado me-3"
          }
          onClick={() => {
            navigate(
              `/equipe/${props?.idEquipe}/${props?.papelUsuario}/versoes-artefatos/LEAN_CANVAS`
            );
          }}
        />

        {props.papelUsuario === "USUARIO_TOKEN" ? null : (
          <Botao
            titulo="salvar"
            classes="btn btn-warning botao-menor-personalizado me-3"
            onClick={() => salvar()}
          />
        )}

        {props.papelUsuario === "USUARIO_TOKEN" ? null : (
          <Botao
            titulo="enviar para consultoria"
            classes="btn btn-warning botao-menor-personalizado"
            onClick={() => enviarParaConsultoria()}
          />
        )}
      </div>
      <div className="mt-4">
        <div style={{ width: "50%" }} className="mb-2">
          {mensagemErro !== MSG000 ? (
            <Mensagem mensagem={mensagemErro} tipoMensagem={"warning"} />
          ) : null}
        </div>
        {mudou ? (
          <LeanCanvas
            handleLeanCanvas={handleLeanCanvas}
            leanCanvas={leanCanvas}
          />
        ) : null}
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
    </div>
  );
}

export default PainelLeanCanvas;

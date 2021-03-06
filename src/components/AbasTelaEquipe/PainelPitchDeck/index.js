import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Snackbar, Alert } from "@mui/material";

import api from "../../../services/api";
import Botao from "../../Botao/index";
import StoreContext from "../../../store/context";
import {
  MSG000,
  MSG005,
  MSG006,
  MSG054,
  MSG058,
  MSG059,
} from "../../../utils/mensagens";

import "./styles.css";

function PainelPitchDeck(props) {
  const navigate = useNavigate();

  const [competicao, setCompeticao] = useState(null);
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

  const enviarParaConsultoria = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/pitch-deck/${props.idEquipe}/consultoria`)
      .then((response) => {
        handleAlerta(MSG058, MSG005);
      })
      .catch((error) => {
        console.log(error);
        handleAlerta(error.response.data.message, MSG006);
      });
  };

  const fazerUpload = async () => {
    let arquivoInput = document.getElementById("id-input-pitch-deck").files[0];

    if (arquivoInput) {
      let extensaoPdf = /(.pdf)$/i;
      let result = await toBase64(arquivoInput);
      result = result.replace("data:video/mp4;base64,", "");

      let nome = arquivoInput.name.split(".")[0];

      let tipo = "VIDEO";

      if (extensaoPdf.exec(arquivoInput.name)) {
        tipo = "ARQUIVO";
        result = result.replace("data:application/pdf;base64,", "");
      }

      await setTimeout(() => {
        api.defaults.headers.post["Authorization"] = `Bearer ${token}`;
        api
          .post(`/pitch-deck/${props.idEquipe}`, {
            arquivoPitchDeck: result,
            tipo,
            titulo: nome,
            descricao: nome,
          })
          .then((response) => {
            handleAlerta(MSG059, MSG005);
          })
          .catch((error) => {
            handleAlerta(error.response.data.message, MSG006);
          });
      }, 400);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/competicao/dados-gerais/${props.id}`)
      .then((response) => {
        setCompeticao(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div id="painel-pitch-deck">
      <h5 className="mb-4">
        Ol?? competidor, aqui voc?? poder?? carregar seu Pitch Deck para que ele
        possa ser avaliado!
      </h5>
      <h5 className="mb-4">
        Aqui voc?? envia um arquivo que te ajuda a demonstrar a sua ideias!
      </h5>
      <h5 className="mb-5">
        Lembre-se: caso envie um v??deo, ele deve estar no limite m??ximo do
        pitch, que ?? {competicao?.tempoMaximoVideoEmSeg / 60} minutos!
      </h5>
      <div className="d-flex justify-content-start mt-5">
        {props.papelUsuario === "USUARIO_TOKEN" ? (
          <h3>Verifique as vers??es do seu Pitch Deck</h3>
        ) : (
          <h3>Fa??a o upload do seu Pitch Deck</h3>
        )}
        <div className="ms-4">
          <label for="id-input-pitch-deck">
            <i className="fa fa-upload fa-2x cursor-pointer icone-upload"></i>
          </label>
          <input
            type="file"
            id="id-input-pitch-deck"
            accept="video/*,.pdf"
            onChange={(evento) => {
              fazerUpload();
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between espacamento-entre-botoes-pitch-deck mt-3">
        {props.papelUsuario === "USUARIO_TOKEN" ? null : (
          <Botao
            titulo="enviar para consultoria"
            classes="btn btn-warning botao-menor-personalizado botao-personalizado-pitch-deck"
            onClick={() => enviarParaConsultoria()}
          />
        )}
        <Botao
          titulo="vers??es"
          classes="btn btn-warning botao-menor-personalizado"
          onClick={() => {
            navigate(
              `/equipe/${props?.idEquipe}/${props?.papelUsuario}/versoes-artefatos/PITCH_DECK`
            );
          }}
        />
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

export default PainelPitchDeck;

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  Alert
} from "@mui/material";

import api from "../../../services/api";
import Botao from "../../Botao/index";
import StoreContext from "../../../store/context";
import { styleModals } from "../../../utils/constantes";
import {
  MSG000,
  MSG005,
  MSG006,
  MSG058,
  MSG059,
  MSG074
} from "../../../utils/mensagens";

import "./styles.css";

function PainelPitchDeck(props) {
  const navigate = useNavigate();

  const [competicao, setCompeticao] = useState(null);
  const { token } = useContext(StoreContext);

  const [open, setOpen] = useState(false);
  const [severidade, setSeveridade] = useState(MSG000);
  const [mensagemSnackBar, setMensagemSnackBar] = useState(MSG000);

  const [openModalAlerta, setOpenModalAlerta] =
    React.useState(false);
  const handleOpenModalAlerta = () =>
    setOpenModalAlerta(true);
  ;
  const handleCloseModalAlerta = () =>
    setOpenModalAlerta(false);

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
    handleCloseModalAlerta();
    if (arquivoInput) {
      let extensao = arquivoInput.name.split(".").pop();

      if (extensao !== "pdf" && extensao !== "mp4") {
        handleAlerta(MSG074, MSG006);
      } else {
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
      .catch((error) => { });
  }, []);

  return (
    <div id="painel-pitch-deck">
      <div className="d-flex justify-content-start mt-2">
        {props.papelUsuario === "USUARIO_TOKEN" ? (
          <h3>Verifique as versões do seu Pitch Deck</h3>
        ) : (
          <h3>Faça o upload do seu Pitch Deck</h3>
        )}
        <div className="ms-4">
          <i
            className="fa fa-upload fa-2x cursor-pointer icone-upload"
            onClick={handleOpenModalAlerta}
          ></i>
        </div>
      </div>
      <h5 className="mb-4 mt-2">
        Olá competidor, aqui você poderá carregar seu Pitch Deck para que ele
        possa ser avaliado. Aqui você envia um arquivo que te ajuda a demonstrar a sua ideias.
        Lembre-se, caso envie um vídeo, ele deve estar no limite máximo do
        pitch, que é <strong>{competicao?.tempoMaximoVideoEmSeg / 60}</strong> minutos.
      </h5>
      <div className="d-flex justify-content-between espacamento-entre-botoes-pitch-deck mt-3">
        {props.papelUsuario === "USUARIO_TOKEN" ? null : (
          <Botao
            titulo="enviar para consultoria"
            classes="btn btn-warning botao-menor-personalizado botao-personalizado-pitch-deck"
            onClick={() => enviarParaConsultoria()}
          />
        )}
        <Botao
          titulo="versões"
          classes="btn btn-warning botao-menor-personalizado"
          onClick={() => {
            navigate(
              `/equipe/${props?.idEquipe}/${props?.papelUsuario}/versoes-artefatos/PITCH_DECK`
            );
          }}
        />
      </div>
      <Modal
        open={openModalAlerta}
        onClose={handleCloseModalAlerta}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModals}>
          <div>
            <h5 className="m-0">{MSG074}</h5>
            <div className="d-flex justify-content-between mt-3 pt-3">
              <Botao
                titulo="voltar"
                classes="btn btn-secondary botao-menor-personalizado"
                id="btn-voltar-feedback-pitch"
                onClick={handleCloseModalAlerta}
              />
              <div>
                <label for="id-input-pitch-deck">
                  <div className="btn btn-warning">
                    <h5 className="m-0 align-self-center text-white"><strong>ESCOLHER ARQUIVO</strong></h5>
                  </div>
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
  );
}

export default PainelPitchDeck;

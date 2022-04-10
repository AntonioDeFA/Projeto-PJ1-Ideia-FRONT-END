import { Box, TextField, Typography, Modal } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import DefaultHeader from "../../components/DefaultHeader";
import { styleModals } from "../../utils/constantes";

import Botao from "./../../components/Botao/index";
import CardMembro from "./../../components/CardMembro/index";
import { MSG000, MSG003, MSG004 } from "./../../utils/mensagens";

import "./styles.css";
import { validarEmail } from "./../../services/utils";

function CadastroEquipe() {
  const [nomeEquipe, setNomeEquipe] = useState(MSG000);
  const [errorInputNomeEquipe, setErrorInputNomeEquipe] = useState(false);
  const [
    mensagemCampoObrigatorioNomeEquipe,
    setMensagemCampoObrigatorioNomeEquipe,
  ] = useState(MSG000);

  const [nomeMembro, setNomeMembro] = useState("");
  const [errorInputNomeMembro, setErrorInputNomeMembro] = useState(false);
  const [
    mensagemCampoObrigatorioNomeMembro,
    setMensagemCampoObrigatorioNomeMembro,
  ] = useState(MSG000);

  const [emailMembro, setEmailMembro] = useState("");
  const [errorInputEmailMembro, setErrorInputEmailMembro] = useState(false);
  const [
    mensagemCampoObrigatorioEmailMembro,
    setMensagemCampoObrigatorioEmailMembro,
  ] = useState(MSG000);

  const [openModalCriarMembro, setOpenModalCriarMembro] = React.useState(false);
  const handleOpenModalCriarMembro = () => setOpenModalCriarMembro(true);
  const handleCloseModalCriarMembro = () => setOpenModalCriarMembro(false);

  const [openModalConfirmarInscricao, setOpenModalConfirmarInscricao] =
    React.useState(false);
  const handleOpenModalConfirmarInscricao = () =>
    setOpenModalConfirmarInscricao(true);
  const handleCloseModalConfirmarInscricao = () =>
    setOpenModalConfirmarInscricao(false);

  const validarCamposObrigatorios = (
    value,
    functionSetError,
    functionSetMensagem
  ) => {
    if (value.length === 0) {
      functionSetError(true);
      functionSetMensagem(MSG004);
      return false;
    } else {
      functionSetError(false);
      functionSetMensagem(MSG000);
      return true;
    }
  };

  const confirmarCriacaoEquipe = () => {
    if (
      validarCamposObrigatorios(
        nomeEquipe,
        setErrorInputNomeEquipe,
        setMensagemCampoObrigatorioNomeEquipe
      )
    ) {
      handleOpenModalConfirmarInscricao();
    }
  };

  const finalizarInscricao = () => {
    console.log("Finalizando a inscrição...");
  };

  const adicionarMembro = () => {
    let statusNomeMembro = validarCamposObrigatorios(
      nomeMembro,
      setErrorInputNomeMembro,
      setMensagemCampoObrigatorioNomeMembro
    );
    let statusEmailMembro = validarCamposObrigatorios(
      emailMembro,
      setErrorInputEmailMembro,
      setMensagemCampoObrigatorioEmailMembro
    );
    if (statusNomeMembro && statusEmailMembro) {
      if (validarEmail(emailMembro)) {
        console.log("Pode adicionar membro");
      } else {
        setErrorInputEmailMembro(true);
        setMensagemCampoObrigatorioEmailMembro(MSG003);
      }
    }
  };

  const cancelarCriacaoMembro = () => {
    setEmailMembro(MSG000);
    setNomeMembro(MSG000);
    handleCloseModalCriarMembro();
  };

  return (
    <div id="cadastro-equipe">
      <DefaultHeader />
      <div className="elementos-centralizados">
        <div id="dados-equipe">
          <div id="nome-botoes">
            <h2 id="nome-pagina">
              Nova Inscrição - Competição {"<Nome da competição>"}
            </h2>

            <div id="botoes" className="botoes">
              <div id="btn-confirmar">
                <Botao
                  titulo="confirmar"
                  classes="btn btn-warning botao-menor-personalizado"
                  onClick={confirmarCriacaoEquipe}
                />
              </div>
              <div id="btn-voltar">
                <Link to={"/"}>
                  <Botao
                    titulo="voltar"
                    classes="btn btn-secondary botao-menor-personalizado"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div id="nome-equipe">
            <Box component="form" noValidate autoComplete="off">
              <div className="input">
                <TextField
                  error={errorInputNomeEquipe}
                  helperText={mensagemCampoObrigatorioNomeEquipe}
                  id="filled-search-nomeEquipe"
                  value={nomeEquipe}
                  onChange={(e) => {
                    setNomeEquipe(e.target.value);
                    validarCamposObrigatorios(
                      e.target.value,
                      setErrorInputNomeEquipe,
                      setMensagemCampoObrigatorioNomeEquipe
                    );
                  }}
                  label="Nome da equipe *"
                  type="text"
                  variant="filled"
                  color="warning"
                  size="small"
                />
              </div>
            </Box>
          </div>

          <div id="btn-add-membro">
            <Botao
              titulo="adicionar membro"
              classes="btn btn-warning botao-menor-personalizado"
              onClick={handleOpenModalCriarMembro}
            />
          </div>

          <div id="membros">
            <ul id="lista-membros">
              <li>
                <CardMembro
                  isLider={true}
                  nome="Fulano"
                  email="fulano@gmail.com"
                  sequencial={1}
                />
              </li>
              <li>
                <CardMembro
                  isLider={false}
                  nome="Fulano"
                  email="fulano@gmail.com"
                  sequencial={2}
                />
              </li>
              <li>
                <CardMembro
                  isLider={false}
                  nome="Fulano"
                  email="fulano@gmail.com"
                  sequencial={3}
                />
              </li>
              <li>
                <CardMembro
                  isLider={false}
                  nome="Fulano"
                  email="fulano@gmail.com"
                  sequencial={4}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Modal
        open={openModalCriarMembro}
        onClose={cancelarCriacaoMembro}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModals}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "20px" }}
          >
            Informe os dados do novo membro
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 0, width: "500px" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="input">
              <TextField
                error={errorInputNomeMembro}
                helperText={mensagemCampoObrigatorioNomeMembro}
                id="filled-search-nome-membro"
                value={nomeMembro}
                onChange={(e) => {
                  setNomeMembro(e.target.value);
                  validarCamposObrigatorios(
                    e.target.value,
                    setErrorInputNomeMembro,
                    setMensagemCampoObrigatorioNomeMembro
                  );
                }}
                label="Nome *"
                type="text"
                variant="filled"
                color="warning"
                size="small"
              />
            </div>

            <div className="input">
              <TextField
                error={errorInputEmailMembro}
                helperText={mensagemCampoObrigatorioEmailMembro}
                id="filled-search-email"
                value={emailMembro}
                onChange={(e) => {
                  setEmailMembro(e.target.value);
                  validarCamposObrigatorios(
                    e.target.value,
                    setErrorInputEmailMembro,
                    setMensagemCampoObrigatorioEmailMembro
                  );
                }}
                label="E-mail *"
                type="email"
                variant="filled"
                color="warning"
                size="small"
              />
            </div>
          </Box>
          <div className="botoes-cadastro">
            <Botao
              titulo="adicionar"
              classes="btn btn-warning botao-menor-personalizado"
              onClick={adicionarMembro}
            />
            <Botao
              titulo="cancelar"
              classes="btn btn-secondary botao-menor-personalizado"
              onClick={cancelarCriacaoMembro}
            />
          </div>
        </Box>
      </Modal>

      <Modal
        open={openModalConfirmarInscricao}
        onClose={handleCloseModalConfirmarInscricao}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModals}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "20px" }}
          >
            Ao confirmar, você aceita os termos e condições atribuidos a cada
            membro da equipe.
          </Typography>
          <div className="botoes">
            <div id="btn-confirmar">
              <Botao
                titulo="confirmar inscrição"
                classes="btn btn-warning botao-menor-personalizado"
                onClick={finalizarInscricao}
              />
            </div>
            <div id="btn-cancelar-confirmacao">
              <Botao
                titulo="cancelar"
                classes="btn btn-secondary botao-menor-personalizado"
                onClick={handleCloseModalConfirmarInscricao}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CadastroEquipe;

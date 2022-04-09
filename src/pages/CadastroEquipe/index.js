import { Box, TextField, Typography, Modal } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import DefaultHeader from "../../components/DefaultHeader";

import Botao from "./../../components/Botao/index";
import CardMembro from "./../../components/CardMembro/index";
import { MSG000, MSG004 } from "./../../utils/mensagens";

import "./styles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CadastroEquipe() {
  const [nomeEquipe, setNomeEquipe] = useState(MSG000);
  const [errorInputNomeEquipe, setErrorInputNomeEquipe] = useState(false);
  const [
    mensagemCampoObrigatorioNomeEquipe,
    setMensagemCampoObrigatorioNomeEquipe,
  ] = useState(MSG000);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <div id="cadastro-equipe">
      <DefaultHeader />
      <div className="elementos-centralizados">
        <div id="dados-equipe">
          <div id="nome-botoes">
            <h2 id="nome-pagina">
              Nova Inscrição - Competição {"<Nome da competição>"}
            </h2>

            <div id="botoes">
              <div id="btn-confirmar">
                <Botao
                  titulo="confirmar"
                  classes="btn btn-warning botao-menor-personalizado"
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
              onClick={handleOpen}
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
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Informe os dados do novo membro
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default CadastroEquipe;

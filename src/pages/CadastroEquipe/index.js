import { Box, TextField } from "@mui/material";
import React, { useState } from "react";

import DefaultHeader from "../../components/DefaultHeader";

import "./styles.css";
import { MSG000, MSG004 } from "./../../utils/mensagens";
import Botao from "./../../components/Botao/index";
import { Link } from "react-router-dom";

function CadastroEquipe() {
  const [nomeEquipe, setNomeEquipe] = useState(MSG000);
  const [errorInputNomeEquipe, setErrorInputNomeEquipe] = useState(false);
  const [
    mensagemCampoObrigatorioNomeEquipe,
    setMensagemCampoObrigatorioNomeEquipe,
  ] = useState(MSG000);

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
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 0, width: "31.5%" },
              }}
              noValidate
              autoComplete="off"
            >
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
            />
          </div>

          <div id="membros">
            <ul id="lista-membros">
              <li>
                <div>
                  <div>
                    <h1>aaaa</h1>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div>
                    <h1>aaaa</h1>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div>
                    <h1>aaaa</h1>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div>
                    <h1>aaaa</h1>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroEquipe;

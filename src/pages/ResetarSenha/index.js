import React, { useState } from "react";

import ImgLogoLaranja from "../../assets/images/logo-ideia-laranja.png";

import "./styles.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Botao from "./../../components/Botao/index";
import Mensagem from "./../../components/Mensagem/index";
import { Link } from "react-router-dom";
import { validarEmail } from "services/utils";
import {
  MSG000,
  MSG003,
  MSG004,
  MSG005,
  MSG006,
} from "./../../utils/mensagens";

function ResetarSenha() {
  const [email, setEmail] = useState(MSG000);
  const [errorInputEmail, setErrorInputEmail] = useState(false);
  const [mensagemCampoObrigatorioEmail, setMensagemCampoObrigatorioEmail] =
    useState(MSG000);

  const [mensagemAlerta, setMensagemAlerta] = useState(MSG000);

  const [tipoMensagem, setTipoMensagem] = useState(MSG000);

  const [enviouSenha, setEnviouSenha] = useState(false);

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

  const enviarSenha = () => {
    let statusInputToken = validarCamposObrigatorios(
      email,
      setErrorInputEmail,
      setMensagemCampoObrigatorioEmail
    );
    if (statusInputToken) {
      if (!validarEmail(email)) {
        setErrorInputEmail(true);
        setMensagemAlerta(MSG003);
        setTipoMensagem(MSG006);
      } else {
        console.log("Enviando código...");
        setTipoMensagem(MSG005);
        setMensagemAlerta(
          "Uma senha provisória foi enviada para o seu e-mail!"
        );
        setEnviouSenha(true);
      }
    }
  };

  return (
    <div id="resetar-senha" className="tamanho-maximo fundo-amarelo">
      <div className="elementos-centralizados tamanho-maximo">
        <div id="componente-conteudo">
          <div className="elementos-centralizados">
            <div className="img-logo">
              <img id="" src={ImgLogoLaranja} alt="Ideia" />
            </div>
          </div>

          <div className="elementos-centralizados">
            <p id="mensagem-email">
              Informe o e-mail que você usou para se cadastrar no Ideia. Nós
              enviaremos um código que você poderá usar para resetar sua senha.
            </p>
          </div>

          <div className="elementos-centralizados">
            {mensagemAlerta !== "" ? (
              <Mensagem mensagem={mensagemAlerta} tipoMensagem={tipoMensagem} />
            ) : null}
          </div>

          <div className="elementos-centralizados">
            <div id="form-dados-usuario">
              <div className="elementos-centralizados" id="inputs">
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
                      error={errorInputEmail}
                      helperText={mensagemCampoObrigatorioEmail}
                      id="filled-search-email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validarCamposObrigatorios(
                          e.target.value,
                          setErrorInputEmail,
                          setMensagemCampoObrigatorioEmail
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
              </div>

              <div className="botoes-cadastro">
                {enviouSenha ? null : (
                  <Botao
                    titulo="enviar código"
                    classes="btn btn-warning botao-menor-personalizado"
                    onClick={enviarSenha}
                  />
                )}

                <Link to={"/login"}>
                  <Botao
                    titulo={
                      enviouSenha ? "voltar para tela de login" : "voltar"
                    }
                    classes={
                      enviouSenha
                        ? "btn botao-menor-personalizado btn-warning"
                        : "btn botao-menor-personalizado btn-secondary"
                    }
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetarSenha;

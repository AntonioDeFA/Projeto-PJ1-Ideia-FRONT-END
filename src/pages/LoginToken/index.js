import MensagemErro from "components/MensagemErro";
import React, { useState } from "react";

import ImgLogoLaranja from "../../assets/images/logo-ideia-laranja.png";

import "./styles.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Botao from "./../../components/Botao/index";
import { Link } from "react-router-dom";

function CadastroUsuario() {
  const [token, setToken] = useState("");
  const [errorInputToken, setErrorInputToken] = useState(false);
  const [mensagemCampoObrigatorioToken, setMensagemCampoObrigatorioToken] =
    useState("");

  const [mensagemErro, setMensagemErro] = useState("");

  const validarCamposObrigatorios = (
    value,
    functionSetError,
    functionSetMensagem
  ) => {
    if (value.length === 0) {
      functionSetError(true);
      functionSetMensagem("Campo obrigatório");
      return false;
    } else {
      functionSetError(false);
      functionSetMensagem("");
      return true;
    }
  };

  const entrar = () => {
    let statusInputToken = validarCamposObrigatorios(
      token,
      setErrorInputToken,
      setMensagemCampoObrigatorioToken
    );
    if (statusInputToken) {
      console.log("Pode fazer login com token");
    }
  };

  return (
    <div id="pagina-cadastro" className="tamanho-maximo">
      <div className="elementos-centralizados tamanho-maximo">
        <div id="componente-conteudo">
          <div className="elementos-centralizados">
            <div className="img-logo">
              <img id="" src={ImgLogoLaranja} alt="Ideia" />
            </div>
          </div>

          <div className="elementos-centralizados">
            {mensagemErro !== "" ? (
              <MensagemErro mensagem={mensagemErro} />
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
                      error={errorInputToken}
                      helperText={mensagemCampoObrigatorioToken}
                      id="filled-search-token"
                      value={token}
                      onChange={(e) => {
                        setToken(e.target.value);
                        validarCamposObrigatorios(
                          e.target.value,
                          setErrorInputToken,
                          setMensagemCampoObrigatorioToken
                        );
                      }}
                      label="Token *"
                      type="text"
                      variant="filled"
                      color="warning"
                      size="small"
                    />
                  </div>
                </Box>
              </div>

              <div className="botoes-cadastro">
                <Botao
                  titulo="entrar"
                  classes="btn btn-warning botao-menor-personalizado"
                  onClick={entrar}
                />

                <Link to={"/login"}>
                  <Botao
                    titulo="voltar"
                    classes="btn btn-secondary botao-menor-personalizado"
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

export default CadastroUsuario;

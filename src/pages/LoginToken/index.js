import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import Box from "@mui/material/Box";
import Botao from "./../../components/Botao/index";
import Mensagem from "./../../components/Mensagem/index";
import TextField from "@mui/material/TextField";
import StoreContext from "../../store/context";
import ImgLogoLaranja from "../../assets/images/logo-ideia-laranja.png";
import { MSG000, MSG006 } from "./../../utils/mensagens";
import { validarCamposObrigatorios } from "../../services/utils";

import "./styles.css";

function LoginToken() {
  const [token, setInputToken] = useState(MSG000);
  const [errorInputToken, setErrorInputToken] = useState(false);
  const [mensagemCampoObrigatorioToken, setMensagemCampoObrigatorioToken] =
    useState(MSG000);

  const [mensagem, setMensagem] = useState(MSG000);

  const { setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const entrar = () => {
    let statusInputToken = validarCamposObrigatorios(
      token,
      setErrorInputToken,
      setMensagemCampoObrigatorioToken
    );
    if (statusInputToken) {
      api
        .post("/seguranca/token", { token: token })
        .then((response) => {
          setToken(response.data.token);
          navigate(`/equipe/${response.data.idEquipe}/USUARIO_TOKEN`);
        })
        .catch((error) => {
          setMensagem(error.response.data.message);
          console.log("Erro ao tentar logar");
        });
    }
  };

  return (
    <div id="pagina-login-token" className="tamanho-maximo fundo-amarelo">
      <div className="elementos-centralizados tamanho-maximo">
        <div id="componente-conteudo">
          <div className="elementos-centralizados">
            <div className="img-logo">
              <img id="" src={ImgLogoLaranja} alt="Ideia" />
            </div>
          </div>

          <div className="elementos-centralizados">
            {mensagem !== "" ? (
              <Mensagem mensagem={mensagem} tipoMensagem={MSG006} />
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
                        setInputToken(e.target.value);
                        validarCamposObrigatorios(
                          e.target.value,
                          setErrorInputToken,
                          setMensagemCampoObrigatorioToken
                        );
                      }}
                      label="Insira seu token de acesso *"
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

                <Link to={"/"}>
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

export default LoginToken;

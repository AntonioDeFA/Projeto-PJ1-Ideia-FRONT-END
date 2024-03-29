import React, { useState, useContext } from "react";
import api from "../../services/api";
import StoreContext from "../../store/context";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import ImgLogo from "../../assets/images/Imagem1.png";

import "./styles.css";
import Botao from "../../components/Botao";
import { Link } from "react-router-dom";
import { MSG000, MSG003, MSG006, MSG011 } from "../../utils/mensagens";
import { validarCamposObrigatorios, validarEmail } from "../../services/utils";
import Mensagem from "../../components/Mensagem";

function Login() {
  const [email, setEmail] = useState(MSG000);
  const [mensagemCampoObrigatorioEmail, setMensagemCampoObrigatorioEmail] =
    useState(MSG000);
  const [errorInputEmail, setErrorInputEmail] = useState(false);

  const [mensagem, setMensagem] = useState(MSG000);

  const [password, setPassword] = useState(MSG000);
  const [
    mensagemCampoObrigatorioPassword,
    setMensagemCampoObrigatorioPassword,
  ] = useState(MSG000);
  const [errorInputPassword, setErrorInputPassword] = useState(false);

  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const fazerLogin = () => {
    let statusInputEmail = validarCamposObrigatorios(
      email,
      setErrorInputEmail,
      setMensagemCampoObrigatorioEmail
    );
    let statusInputPassword = validarCamposObrigatorios(
      password,
      setErrorInputPassword,
      setMensagemCampoObrigatorioPassword
    );

    if (statusInputEmail && statusInputPassword) {
      if (validarEmail(email)) {
        api
          .post("/seguranca/login", { login: email, senha: password })
          .then((response) => {
            setToken(response.data.token);
            return navigate("/inicio/abertas");
          })
          .catch((error) => {
            setMensagem(MSG011);
            return navigate("/");
          });
      } else {
        setErrorInputEmail(true);
        setMensagemCampoObrigatorioEmail(MSG003);
      }
    }
  };

  const fazerLoginViaEnter = (event) => {
    if (event.keyCode === 13) {
      fazerLogin();
    }
  };

  return (
    <div id="page-login">
      <div className="page-login-content m-0">
        <div className="left">
          <div id="saudacoes">
            <div className="elementos-centralizados">
              <h2>Seja bem vindo!</h2>
            </div>
            <div className="elementos-centralizados">
              <h4>Faça seu Login</h4>
            </div>
            <div className="elementos-centralizados">
              {mensagem !== "" ? (
                <Mensagem mensagem={mensagem} tipoMensagem={MSG006} />
              ) : null}
            </div>
          </div>

          <div id="form-login">
            <div className="elementos-centralizados" id="inputs">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 0, width: "550px" },
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
                    label="E-mail"
                    type="email"
                    variant="filled"
                    color="warning"
                    size="small"
                    onKeyUp={(event) => {
                      fazerLoginViaEnter(event);
                    }}
                  />
                </div>

                <div className="input">
                  <FormControl
                    color="warning"
                    sx={{ m: 0, width: "550px" }}
                    variant="filled"
                  >
                    <TextField
                      error={errorInputPassword}
                      helperText={mensagemCampoObrigatorioPassword}
                      id="filled-search"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validarCamposObrigatorios(
                          e.target.value,
                          setErrorInputPassword,
                          setMensagemCampoObrigatorioPassword
                        );
                      }}
                      label="Senha"
                      type="password"
                      variant="filled"
                      color="warning"
                      size="small"
                      onKeyUp={(event) => {
                        fazerLoginViaEnter(event);
                      }}
                    />
                  </FormControl>
                </div>
              </Box>
            </div>

            <div className="elementos-alinhados-esquerda" id="opcoes-links">
              <p>
                <Link to={"/resetar-senha"}>Esqueceu sua senha?</Link>
                <br />
                <Link to={"/login-token"}>Acesse com seu token de membro!</Link>
              </p>
            </div>

            <div className="elementos-centralizados" id="botao-login">
              <Botao
                titulo="login"
                classes="btn btn-warning botao-personalizado"
                onClick={fazerLogin}
              />
            </div>

            <div
              className={
                mensagem !== ""
                  ? "elementos-alinhados-esquerda link-criar-conta-com-mensagem"
                  : "elementos-alinhados-esquerda link-criar-conta-sem-mensagem"
              }
              id="link-criar-conta"
            >
              <p style={{ margin: 0 }}>
                Não tem conta?{" "}
                <Link to={"/cadastro-usuario"}>Crie a sua aqui!</Link> <br />{" "}
                <Link to={"/about-us"}>
                  Sobre nós{" "}
                  <i
                    style={{ color: "#fc7a00" }}
                    className="fa fa-circle-question"
                  ></i>
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="right bg-warning elementos-centralizados">
          <img id="logo-img" src={ImgLogo} alt="Ideia" />
        </div>
      </div>
    </div>
  );
}

export default Login;

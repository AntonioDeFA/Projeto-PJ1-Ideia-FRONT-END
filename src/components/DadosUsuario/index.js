import React, { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import ImgLogoLaranja from "../../assets/images/logo-ideia-laranja.png";

import StoreContext from "../../store/context";

import "./styles.css";
import Botao from "../../components/Botao";
import Mensagem from "../../components/Mensagem";
import { validarCamposObrigatorios, validarEmail } from "../../services/utils";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  MSG000,
  MSG001,
  MSG002,
  MSG003,
  MSG006,
  MSG012,
  MSG013,
} from "./../../utils/mensagens";

function DadosUsuario() {
  const [nome, setNome] = useState(MSG000);
  const [errorInputNome, setErrorInputNome] = useState(false);

  const [email, setEmail] = useState(MSG000);
  const [errorInputEmail, setErrorInputEmail] = useState(false);

  const [password, setPassword] = useState(MSG000);
  const [errorInputPassword, setErrorInputPassword] = useState(false);

  const [confirmarPassword, setConfirmarPassword] = useState(MSG000);
  const [errorInputConfirmarPassword, setErrorInputConfirmarPassword] =
    useState(false);

  const [mensagemErro, setMensagemErro] = useState(MSG000);

  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const { token } = useContext(StoreContext);

  useEffect(() => {
    if (token !== null) {
      api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
      api
        .get("/usuario-logado")
        .then((response) => {
          const { data } = response;
          setNome(data.nomeUsuario);
          setEmail(data.email);
          setUsuarioLogado(data);
        })
        .catch((error) => {
          // validarErroUnauthorized(error.response);
        });
    }
  }, [token]);

  const navigate = useNavigate();

  const fazerCadastro = () => {
    setMensagemErro(MSG000);
    let statusInputNome = validarCamposObrigatorios(nome, setErrorInputNome);
    let statusInputEmail = validarCamposObrigatorios(email, setErrorInputEmail);
    let statusInputPassword = validarCamposObrigatorios(
      password,
      setErrorInputPassword
    );
    let statusInputConfirmarPassword = validarCamposObrigatorios(
      confirmarPassword,
      setErrorInputConfirmarPassword
    );

    if (
      statusInputNome &&
      statusInputEmail &&
      statusInputPassword &&
      statusInputConfirmarPassword
    ) {
      if (password !== confirmarPassword) {
        setErrorInputPassword(true);
        setErrorInputConfirmarPassword(true);
        setMensagemErro(MSG002);
      } else {
        if (!validarEmail(email)) {
          setErrorInputEmail(true);
          setMensagemErro(MSG003);
        } else {
          let user = {
            nomeUsuario: nome,
            email,
            senha: password,
          };
          api
            .post("/usuario", user)
            .then((response) => {
              return navigate("/inicio/abertas");
            })
            .catch((error) => {
              setMensagemErro(error.response.data.motivosErros.join("\n"));
            });
        }
      }
    } else {
      setMensagemErro(MSG001);
    }
  };

  const atualizarCadastro = () => {
    let dadosAtualizados = {};
    let senhaIsOk = true;

    if (nome === "" && password === "") {
      setMensagemErro(MSG013);
    } else {
      setMensagemErro(MSG000);

      if (nome !== "") {
        Object.assign(dadosAtualizados, { nomeUsuario: nome });
      }
      if (password !== "") {
        let statusInputConfirmarPassword = validarCamposObrigatorios(
          confirmarPassword,
          setErrorInputConfirmarPassword
        );

        if (statusInputConfirmarPassword) {
          if (password !== confirmarPassword) {
            setErrorInputPassword(true);
            setErrorInputConfirmarPassword(true);
            setMensagemErro(MSG002);
            senhaIsOk = false;
          } else {
            Object.assign(dadosAtualizados, { senha: password });
            setMensagemErro(MSG000);
          }
        } else {
          setMensagemErro(MSG012);
          senhaIsOk = false;
        }
      }

      if (Object.keys(dadosAtualizados).length !== 0 && senhaIsOk) {
        api.defaults.headers.patch["Authorization"] = `Bearer ${token}`;
        api
          .patch("/usuario/update", dadosAtualizados)
          .then((response) => {
            return navigate("/inicio/abertas");
          })
          .catch((error) => {
            console.log(error.response.data);
            // setMensagemErro(error.response.data.motivosErros.join("\n"));
          });
      }
    }
  };

  return (
    <div id="componente-conteudo">
      <div className="elementos-centralizados">
        <div className="img-logo">
          <img id="" src={ImgLogoLaranja} alt="Ideia" />
        </div>
      </div>

      <div className="elementos-centralizados">
        {mensagemErro !== "" ? (
          <Mensagem mensagem={mensagemErro} tipoMensagem={MSG006} />
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
                  error={usuarioLogado === null ? errorInputNome : null}
                  id="filled-search-Nome"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    validarCamposObrigatorios(
                      e.target.value,
                      setErrorInputNome
                    );
                  }}
                  label={usuarioLogado === null ? "Nome *" : "Nome"}
                  type="text"
                  variant="filled"
                  color="warning"
                  size="small"
                />
              </div>

              <div className="input">
                <TextField
                  error={errorInputEmail}
                  id="filled-search-email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validarCamposObrigatorios(
                      e.target.value,
                      setErrorInputEmail
                    );
                  }}
                  label="E-mail *"
                  type="email"
                  variant="filled"
                  color="warning"
                  size="small"
                  disabled={usuarioLogado !== null}
                />
              </div>

              <div className="input">
                <TextField
                  error={usuarioLogado === null ? errorInputPassword : null}
                  id="filled-search-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validarCamposObrigatorios(
                      e.target.value,
                      setErrorInputPassword
                    );
                  }}
                  label={usuarioLogado === null ? "Senha *" : "Senha"}
                  type="password"
                  variant="filled"
                  color="warning"
                  size="small"
                />
              </div>

              <div className="input">
                <TextField
                  error={
                    usuarioLogado === null ? errorInputConfirmarPassword : null
                  }
                  id="filled-search-confirm-password"
                  value={confirmarPassword}
                  onChange={(e) => {
                    setConfirmarPassword(e.target.value);
                    validarCamposObrigatorios(
                      e.target.value,
                      setErrorInputConfirmarPassword
                    );
                  }}
                  label={
                    usuarioLogado === null
                      ? "Confirmar senha *"
                      : "Confirmar senha"
                  }
                  type="password"
                  variant="filled"
                  color="warning"
                  size="small"
                />
              </div>
            </Box>
          </div>

          <div className="botoes-cadastro">
            <Botao
              titulo="salvar"
              classes="btn btn-warning botao-menor-personalizado"
              id="btn-salvar-usuario"
              onClick={
                usuarioLogado === null ? fazerCadastro : atualizarCadastro
              }
            />
            <Link to={usuarioLogado !== null ? "/inicio/abertas" : "/"}>
              <Botao
                titulo="voltar"
                id="btn-voltar"
                classes="btn btn-secondary botao-menor-personalizado"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DadosUsuario;

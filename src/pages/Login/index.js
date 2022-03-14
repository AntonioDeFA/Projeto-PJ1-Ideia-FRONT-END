import React, { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

// import { Link } from "react-router-dom";

// import api from "../../services/api";

import ImgLogo from '../../assets/images/Imagem1.png';

import "./styles.css";
import Botao from "../../components/Botao";

function Login() {
  const [email, setEmail] = useState("");
  const [mensagemCampoObrigatorioEmail, setMensagemCampoObrigatorioEmail] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [mensagemCampoObrigatorioPassword, setMensagemCampoObrigatorioPassword] = useState("");
  const [errorInputPassword, setErrorInputPassword] = useState(false);
  
  const validarCamposEntradaObrigatorios = (value, functionSetError, functionSetMensagem) => {
    if(value.length === 0) {
      functionSetError(true);
      functionSetMensagem("Campo obrigatório");
      return false;
    } else {
      functionSetError(false);
      functionSetMensagem("");
      return true;
    }
  }

  const fazerLogin = () => {
    let statusInputEmail = validarCamposEntradaObrigatorios(email, setErrorInputEmail, setMensagemCampoObrigatorioEmail);
    let statusInputPassword = validarCamposEntradaObrigatorios(password, setErrorInputPassword, setMensagemCampoObrigatorioPassword);
    if(statusInputEmail && statusInputPassword) {
      console.log('Pode fazer login');
    }
  }

  return (
    <div id="page-login">
      <div className="row m-0">
        <div className="col">
          <div id="saudacoes">
            <div className="elementos-centralizados">
              <h2>Seja bem vindo!</h2>
            </div>
            <div className="elementos-centralizados">
              <h4>Faça seu Login</h4>
            </div>
          </div>

          <div id="form-login">
            <div className="elementos-centralizados" id="inputs">
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '550px' },
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
                      validarCamposEntradaObrigatorios(e.target.value, setErrorInputEmail, setMensagemCampoObrigatorioEmail);
                    }}
                    label="E-mail"
                    type="email"
                    variant="filled"
                    color="warning"
                    size="small"
                  />
                </div>

                <div className="input">
                  <FormControl color="warning" sx={{ m: 0, width: '550px', }} variant="filled">
                    <TextField
                      error={errorInputPassword}
                      helperText={mensagemCampoObrigatorioPassword}
                      id="filled-search"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validarCamposEntradaObrigatorios(e.target.value, setErrorInputPassword, setMensagemCampoObrigatorioPassword);
                      }}
                      label="Senha"
                      type="password"
                      variant="filled"
                      color="warning"
                      size="small"
                    />
                  </FormControl>
                </div>
              </Box>
            </div>

            <div className="elementos-alinhados-esquerda" id="opcoes-links">
              <p>
                <a href="google.com">Esqueceu sua senha?</a><br />
                <a href="google.com">Acesse com seu token de membro!</a>
              </p>
            </div>

            <div className="elementos-centralizados" id="botao-login">
              <Botao
                titulo="login"
                classes="btn btn-warning botao-personalizado"
                onClick={fazerLogin}
              />
            </div>

            <div className="elementos-alinhados-esquerda" id="link-criar-conta">
              <p>
                Não tem conta? <a href="google.com">Crie a sua aqui!</a>
              </p>
            </div>

          </div>
        </div>

        <div className="col bg-warning elementos-centralizados">
          <img id="logo-img" src={ImgLogo} alt="Ideia" />
        </div>
      </div>
    </div>
  );
}

export default Login;
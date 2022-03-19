import React, { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

// import { Link } from "react-router-dom";

// import api from "../../services/api";

import ImgLogoLaranja from '../../assets/images/logo-ideia-laranja.png';

import "./styles.css";
import Botao from "../../components/Botao";

function DadosUsuario() {
  const [nome, setNome] = useState("");
  const [errorInputNome, setErrorInputNome] = useState(false);

  const [email, setEmail] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [errorInputPassword, setErrorInputPassword] = useState(false);

  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [errorInputConfirmarPassword, setErrorInputConfirmarPassword] = useState(false);
  
  const validarCamposEntradaObrigatorios = (value, functionSetError) => {
    if(value.length === 0) {
      functionSetError(true);
      return false;
    } else {
      functionSetError(false);
      return true;
    }
  }

  const fazerLogin = () => {
    let statusInputNome = validarCamposEntradaObrigatorios(nome, setErrorInputNome);
    let statusInputEmail = validarCamposEntradaObrigatorios(email, setErrorInputEmail);
    let statusInputPassword = validarCamposEntradaObrigatorios(password, setErrorInputPassword);
    let statusInputConfirmarPassword = validarCamposEntradaObrigatorios(confirmarPassword, setErrorInputConfirmarPassword);
    
    if(statusInputNome &&
      statusInputEmail &&
      statusInputPassword &&
      statusInputConfirmarPassword) {
      console.log('Pode fazer cadastro');
    }
  }

  return (
    <div id="componente-conteudo">
      <div className="elementos-centralizados">
        <div className="img-logo">
          <img id="" src={ImgLogoLaranja} alt="Ideia" />
        </div>
      </div>

      <div className="elementos-centralizados">
        <div className="mensagem-erro">
          <div id="titulo-erro" className="elementos-centralizados">
            <h5>Erro!</h5>
          </div>
          <div className="elementos-centralizados">
            <p>Infelizmente, aconteceu um erro. :(</p>
          </div>
        </div>
      </div>

      <div className="elementos-centralizados">
        <div id="form-dados-usuario">
          <div className="elementos-centralizados" id="inputs">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 0, width: '500px' },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="input">
                <TextField
                  error={errorInputNome}
                  id="filled-search-Nome"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    validarCamposEntradaObrigatorios(e.target.value, setErrorInputNome);
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
                  error={errorInputEmail}
                  id="filled-search-email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validarCamposEntradaObrigatorios(e.target.value, setErrorInputEmail);
                  }}
                  label="E-mail *"
                  type="email"
                  variant="filled"
                  color="warning"
                  size="small"
                />
              </div>

              <div className="input">
                <FormControl color="warning" sx={{ m: 0, width: '450px', }} variant="filled">
                  <TextField
                    error={errorInputPassword}
                    id="filled-search"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validarCamposEntradaObrigatorios(e.target.value, setErrorInputPassword);
                    }}
                    label="Senha *"
                    type="password"
                    variant="filled"
                    color="warning"
                    size="small"
                  />
                </FormControl>
              </div>

              <div className="input">
                <FormControl color="warning" sx={{ m: 0, width: '450px', }} variant="filled">
                  <TextField
                    error={errorInputConfirmarPassword}
                    id="filled-search"
                    value={confirmarPassword}
                    onChange={(e) => {
                      setConfirmarPassword(e.target.value);
                      validarCamposEntradaObrigatorios(e.target.value, setErrorInputConfirmarPassword);
                    }}
                    label="Confirmar senha *"
                    type="password"
                    variant="filled"
                    color="warning"
                    size="small"
                  />
                </FormControl>
              </div>
            </Box>
          </div>

          <div className="botoes-cadastro">
            <Botao
              titulo="salvar"
              classes="btn btn-warning botao-menor-personalizado"
              onClick={fazerLogin}
            />
            <Botao
              titulo="voltar"
              classes="btn btn-secondary botao-menor-personalizado"
              onClick={fazerLogin}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default DadosUsuario;
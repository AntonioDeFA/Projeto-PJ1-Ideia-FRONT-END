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
  const [mensagemCampoObrigatorioNome, setMensagemCampoObrigatorioNome] = useState("");
  const [errorInputNome, setErrorInputNome] = useState(false);

  const [email, setEmail] = useState("");
  const [mensagemCampoObrigatorioEmail, setMensagemCampoObrigatorioEmail] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [mensagemCampoObrigatorioPassword, setMensagemCampoObrigatorioPassword] = useState("");
  const [errorInputPassword, setErrorInputPassword] = useState(false);

  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensagemCampoObrigatorioConfirmarPassword, setMensagemCampoObrigatorioConfirmarPassword] = useState("");
  const [errorInputConfirmarPassword, setErrorInputConfirmarPassword] = useState(false);
  
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
    let statusInputNome = validarCamposEntradaObrigatorios(nome, setErrorInputNome, setMensagemCampoObrigatorioNome);
    let statusInputEmail = validarCamposEntradaObrigatorios(email, setErrorInputEmail, setMensagemCampoObrigatorioEmail);
    let statusInputPassword = validarCamposEntradaObrigatorios(password, setErrorInputPassword, setMensagemCampoObrigatorioPassword);
    let statusInputConfirmarPassword = validarCamposEntradaObrigatorios(confirmarPassword, setErrorInputConfirmarPassword, setMensagemCampoObrigatorioConfirmarPassword);
    
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
                  helperText={mensagemCampoObrigatorioNome}
                  id="filled-search-Nome"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    validarCamposEntradaObrigatorios(e.target.value, setErrorInputNome, setMensagemCampoObrigatorioNome);
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
                  helperText={mensagemCampoObrigatorioEmail}
                  id="filled-search-email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validarCamposEntradaObrigatorios(e.target.value, setErrorInputEmail, setMensagemCampoObrigatorioEmail);
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
                    helperText={mensagemCampoObrigatorioPassword}
                    id="filled-search"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validarCamposEntradaObrigatorios(e.target.value, setErrorInputPassword, setMensagemCampoObrigatorioPassword);
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
                    helperText={mensagemCampoObrigatorioConfirmarPassword}
                    id="filled-search"
                    value={confirmarPassword}
                    onChange={(e) => {
                      setConfirmarPassword(e.target.value);
                      validarCamposEntradaObrigatorios(e.target.value, setErrorInputConfirmarPassword, setMensagemCampoObrigatorioConfirmarPassword);
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
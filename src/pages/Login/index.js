import React, { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// import { Link } from "react-router-dom";

// import api from "../../services/api";

import ImgLogo from '../../assets/images/Imagem1.png';

import "./styles.css";

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                    id="filled-search"
                    value={values.email}
                    onChange={handleChange('email')}
                    label="E-mail"
                    type="email"
                    variant="filled"
                    color="warning"
                    size="small"
                  />
                </div>

                <div className="input">
                  <FormControl color="warning" sx={{ m: 0, width: '550px', }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Sua senha</InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </Box>
            </div>

            <div className="elementos-alinhados-esquerda" id="opcoes-links">
              <p>
                <a href="#">Esqueceu sua senha?</a><br />
                <a href="#">Acesse com seu token de membro!</a>
              </p>
            </div>

            <div className="elementos-centralizados" id="botao-login">
              <button className="btn btn-warning botao-personalizado">
                LOGIN
              </button>
            </div>

            <div className="elementos-alinhados-esquerda" id="link-criar-conta">
              <p>
                Não tem conta? <a href="#">Crie a sua aqui!</a>
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
import React from "react";
// import { Link } from "react-router-dom";

// import api from "../../services/api";

import ImgLogo from '../../assets/images/Imagem1.png';

import "./styles.css";

function Login() {
  return (
    <div id="page-login">
      <div className="row">
        <div className="col mt-5">
          <div className="container">
            <div className="texto-centralizado">
              <h2>Seja bem vindo!</h2>
            </div>
            <div className="texto-centralizado">
              <h4>Faça seu Login</h4>
            </div>
          </div>

          <div className="container mt-5">
            <form
              class="row g-3 pb-4 needs-validation"
            >

              <div class="col-12">
                <label for="username" class="form-label">Email</label>
                <input
                  name="username"
                  class="form-control border border-dark"
                  placeholder="exemplo@exemplo.com"
                />
              </div>

              <div class="col-12">
                <label for="password" class="form-label mt-4">Senha</label>
                <input
                  type="password"
                  name="password"
                  class="form-control border border-dark"
                  placeholder="Senha"
                />
              </div>

              <div className="container mt-4">
                <p>
                  <a href="#">Esqueceu sua senha?</a><br />
                  <a href="#">Acesse com seu token de membro!</a>
                </p>
              </div>

              <button
                class="btn btn-warning botao"
              >
                LOGIN
              </button>

              <div className="container mt-4 mb-5">
                <p>
                  Não tem conta? <a href="#">Crie a sua aqui!</a>
                </p>
              </div>
            </form>

          </div>
        </div>

        <div id="logo-img" className="col bg-warning">
          <img id="logo-img" src={ImgLogo} alt="Ideia" />
        </div>
      </div>
    </div>
  );
}

export default Login;
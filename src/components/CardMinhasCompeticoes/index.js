import React from "react";

import Lixo from '../../assets/images/lixo.svg';
import Entrar from '../../assets/images/entrar.svg';
import '../../assets/styles/global.css';

function CardMinhasCompeticoes() {
  return (
    <div id="component-cardCompeticao">
      <div className="card border border-warning tamanho-card-personalizado">
        <div className="card-header bg-warning">
          <h5 className="card-title fw-bold">PITCH DO IF</h5>
          <h6 className="card-subtitle">21/12/2021 - 27/12/2021</h6>
        </div>
        <div className="card-body">
          <div className="justify-content-center text-center border border-danger mb-5">
            <h6 className="text-danger m-0">COMPETIDOR</h6>
          </div>
          <div className="navbar p-0">
            <h6 className="text-danger fw-bold m-0">AQUECIMENTO</h6>
            <div>
              <a href="#">
                <img
                  src={Entrar}
                  alt="lixo"
                  className="img-fluid"
                  width="20"
                  height="20" />
              </a>
              <a href="#">
                <img
                  src={Lixo}
                  alt="lixo"
                  className="img-fluid"
                  width="20"
                  height="20" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMinhasCompeticoes;
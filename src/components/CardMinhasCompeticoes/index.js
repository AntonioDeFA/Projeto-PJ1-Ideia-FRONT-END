import React from "react";

import Lixo from '../../assets/images/lixo.svg';
import Entrar from '../../assets/images/entrar.svg';
import Editar from '../../assets/images/editar.svg';

import '../../assets/styles/global.css';
import "./styles.css";
import { RotateLeft } from "@mui/icons-material";

function CardMinhasCompeticoes(props) {

  const handlePapelUsuario = () => {
    let element = null;

    if (props.userRole === 'ORGANIZADOR') {
      element =
        <div className="justify-content-center text-center border border-success mb-5">
          <h6 className="text-success m-0">ORGANIZADOR</h6>
        </div>;

    } else if (props.userRole === 'COMPETIDOR') {
      element =
        <div className="justify-content-center text-center border border-danger mb-5">
          <h6 className="text-danger m-0">COMPETIDOR</h6>
        </div>;
    }

    return element;
  }

  const handleEtapaCompeticao = () => {
    let element = null

    if (props.etapaAtual === "AQUECIMENTO") {
      element = <h6 className="text-danger fw-bold m-0">AQUECIMENTO</h6>;
    } else if (props.etapaAtual === "IMERSÃO") {
      element = <h6 className="text-primary fw-bold m-0">IMERSÃO</h6>;
    } else if (props.etapaAtual === "PITCH") {
      element = <h6 className="text-warning fw-bold m-0">PITCH</h6>;
    } else if (props.etapaAtual === "ENCERRADA") {
      element = <h6 className="text-secondary fw-bold m-0">ENCERRADA</h6>;
    }

    return element;
  }

  const iconEditarCompeticao = () => {
    if (props.userRole === 'ORGANIZADOR') {
      return (
        <a href="#">
          <img
            src={Editar}
            alt="editar"
            className="img-fluid"
            width="20"
            height="20" />
        </a>
      );
    }
  }

  return (
    <div id="component-cardCompeticao" className="me-5 margem-personalizada-card">
      <div className="card border border-warning tamanho-card-personalizado">

        <div className="card-header bg-warning">
          <h5 className="card-title fw-bold">PITCH DO IF</h5>
          <h6 className="card-subtitle">21/12/2021 - 27/12/2021</h6>
        </div>

        <div className="card-body">
          {handlePapelUsuario()}

          <div className="navbar p-0 etapa-atual">
            {handleEtapaCompeticao()}

            <div>
              {iconEditarCompeticao()}
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
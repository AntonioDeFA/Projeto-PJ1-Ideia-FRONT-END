import React from "react";

import Lixo from '../../assets/images/lixo.svg';
import Entrar from '../../assets/images/entrar.svg';
import Editar from '../../assets/images/Editar.svg';

import '../../assets/styles/global.css';
import "./styles.css";

function CardMinhasCompeticoes(props) {

  let dataInicio = props.card.etapa.dataInicio;
  let dataTermino = props.card.etapa.dataTermino;

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
    let element = null;
    let tipoEtapa = props.card.etapa.tipoEtapa;

    switch (tipoEtapa) {
      case "AQUECIMENTO":
        element = <h6 className="text-danger fw-bold m-0">AQUECIMENTO</h6>;
        break;
      case "IMERSAO":
        element = <h6 className="text-primary fw-bold m-0">IMERSAO</h6>;
        break;
      case "PITCH":
        element = <h6 className="text-warning fw-bold m-0">PITCH</h6>;
        break;
      case "ENCERRADA":
        element = <h6 className="text-secondary fw-bold m-0">ENCERRADA</h6>;
        break;
      default:
        element = <h6 className="fw-bold m-0">Etapa não especificada</h6>;
        break;
    }

    return element;
  }

  const iconEditarCompeticao = () => {
    if (props.userRole === 'ORGANIZADOR') {
      return (
        <a href="google.com">
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
          <h5 className="card-title fw-bold">{props.card.nomeCompeticao}</h5>
          <h6 className="card-subtitle">{dataInicio[2]}/{dataInicio[1]}/{dataInicio[0]} - {dataTermino[2]}/{dataTermino[1]}/{dataTermino[0]}</h6>
        </div>

        <div className="card-body">
          {handlePapelUsuario()}

          <div className="navbar p-0 etapa-atual">
            {handleEtapaCompeticao()}

            <div>
              {iconEditarCompeticao()}
              <a href="google.com">
                <img
                  src={Entrar}
                  alt="lixo"
                  className="img-fluid"
                  width="20"
                  height="20" />
              </a>
              <a href="google.com">
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
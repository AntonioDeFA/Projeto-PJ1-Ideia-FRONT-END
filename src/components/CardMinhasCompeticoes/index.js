import React from "react";

import "../../assets/styles/global.css";
import "./styles.css";

function CardMinhasCompeticoes(props) {
  let dataInicio = props.card.etapaVigente.dataInicio;
  let dataTermino = props.card.etapaVigente.dataTermino;

  const handlePapelUsuario = () => {
    let element = null;

    if (props.card.papelUsuario === "ORGANIZADOR") {
      element = (
        <div className="justify-content-center text-center border border-success mb-5">
          <h6 className="text-success m-0">ORGANIZADOR</h6>
        </div>
      );
    } else if (props.card.papelUsuario === "COMPETIDOR") {
      element = (
        <div className="justify-content-center text-center border border-danger mb-5">
          <h6 className="text-danger m-0">COMPETIDOR</h6>
        </div>
      );
    } else if (props.card.papelUsuario === "CONSULTOR") {
      element = (
        <div className="justify-content-center text-center border border-primary mb-5">
          <h6 className="text-primary m-0">CONSULTOR</h6>
        </div>
      );
    } else if (props.card.papelUsuario === "AVALIADOR") {
      element = (
        <div className="justify-content-center text-center border border-warning mb-5">
          <h6 className="text-warning m-0">AVALIADOR</h6>
        </div>
      );
    }

    return element;
  };

  const handleEtapaCompeticao = () => {
    let element = null;
    let tipoEtapa = props.card.etapaVigente.tipoEtapa;

    switch (tipoEtapa) {
      case "INSCRICAO":
        element = <h6 className="text-success fw-bold m-0">INSCRIÇÃO</h6>;
        break;
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
  };

  return (
    <div
      id="component-cardCompeticao"
      className="me-5 margem-personalizada-card"
    >
      <div className="card border border-warning tamanho-card-personalizado">
        <div className="card-header bg-warning">
          <h5 className="card-title fw-bold">{props.card.nomeCompeticao}</h5>
          <div
            className={
              props.card.nomeCompeticao.length <= 15
                ? "datas-etapa-bottom"
                : null
            }
          >
            <h6 className="card-subtitle">
              {dataInicio[2]}/{dataInicio[1]}/{dataInicio[0]} - {dataTermino[2]}
              /{dataTermino[1]}/{dataTermino[0]}
            </h6>
          </div>
        </div>

        <div className="card-body">
          {handlePapelUsuario()}

          <div className="navbar p-0 etapa-atual">
            {handleEtapaCompeticao()}

            <div id="icons">
              {props.card.papelUsuario === "ORGANIZADOR" ? (
                <i className="fa-solid fa-pen-to-square hover-azul"></i>
              ) : null}

              <i
                onClick={null}
                className="fa-solid fa-arrow-right-to-bracket hover-azul"
              ></i>
              <i onClick={null} className="fa-solid fa-trash-can"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMinhasCompeticoes;

import React from "react";
import { Link } from "react-router-dom";

import "../../assets/styles/global.css";
import Botao from "../Botao";
import "./styles.css";

function CardCompeticao(props) {
  let dataInicio = props.card.etapaVigente.dataInicio;
  let dataTermino = props.card.etapaVigente.dataTermino;

  const handleEquipesInscritas = () => {
    let totalEquipesInscritas = props.card.quantidadeDeEquipes;
    if (totalEquipesInscritas === 0) {
      return "Não há equipes inscritas";
    } else if (totalEquipesInscritas === 1) {
      return "1 equipe inscrita";
    } else {
      return `${totalEquipesInscritas} equipes inscritas`;
    }
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
          <div className="text-center">
            {props.card.dominioCompeticao ? (
              <p>
                Para quem possui o domínio <br /> {props.card.dominioCompeticao}
              </p>
            ) : (
              <p>Não há domínio especificado</p>
            )}

            <p>{handleEquipesInscritas()}</p>
          </div>
          <div
            className={
              props.card.dominioCompeticao ? "text-end" : "text-end pt-4"
            }
          >
            <Link to={`/cadastro-equipe/${props.card.id}`}>
              <Botao
                titulo="inscrever"
                classes="btn btn-warning botao-menor-personalizado"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCompeticao;

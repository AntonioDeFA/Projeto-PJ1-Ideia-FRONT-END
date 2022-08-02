import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "./../../services/api";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragemAvaliacaoConsultoria from "./../../components/AsideFiltragemAvaliacaoConsultoria/index";

import "./styles.css";

function ListagemAvaliacao() {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);

  const [pitches, setPitches] = useState([]);

  const filtrarEquipesPorCompeticao = (idCompeticao) => {
    console.log(`Filtrando equipes pela competição ${idCompeticao}`);
  };

  useEffect(() => {
    setPitches([
      { id: 1, nomeEquipe: "teste" },
      { id: 2, nomeEquipe: "teste" },
      { id: 3, nomeEquipe: "teste" },
      { id: 4, nomeEquipe: "teste" },
      { id: 5, nomeEquipe: "teste" },
      { id: 6, nomeEquipe: "teste" },
      { id: 7, nomeEquipe: "teste" },
      { id: 8, nomeEquipe: "teste" },
    ]);
  }, [token]);

  return (
    <div id="pagina-feedbacks-lean-canvas">
      <DefaultHeader iconeDestaque="avaliador" />

      <div id="aside-feedbacks-lean-canvas-componente">
        <AsideFiltragemAvaliacaoConsultoria
          papelUsuario="AVALIADOR"
          filtrarEquipesPorCompeticao={filtrarEquipesPorCompeticao}
        />
      </div>

      <div id="pitches-para-serem-avaliados">
        <div style={{ marginLeft: "390px", marginTop: "30px" }}>
          <h2 id="nome-pagina">Olá, avaliador!</h2>
        </div>
        <div>
          <h5
            style={{ marginLeft: "393px" }}
            className="mb-3"
            id="saudacao-parte-1"
          >
            Lhe foram enviados esses pitches para serem avaliados. Dê uma olhada
            e devolva-os com notas e feedbacks!
          </h5>
        </div>
      </div>

      <div id="lista-pitches-div">
        <ul className="lista-pitches">
          {pitches.map((pitch, index) => {
            return (
              <li key={pitch.id} className="item-list-pitch">
                <div className="pitch">
                  <div id="nome-competicao-pitch">
                    <h5 className="nome-competicao-pitch-h4">
                      Equipe {pitch.nomeEquipe}
                    </h5>
                  </div>
                  <div
                    className="elementos-centralizados cursor-pointer"
                    id={"btn-acessar-lean-canvas" + index}
                  >
                    <i className="icone-pitch fa-solid fa-arrow-right-to-bracket hover-azul"
                    onClick={() => {
                      navigate(
                        `/avaliar-equipe/${pitch.id}`
                      );
                    }}></i>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ListagemAvaliacao;

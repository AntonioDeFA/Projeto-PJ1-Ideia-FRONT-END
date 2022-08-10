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
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/${idCompeticao}/equipes/para-avaliacao`)
      .then((response) => {
        setPitches(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    filtrarEquipesPorCompeticao(0);
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
          {pitches.length > 0 ? (
            <h5
              id="saudacao-parte-1"
              style={{ marginLeft: "393px" }}
              className="mb-3"
            >
              Lhe foram enviados esses pitches para serem avaliados. Dê uma
              olhada e devolva-os com notas e feedbacks!
            </h5>
          ) : (
            <h5 style={{ marginLeft: "393px" }} className="mb-3">
              Você ainda não possui nenhum pitch disponível para avaliação.
            </h5>
          )}
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
                    <i
                      className="icone-pitch fa-solid fa-arrow-right-to-bracket hover-azul"
                      onClick={() => {
                        navigate(`/avaliar-equipe/${pitch.idEquipe}`);
                      }}
                    ></i>
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

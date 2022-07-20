import React, { useContext, useEffect } from "react";

import api from "./../../services/api";
import StoreContext from "./../../store/context";
import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragemAvaliacaoConsultoria from "./../../components/AsideFiltragemAvaliacaoConsultoria/index";

import "./styles.css";

function ListagemAvaliacao() {
  const { token } = useContext(StoreContext);

  useEffect(() => {}, [token]);

  return (
    <div id="pagina-feedbacks-lean-canvas">
      <DefaultHeader iconeDestaque="avaliador" />

      <div id="aside-feedbacks-lean-canvas-componente">
        <AsideFiltragemAvaliacaoConsultoria papelUsuario="AVALIADOR" />
      </div>

      {/* TODO trocar ID dessa div*/}
      <div id="dados-lean-canvas-para-leitura">
        <div style={{ marginLeft: "390px", marginTop: "30px" }}>
          <h2 id="nome-pagina">Olá, avaliador!</h2>
        </div>
        <div>
          <h5
            style={{ marginLeft: "390px" }}
            className="mb-5"
            id="saudacao-parte-1"
          >
            Lhe foram enviados esses pitches para serem avaliados. Dê uma olhada
            e devolva-os com notas e feedbacks!
          </h5>
        </div>
      </div>
    </div>
  );
}

export default ListagemAvaliacao;

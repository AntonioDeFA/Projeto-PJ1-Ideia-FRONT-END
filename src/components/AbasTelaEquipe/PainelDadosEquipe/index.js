import React, { useContext, useEffect, useState } from "react";

import api from "../../../services/api";
import { MSG000 } from "../../../utils/mensagens";
import StoreContext from "../../../store/context";
import { formatarData } from "../../../services/utils";

import "./styles.css";

function PainelDadosEquipe(props) {
  const [equipe, setEquipe] = useState(null);
  const [nome, setNome] = useState(MSG000);
  const [dataInscricao, setDataInscricao] = useState(MSG000);

  const { token } = useContext(StoreContext);

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/equipe/dados/${props.id}`).then((response) => {
      setEquipe(response.data);
      setNome(response.data.nomeEquipe);
      setDataInscricao(
        formatarData(response.data.dataInscricao).toLocaleDateString()
      );
    });
  }, [props.id]);

  return (
    <div
      id="painel-dados-equipe"
      className="d-flex justify-content-between p-3 pt-4 pb-5 bg-white"
    >
      <div id="id-dados-da-equipe">
        <h5 className="mb-5">Equipe</h5>

        <h6>Nome da equipe</h6>
        <input
          type="text"
          defaultValue={nome}
          className="border border-2 rounded input-cadastro-competicao"
        />
        <h6>Token</h6>
        <input
          type="text"
          value={equipe?.token}
          className="border border-2 rounded input-cadastro-competicao"
          disabled
        />
        <h6>Data de inscrição</h6>
        <input
          type="text"
          value={dataInscricao}
          className="border border-2 rounded"
          disabled
        />
      </div>

      <div id="tabela-membros-equipe-div">
        <h5 className="mb-5">Membros da equipe</h5>
      </div>
    </div>
  );
}

export default PainelDadosEquipe;

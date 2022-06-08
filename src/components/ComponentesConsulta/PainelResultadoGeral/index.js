import React, { useContext, useEffect, useState } from "react";

import { List, ListItem } from "@mui/material";

import api from "../../../services/api";
import StoreContext from "../../../store/context";

import "./styles.css";

function PainelResultadoGeral(props) {
  const { token } = useContext(StoreContext);

  const [resultados, setResultados] = useState([]);

  const buscarResultados = () => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get(`/competicao/resultados-gerais/${props.id}`).then((response) => {
      setResultados(response.data);
    });
  };

  useEffect(() => {
    buscarResultados();
  }, [props.id]);

  return (
    <div id="id-painel-resultado-geral">
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 420,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {resultados.map((resultado, index) => (
          <li key={index} className="rounded mb-3 p-2 borda-laranja">
            <ul>
              <li
                className="d-flex justify-content-between align-items-center mt-2 mb-2 p-2 w-100"
                id="resultado-geral"
              >
                <h6 style={{ fontWeight: "bolder" }}>{index + 1}°</h6>
                <h6>{resultado.nome}</h6>
                <h6>
                  {" "}
                  <strong>{resultado.notaAtribuida}</strong> /
                  {resultado.notaMaximaCompeticao}
                </h6>
              </li>
            </ul>
          </li>
        ))}
      </List>
    </div>
  );
}

export default PainelResultadoGeral;

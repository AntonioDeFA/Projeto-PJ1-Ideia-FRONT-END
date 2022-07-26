import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { List } from "@mui/material";

import api from "../../../services/api";
import StoreContext from "../../../store/context";
import { formatarDataEHora } from "../../../services/utils";

import "./styles.css";

function VersoesLeanCanvas(props) {
  const [versoes, setVersoes] = useState([]);

  const { token } = useContext(StoreContext);

  useEffect(() => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(`/${props.idEquipe}/lean-canvas/aprovados-consultoria`)
      .then((response) => {
        setVersoes(response.data);
      });
  }, [props.idEquipe]);

  return (
    <div id="versoes-lean-canvas">
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
        {versoes.map((versao, index) => (
          <li key={index} className="rounded mb-3 p-2 borda-laranja">
            <ul>
              <li
                className="d-flex justify-content-between align-items-center mt-2 mb-2 p-2 w-100"
                id="versao-acesso-lista"
              >
                <i
                  className="fa-brands fa-trello"
                  style={{ color: "#fc7a00", fontSize: "20pt" }}
                ></i>

                <h6 style={{ margin: 0 }}>
                  {formatarDataEHora(versao.dataHoraAprovacao)}
                </h6>
                <Link
                  to={`/equipe/${props.idEquipe}/${props.papelUsuario}/feedbacks-lean-canvas/${versao.idLeanCanvas}`}
                >
                  <i
                    className="fa-solid fa-arrow-right-to-bracket hover-azul"
                    style={{ fontSize: "20pt" }}
                  ></i>
                </Link>
              </li>
            </ul>
          </li>
        ))}
      </List>
    </div>
  );
}

export default VersoesLeanCanvas;

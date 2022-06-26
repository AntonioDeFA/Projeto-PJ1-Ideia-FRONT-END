import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { List } from "@mui/material";

import "./styles.css";

function VersoesLeanCanvas(props) {
  const [versoes, setVersoes] = useState([]);

  useEffect(() => {
    // api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    // api.get(`/${props.idEquipe}/lean-canvas/aprovados-consultoria`).then((response) => {
    //   setResultados(response.data);
    // });

    setVersoes([
      {
        idLeanCanvas: 1,
        dataHoraAprovacao: "10/10/1010 - 10:10",
      },
      {
        idLeanCanvas: 2,
        dataHoraAprovacao: "20/20/2020 - 20:20",
      },
      {
        idLeanCanvas: 3,
        dataHoraAprovacao: "30/30/3030 - 30:30",
      },
      {
        idLeanCanvas: 4,
        dataHoraAprovacao: "40/40/4040 - 40:40",
      },
      {
        idLeanCanvas: 5,
        dataHoraAprovacao: "50/50/5050 - 50:50",
      },
      {
        idLeanCanvas: 6,
        dataHoraAprovacao: "60/60/6060 - 60:60",
      },
      {
        idLeanCanvas: 7,
        dataHoraAprovacao: "70/70/7070 - 70:70",
      },
    ]);
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

                <h6 style={{ margin: 0 }}>Data: {versao.dataHoraAprovacao}</h6>
                <Link to={`/`}>
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

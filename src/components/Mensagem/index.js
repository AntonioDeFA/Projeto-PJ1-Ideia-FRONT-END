import React from "react";
import "./styles.css";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

import { MSG005, MSG006, MSG008 } from "./../../utils/mensagens";

import { Box } from "@mui/material";

function Mensagem(props) {
  const handleTitulo = () => {
    let titulo;
    let tipoMensagem = props.tipoMensagem;

    if (tipoMensagem === MSG005) {
      titulo = "Sucesso!";
    } else if (tipoMensagem === MSG006) {
      titulo = "Houve um erro!";
    } else if (tipoMensagem === MSG008) {
      titulo = "Aguarde...";
    }

    return titulo;
  };

  return (
    <div id="componente-mensagem" className={props.tipoMensagem + " mensagem"}>
      <Alert variant="outlined" severity={props.tipoMensagem}>
        <AlertTitle>{handleTitulo()}</AlertTitle>
        <Box sx={{ display: "flex" }}>
          {props.tipoMensagem === MSG008 ? <CircularProgress /> : null}
          <p>{props.mensagem}</p>
        </Box>
      </Alert>
    </div>
  );
}
export default Mensagem;

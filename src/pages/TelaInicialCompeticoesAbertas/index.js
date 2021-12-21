import React from "react";
import Grid from '@mui/material/Grid';

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from "../../components/AsideFiltragem";
import CardItemList from "../../components/CardItemList";

// import { Link } from "react-router-dom";

// import api from "../../services/api";

import "./styles.css";

function TelaInicialCompeticoesAbertas() {
  return (
    <div>
      <DefaultHeader />
      <Grid container >
        <AsideFiltragem
          isCompeticoesAbertas="true"
        />
        <CardItemList />
      </Grid>
    </div>
  );
}

export default TelaInicialCompeticoesAbertas;
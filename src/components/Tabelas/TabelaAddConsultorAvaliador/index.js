import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import "./styles.css";

function TabelaAddConsultorAvaliador() {
  const [value, setValue] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const defaultProps = {
    options: usuarios,
    getOptionLabel: (usuario) => usuario.nome,
  };

  useEffect(() => {
    setUsuarios([
      {
        nome: "Nycolas Ramon Alves da Silva",
        email: "nycolas.ramon@academico.ifpb.edu.br",
        id: 1,
      },
      {
        nome: "Antonio de Farias Amorim",
        email: "antonio.amorim@academico.ifpb.edu.br",
        id: 2,
      },
      {
        nome: "José Gabriel da Silva Lima",
        email: "ze.lima@academico.ifpb.edu.br",
        id: 3,
      },
      {
        nome: "Gabryel Alexandre",
        email: "gabryel.alex@academico.ifpb.edu.br",
        id: 4,
      },
    ]);
  }, []);

  return (
    <div id="tabela-add-consultor-avaliador">
      <Autocomplete
        {...defaultProps}
        sx={{ width: 470 }}
        id="controlled-demo"
        value={value}
        isOptionEqualToValue={(usuario, value) => usuario.email === value.email}
        onChange={(event, novoUsuario) => {
          setValue(novoUsuario);
          console.log(novoUsuario);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar usuários"
            color="warning"
            variant="filled"
          />
        )}
      />
    </div>
  );
}

export default TabelaAddConsultorAvaliador;

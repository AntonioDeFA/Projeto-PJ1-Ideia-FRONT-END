import { Autocomplete, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import api from "./../../../services/api";
import StoreContext from "./../../../store/context";

import "./styles.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fc7a00",
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(email, icone, statusConvite) {
  return { email, icone, statusConvite };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TabelaAddConsultorAvaliador(props) {
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const { token } = useContext(StoreContext);

  const defaultProps = {
    options: usuarios,
    getOptionLabel: (usuario) => usuario.nome,
  };

  const handleStatusConvite = (status) => {
    if (status === "convidado") {
      return <p className="text-warning fw-bold m-0">convidado</p>;
    } else if (status === "aceito") {
      return <p className="text-success fw-bold m-0">aceito</p>;
    }
  };

  useEffect(() => {
    if (props.idCompeticao) {
      api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
      api
        .get(`/competicao/${props.idCompeticao}/usuarios-nao-relacionados`)
        .then((response) => {
          const { data } = response;
          setUsuarios(data);
        });
    } else {
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

      setRows([
        createData("nycolas.ramon@academico.ifpb.edu.br", null, "convidado"),
        createData("antonio@gmail.com", null, "aceito"),
        createData("gabryel@hotmail.com.br", null, "convidado"),
        createData("gabriel.jose@hotmail.com.br", null, "aceito"),
        createData("nunes.mateus@hotmail.com.br", null, "convidado"),
      ]);
    }
  }, []);

  return (
    <div id="tabela-add-consultor-avaliador">
      <Autocomplete
        {...defaultProps}
        sx={{ width: 503 }}
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

      <div id="tabela-usuarios" className="mt-3">
        <TableContainer component={Paper}>
          <Table sx={{ width: 470, height: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Convidar</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.email}>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.icone}</StyledTableCell>
                  <StyledTableCell align="left">
                    {handleStatusConvite(row.statusConvite)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default TabelaAddConsultorAvaliador;

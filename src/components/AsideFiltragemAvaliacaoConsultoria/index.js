import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {
  Snackbar,
  Alert,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

import Botao from "../Botao";
import StoreContext from "../../store/context";
import { mesesDoAno } from "../../utils/constantes";
import { StyledTableRow, StyledTableCell } from "./../../utils/constantes";

import "./styles.css";

function AsideFiltragemAvaliacaoConsultoria(props) {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [nomeCompeticaoFiltragem, setNomeCompeticaoFiltragem] = useState("");
  const [mesDoAno, setMesDoAno] = useState("");
  const [anoFiltragem, setAnoFiltragem] = useState("");

  const [rows, setRows] = useState([]);

  const realizarFiltragem = (event) => {
    event.preventDefault();
    props.realizarFiltragem(nomeCompeticaoFiltragem, mesDoAno, anoFiltragem);
  };

  const acessarCompeticao = (idCompeticao) => {
    navigate(`/dados-competicao/${idCompeticao}/${props.papelUsuario}`);
  };

  useEffect(() => {
    setRows([{ idCompeticao: 1, nomeCompeticao: "Teste" }]);
  }, [token]);

  return (
    <div className="aside-filtragem-tela-consultoria-avaliacao">
      <div className="elementos-centralizados" id="titulo-competicoes">
        <h1 className="titulos-principais">Competições</h1>
      </div>

      <div className="form-filtragem">
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "34ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              value={nomeCompeticaoFiltragem}
              onChange={(e) => {
                setNomeCompeticaoFiltragem(e.target.value);
              }}
              id="filled-search"
              label="Buscar"
              type="search"
              variant="filled"
              color="warning"
              size="small"
            />

            <div className="margem-personalizada">
              <Botao
                titulo="filtrar"
                classes="btn btn-warning botao-menor-personalizado"
                onClick={realizarFiltragem}
              />
            </div>

            <div
              id="id-tabela-competicoes"
              className="mt-3 margem-personalizada"
              style={{ width: "94%" }}
            >
              <TableContainer component={Paper}>
                <Table
                  sx={{ height: 300, overflowY: "auto" }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">
                        Competição
                      </StyledTableCell>
                      <StyledTableCell align="center">Acessar</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.idCompeticao}>
                        <StyledTableCell align="center">
                          <p className="text-break m-0">{row.nomeCompeticao}</p>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <i
                            onClick={() => {
                              acessarCompeticao(row.idCompeticao);
                            }}
                            className="fa-solid fa-arrow-right-to-bracket hover-azul cursor-pointer"
                          ></i>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default AsideFiltragemAvaliacaoConsultoria;

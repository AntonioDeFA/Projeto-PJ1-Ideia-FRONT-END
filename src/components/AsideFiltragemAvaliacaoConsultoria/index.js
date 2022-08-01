import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

import api from "./../../services/api";
import Botao from "../Botao";
import { MSG000, MSG060, MSG061 } from "./../../utils/mensagens";
import StoreContext from "../../store/context";
import { StyledTableRow, StyledTableCell } from "./../../utils/constantes";

import { validarCamposObrigatorios } from "../../services/utils";

import "./styles.css";

function AsideFiltragemAvaliacaoConsultoria(props) {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [nomeCompeticaoFiltragem, setNomeCompeticaoFiltragem] =
    useState(MSG000);
  const [errorNomeCompeticao, setErrorNomeCompeticao] = useState(false);
  const [mensagemNomeCompeticao, setMensagemNomeCompeticao] = useState(MSG000);

  const [rows, setRows] = useState([]);

  const [houveFiltragem, setHouveFiltragem] = useState(false);

  const acessarCompeticao = (idCompeticao) => {
    navigate(
      `/dados-competicao/${idCompeticao}/${props.papelUsuario}/listagem-${
        props.papelUsuario === "CONSULTOR" ? "consultoria" : "avaliacao"
      }`
    );
  };

  const consultarCompeticoes = (nomeCompeticao = "ALL") => {
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api
      .get(
        `/competicoes/usuario-logado/${nomeCompeticao}/${
          props.papelUsuario === "CONSULTOR" ? "IMERSAO" : "PITCH"
        }`
      )
      .then((response) => {
        setRows(response.data.map((competicao) => competicao));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const filtrarCompeticoesPorNome = () => {
    let statusNome = validarCamposObrigatorios(
      nomeCompeticaoFiltragem,
      setErrorNomeCompeticao,
      setMensagemNomeCompeticao
    );

    if (statusNome) {
      setHouveFiltragem(true);
      consultarCompeticoes(nomeCompeticaoFiltragem);
    }
  };

  useEffect(() => {
    consultarCompeticoes();
  }, [token]);

  return (
    <div className="aside-filtragem-tela-consultoria-avaliacao">
      <div className="elementos-centralizados" id="titulo-competicoes">
        <h1 className="titulos-principais">Competições</h1>
      </div>

      <div className="form-filtragem">
        <div>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "34ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              value={nomeCompeticaoFiltragem}
              error={errorNomeCompeticao}
              helperText={mensagemNomeCompeticao}
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
                onClick={filtrarCompeticoesPorNome}
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
                  {rows.length > 0 ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            Competição
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Ações
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {rows.map((row) => (
                          <StyledTableRow key={row.idCompeticao}>
                            <StyledTableCell align="center">
                              {row.nomeCompeticao}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <i
                                title="Acessar esta competição"
                                className="fa-solid fa-arrow-right-to-bracket hover-azul cursor-pointer"
                                onClick={() => {
                                  acessarCompeticao(row.idCompeticao);
                                }}
                              ></i>
                              <i
                                title="Ver equipes desta competição"
                                className="fa-solid fa-arrow-up-right-from-square hover-azul cursor-pointer"
                                onClick={() => {
                                  props.filtrarEquipesPorCompeticao(
                                    row.idCompeticao
                                  );
                                }}
                              ></i>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </>
                  ) : (
                    <StyledTableRow key={0}>
                      <StyledTableCell
                        align="center"
                        sx={{ width: "150% !important" }}
                      >
                        <p className="m-3">
                          {houveFiltragem ? MSG060 : MSG061}
                        </p>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
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

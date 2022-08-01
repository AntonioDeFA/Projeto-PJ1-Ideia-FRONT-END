import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import Botao from "../Botao";
import { mesesDoAno } from "../../utils/constantes";

import "./styles.css";

function AsideFiltragem(props) {
  const [nomeCompeticaoFiltragem, setNomeCompeticaoFiltragem] = useState("");
  const [mesDoAno, setMesDoAno] = useState("");
  const [anoFiltragem, setAnoFiltragem] = useState("");

  const [opcaoCompeticoes, setOpcaoCompeticoes] = useState("abertas");

  const [etapasFiltragem, setEtapasFiltragem] = useState([]);

  const [checkboxElaboracao, setCheckboxElaboracao] = useState(false);
  const [checkboxNaoIniciada, setCheckboxNaoIniciada] = useState(false);
  const [checkboxInscricao, setCheckboxInscricao] = useState(false);
  const [checkboxAquecimento, setCheckboxAquecimento] = useState(false);
  const [checkboxImersao, setCheckboxImersao] = useState(false);
  const [checkboxPitch, setCheckboxPitch] = useState(false);
  const [checkboxEncerrada, setCheckboxEncerrada] = useState(false);
  const [hasCheckboxes, setHasCheckBoxes] = useState(false);
  const [etapasSelecionadas] = useState([]);

  const rdButtonCompeticoesAbertas = useRef(null);
  const rdButtonMinhasCompeticoes = useRef(null);

  const handleRadioButtonsCompeticoes = (event = null) => {
    setOpcaoCompeticoes(
      event?.target?.value ? event.target.value : props.tipoCompeticoes
    );

    let isCompeticoesAbertas = event?.target?.value
      ? event?.target?.value === "abertas"
      : props.tipoCompeticoes === "abertas";

    setHasCheckBoxes(!isCompeticoesAbertas);

    props.verificarTipoCompeticoes(isCompeticoesAbertas);
  };

  const navigate = useNavigate();

  const checkboxes = () => {
    if (hasCheckboxes) {
      return (
        <div className="margem-personalizada">
          <FormGroup value={etapasFiltragem} onChange={setEtapasFiltragem}>
            <FormControlLabel
              onChange={(e) => {
                if (e.target.checked) {
                  etapasSelecionadas.push("ELABORACAO");
                } else {
                  let index = etapasSelecionadas.indexOf("ELABORACAO");
                  if (index !== -1) {
                    etapasSelecionadas.splice(index, 1);
                  }
                }
                realizarFiltragemEtapas(e, setCheckboxElaboracao, "ELABORACAO");
              }}
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FC7A00",
                    },
                  }}
                />
              }
              label="Elaboração"
              value={checkboxElaboracao}
            />

            <FormControlLabel
              onChange={(e) => {
                if (e.target.checked) {
                  etapasSelecionadas.push("NAO_INICIADA");
                } else {
                  let index = etapasSelecionadas.indexOf("NAO_INICIADA");
                  if (index !== -1) {
                    etapasSelecionadas.splice(index, 1);
                  }
                }
                realizarFiltragemEtapas(
                  e,
                  setCheckboxNaoIniciada,
                  "NAO_INICIADA"
                );
              }}
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FC7A00",
                    },
                  }}
                />
              }
              label="Não Iniciada"
              value={checkboxNaoIniciada}
            />

            <FormControlLabel
              onChange={(e) => {
                if (e.target.checked) {
                  etapasSelecionadas.push("INSCRICAO");
                } else {
                  let index = etapasSelecionadas.indexOf("INSCRICAO");
                  if (index !== -1) {
                    etapasSelecionadas.splice(index, 1);
                  }
                }
                realizarFiltragemEtapas(e, setCheckboxInscricao, "INSCRICAO");
              }}
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FC7A00",
                    },
                  }}
                />
              }
              label="Inscrição"
              value={checkboxInscricao}
            />

            <FormControlLabel
              onChange={(e) => {
                if (e.target.checked) {
                  etapasSelecionadas.push("AQUECIMENTO");
                } else {
                  let index = etapasSelecionadas.indexOf("AQUECIMENTO");
                  if (index !== -1) {
                    etapasSelecionadas.splice(index, 1);
                  }
                }
                realizarFiltragemEtapas(
                  e,
                  setCheckboxAquecimento,
                  "AQUECIMENTO"
                );
              }}
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FC7A00",
                    },
                  }}
                />
              }
              label="Aquecimento"
              value={checkboxAquecimento}
            />

            <FormControlLabel
              onChange={(e) => {
                if (e.target.checked) {
                  etapasSelecionadas.push("IMERSAO");
                } else {
                  let index = etapasSelecionadas.indexOf("IMERSAO");
                  if (index !== -1) {
                    etapasSelecionadas.splice(index, 1);
                  }
                }
                realizarFiltragemEtapas(e, setCheckboxImersao, "IMERSAO");
              }}
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FC7A00",
                    },
                  }}
                />
              }
              label="Imersão"
              value={checkboxImersao}
            />

            <FormControlLabel
              onChange={(e) => {
                if (e.target.checked) {
                  etapasSelecionadas.push("PITCH");
                } else {
                  let index = etapasSelecionadas.indexOf("PITCH");
                  if (index !== -1) {
                    etapasSelecionadas.splice(index, 1);
                  }
                }
                realizarFiltragemEtapas(e, setCheckboxPitch, "PITCH");
              }}
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FC7A00",
                    },
                  }}
                />
              }
              label="Pitch"
              value={checkboxPitch}
            />

            <FormControlLabel
              onChange={(e) => {
                if (e.target.checked) {
                  etapasSelecionadas.push("ENCERRADA");
                } else {
                  let index = etapasSelecionadas.indexOf("ENCERRADA");
                  if (index !== -1) {
                    etapasSelecionadas.splice(index, 1);
                  }
                }
                realizarFiltragemEtapas(e, setCheckboxEncerrada, "ENCERRADA");
              }}
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FC7A00",
                    },
                  }}
                />
              }
              label="Encerrada"
              value={checkboxEncerrada}
            />
          </FormGroup>
        </div>
      );
    }
  };

  const adicionar = () => {
    navigate("/cadastro-competicao");
  };

  const realizarFiltragem = (event) => {
    event.preventDefault();
    props.realizarFiltragem(
      nomeCompeticaoFiltragem,
      mesDoAno,
      anoFiltragem,
      etapasSelecionadas
    );
  };

  const realizarFiltragemEtapas = (event, setCheckbox) => {
    setCheckbox(event.target.checked);
    props.realizarFiltragem(
      nomeCompeticaoFiltragem,
      mesDoAno,
      anoFiltragem,
      etapasSelecionadas
    );
  };

  useEffect(() => {
    handleRadioButtonsCompeticoes();
  }, []);

  return (
    <div className="aside-filtragem-tela-inicial">
      <div className="elementos-centralizados" id="titulo-competicoes">
        <h1 className="titulos-principais">Competições</h1>
      </div>

      <div className="elementos-centralizados">
        <Botao
          titulo="adicionar"
          classes="btn btn-warning botao-personalizado largura-total"
          onClick={adicionar}
        />
      </div>

      <div className="form-filtragem">
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "27ch" },
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

            <TextField
              id="filled-select-mesDoAno"
              select
              label="Mês"
              value={mesDoAno}
              onChange={(e) => {
                setMesDoAno(e.target.value);
              }}
              variant="filled"
              color="warning"
              style={{ maxWidth: "13.5ch" }}
            >
              {mesesDoAno.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="filled-number"
              label="Ano"
              value={anoFiltragem}
              onChange={(e) => {
                setAnoFiltragem(e.target.value);
              }}
              type="number"
              variant="filled"
              color="warning"
              style={{ maxWidth: "13.5ch" }}
            />

            <div className="margem-personalizada">
              <Botao
                titulo="filtrar"
                classes="btn btn-warning botao-menor-personalizado"
                onClick={realizarFiltragem}
              />
            </div>
          </Box>
        </div>

        <div className="margem-personalizada" id="radio-buttons-competicoes">
          <FormControl component="fieldset">
            <RadioGroup
              name="controlled-radio-buttons-group"
              value={opcaoCompeticoes}
              onChange={handleRadioButtonsCompeticoes}
            >
              <FormControlLabel
                value="abertas"
                ref={rdButtonCompeticoesAbertas}
                control={
                  <Radio
                    sx={{
                      color: "#999",
                      "&.Mui-checked": {
                        color: "#FC7A00",
                      },
                    }}
                  />
                }
                label="Competições Abertas"
              />
              <FormControlLabel
                value="minhas-competicoes"
                ref={rdButtonMinhasCompeticoes}
                control={
                  <Radio
                    sx={{
                      color: "#999",
                      "&.Mui-checked": {
                        color: "#FC7A00",
                      },
                    }}
                  />
                }
                label="Minhas Competições"
              />
            </RadioGroup>
          </FormControl>
        </div>

        {checkboxes()}
      </div>
    </div>
  );
}

export default AsideFiltragem;

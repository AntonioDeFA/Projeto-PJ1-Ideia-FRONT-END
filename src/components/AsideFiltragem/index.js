import React, { useState, useRef } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

import "./styles.css";
import Botao from "../Botao";

const mesesDoAno = [
  {
    value: 1,
    label: "Janeiro",
  },
  {
    value: 2,
    label: "Fevereiro",
  },
  {
    value: 3,
    label: "Março",
  },
  {
    value: 4,
    label: "Abril",
  },
  {
    value: 5,
    label: "Maio",
  },
  {
    value: 6,
    label: "Junho",
  },
  {
    value: 7,
    label: "Julho",
  },
  {
    value: 8,
    label: "Agosto",
  },
  {
    value: 9,
    label: "Setembro",
  },
  {
    value: 10,
    label: "Outubro",
  },
  {
    value: 11,
    label: "Novembro",
  },
  {
    value: 12,
    label: "Dezembro",
  },
];

function AsideFiltragem(props) {
  // Dados para filtragem
  const [nomeCompeticaoFiltragem, setNomeCompeticaoFiltragem] = useState("");
  const [mesDoAno, setMesDoAno] = useState("");
  const [anoFiltragem, setAnoFiltragem] = useState("");

  const [opcaoCompeticoes, setOpcaoCompeticoes] =
    useState("competicoesAbertas");

  const [etapasFiltragem, setEtapasFiltragem] = useState([]);

  const [checkboxInscricao, setCheckboxInscricao] = useState(false);
  const [checkboxAquecimento, setCheckboxAquecimento] = useState(false);
  const [checkboxImersao, setCheckboxImersao] = useState(false);
  const [checkboxPitch, setCheckboxPitch] = useState(false);
  const [checkboxEncerrada, setCheckboxEncerrada] = useState(false);
  const [hasCheckboxes, setHasCheckBoxes] = useState(false);

  const rdButtonCompeticoesAbertas = useRef(null);
  const rdButtonMinhasCompeticoes = useRef(null);

  const handleRadioButtonsCompeticoes = (event) => {
    setOpcaoCompeticoes(event.target.value);

    let isCompeticoesAbertas = event.target.value === "competicoesAbertas";

    setHasCheckBoxes(!isCompeticoesAbertas);

    props.verificarTipoCompeticoes(isCompeticoesAbertas);
  };

  const checkboxes = () => {
    if (hasCheckboxes) {
      return (
        <div className="margem-personalizada">
          <FormGroup value={etapasFiltragem} onChange={setEtapasFiltragem}>
            <FormControlLabel
              onChange={(e) => {
                setCheckboxImersao(e.target.checked);
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
                setCheckboxAquecimento(e.target.checked);
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
                setCheckboxImersao(e.target.checked);
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
                setCheckboxPitch(e.target.checked);
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
                setCheckboxEncerrada(e.target.checked);
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
    alert("adicionar");
  };

  const realizarFiltragem = (event) => {
    event.preventDefault();
    props.realizarFiltragem(nomeCompeticaoFiltragem, mesDoAno, anoFiltragem);
  };

  return (
    <div className="aside-filtragem-tela-inicial">
      <div className="elementos-centralizados" id="titulo-competicoes">
        <h1 className="titulos-principais">Competições</h1>
      </div>

      <div className="elementos-centralizados">
        <Botao
          titulo="adicionar"
          classes="btn btn-warning botao-personalizado"
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
                value="competicoesAbertas"
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
                value="minhasCompeticoes"
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

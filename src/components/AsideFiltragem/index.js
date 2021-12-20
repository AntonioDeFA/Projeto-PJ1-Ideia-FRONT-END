import React, { useState, useRef } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import "./styles.css";

const mesesDoAno = [
  {
    value: 1,
    label: "Janeiro"
  },
  {
    value: 2,
    label: "Fevereiro"
  },
  {
    value: 3,
    label: "Março"
  },
  {
    value: 4,
    label: "Abril"
  },
  {
    value: 5,
    label: "Maio"
  },
  {
    value: 6,
    label: "Junho"
  },
  {
    value: 7,
    label: "Julho"
  },
  {
    value: 8,
    label: "Agosto"
  },
  {
    value: 9,
    label: "Setembro"
  },
  {
    value: 10,
    label: "Outubro"
  },
  {
    value: 11,
    label: "Novembro"
  },
  {
    value: 12,
    label: "Dezembro"
  }
];

function AsideFiltragem(props) {
  const [mesDoAno, setMesDoAno] = useState('');

  const [opcaoCompeticoes, setOpcaoCompeticoes] = useState('');
  const [isCompeticoesAbertas, setIsCompeticoesAbertas] = useState(false);

  const [etapasFiltragem, setEtapasFiltragem] = useState([]);

  const [checkboxAquecimento, setCheckboxAquecimento] = useState(false);
  const [checkboxImersao, setCheckboxImersao] = useState(false);
  const [checkboxPitch, setCheckboxPitch] = useState(false);
  const [checkboxEncerrada, setCheckboxEncerrada] = useState(false);

  const rdButtonCompeticoesAbertas = useRef(null);
  const rdButtonMinhasCompeticoes = useRef(null);

  const handleSelectMeses = (event) => {
    setMesDoAno(event.target.value);
    // let mesSelecionado = event.target.value;
  };

  const handleRadioButtonsCompeticoes = (event) => {
    setOpcaoCompeticoes(event.target.value);

    // let opcaoCompeticoesSelecionada = event.target.value;

    if (isCompeticoesAbertas) {
      setIsCompeticoesAbertas(true);
      console.log(rdButtonCompeticoesAbertas.current);
    } else {
      setIsCompeticoesAbertas(false);
      console.log(rdButtonMinhasCompeticoes.current);
    }
  };

  const handleCheckboxAquecimento = (event) => {
    setCheckboxAquecimento(event.target.checked);
    console.log(`Aquecimento: ${event.target.checked}`);
  };

  const handleCheckboxImersao = (event) => {
    setCheckboxImersao(event.target.checked);
    console.log(`Imersão: ${event.target.checked}`);
  };

  const handleCheckboxPitch = (event) => {
    setCheckboxPitch(event.target.checked);
    console.log(`Pitch: ${event.target.checked}`);
  };

  const handleCheckboxEncerrada = (event) => {
    setCheckboxEncerrada(event.target.checked);
    console.log(`Encerrada: ${event.target.checked}`);
  };

  const checkboxes = () => {
    if (props.hasCheckboxes) {
      return (
        <div className="margem-personalizada">
          <FormGroup
            value={etapasFiltragem}
          >

            <FormControlLabel
              onChange={handleCheckboxAquecimento}
              control={
                <Checkbox
                  sx={{
                    '&.Mui-checked': {
                      color: '#FC7A00',
                    },
                  }}
                />
              }
              label="Aquecimento"
            />

            <FormControlLabel
              onChange={handleCheckboxImersao}
              control={
                <Checkbox
                  sx=
                  {{
                    '&.Mui-checked': {
                      color: '#FC7A00',
                    },
                  }}
                />
              }
              label="Imersão"
            />

            <FormControlLabel
              onChange={handleCheckboxPitch}
              control={
                <Checkbox
                  sx={{
                    '&.Mui-checked': {
                      color: '#FC7A00',
                    },
                  }}
                />
              }
              label="Pitch"
            />

            <FormControlLabel
              onChange={handleCheckboxEncerrada}
              control={
                <Checkbox
                  sx={{
                    '&.Mui-checked': {
                      color: '#FC7A00',
                    },
                  }}
                />
              }
              label="Encerrada"
            />
          </FormGroup>

        </div>
      );
    }

  }

  return (
    <div className="aside-filtragem-tela-inicial">
      <div className="elementos-centralizados" id="titulo-competicoes">
        <h1 className="titulos-principais">Competições</h1>
      </div>

      <div className="elementos-centralizados">
        <button className="btn btn-warning botao-personalizado" id="botao-adicionar">
          adicionar
        </button>
      </div>

      <div className="form-filtragem">
        <div className="elementos-centralizados">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '27ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="filled-search"
                label="Buscar"
                type="search"
                variant="filled"
                color="warning"
                size="small"
              />
            </div>
          </Box>
        </div>

        <div className="elementos-justificados">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '13.5ch' },
            }}
            autoComplete="off"
          >
            <div>
              <TextField
                id="filled-select-mesDoAno"
                select
                label="Mês"
                value={mesDoAno}
                onChange={handleSelectMeses}
                variant="filled"
                color="warning"
                size="small"
              >
                {mesesDoAno.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                id="filled-number"
                label="Ano"
                type="number"
                variant="filled"
                color="warning"
                size="small"
              />
            </div>
          </Box>
        </div>

        <div className="margem-personalizada">
          <button className="btn btn-warning botao-menor-personalizado" id="botao-filtrar">
            filtrar
          </button>
        </div>

        <div className="margem-personalizada" id="radio-buttons-competicoes">
          <FormControl component="fieldset" >
            <RadioGroup
              name="controlled-radio-buttons-group"
              value={opcaoCompeticoes}
              onChange={handleRadioButtonsCompeticoes}
            >
              <FormControlLabel
                value="competicoesAbertas"
                ref={rdButtonCompeticoesAbertas}
                control={
                  <Radio sx={{
                    color: '#999',
                    '&.Mui-checked': {
                      color: '#FC7A00',
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
                  <Radio sx={{
                    color: '#999',
                    '&.Mui-checked': {
                      color: '#FC7A00',
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
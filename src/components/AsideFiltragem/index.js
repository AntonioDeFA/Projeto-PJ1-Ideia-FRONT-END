import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

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

function AsideFiltragem() {
  const [mesDoAno, setMesDoAno] = React.useState('');
  const [opcaoCompeticoes, setOpcaoCompeticoes] = React.useState('');

  const handleChange = (event) => {
    setMesDoAno(event.target.value);
  };

  const handleRadioButtonsCompeticoes = (event) => {
    setOpcaoCompeticoes(event.target.value);
  };

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
                onChange={handleChange}
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

        <div class="margem-personalizada">
          <button className="btn btn-warning botao-menor-personalizado" id="botao-filtrar">
            filtrar
          </button>
        </div>

        <div class="margem-personalizada" id="radio-buttons-competicoes">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={opcaoCompeticoes}
              onChange={handleRadioButtonsCompeticoes}
            >
              <FormControlLabel
                value="competicoesAbertas"
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
      </div>

    </div>
  );
}

export default AsideFiltragem;
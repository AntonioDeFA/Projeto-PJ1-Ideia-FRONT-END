import {
  MSG000,
  MSG004,
  MSG032,
  MSG033,
  MSG034,
  MSG035,
} from "../utils/mensagens";

export function validarEmail(email) {
  var re =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  return re.test(email);
}

export function handleDatas(dataInicio, dataTermino, elaboracao = false) {
  if (!elaboracao) {
    if (
      dataInicio &&
      dataInicio.length > 0 &&
      dataTermino &&
      dataTermino.length > 0
    ) {
      return `${adicionarZero(dataInicio[2])}/${adicionarZero(dataInicio[1])}/${
        dataInicio[0]
      } - ${adicionarZero(dataTermino[2])}/${adicionarZero(dataTermino[1])}/${
        dataTermino[0]
      }`;
    }
  }
}

const adicionarZero = (numero) => {
  return Number(numero) < 10 ? `0${numero}` : numero;
};

export const validarCamposObrigatorios = (
  value,
  functionSetError,
  functionSetMensagem = null
) => {
  if (value === null || value?.length === 0) {
    functionSetError(true);

    if (functionSetMensagem) {
      functionSetMensagem(MSG004);
    }
    return false;
  } else {
    functionSetError(false);

    if (functionSetMensagem) {
      functionSetMensagem(MSG000);
    }
    return true;
  }
};

export const saoDuasDatasIguais = (data1, data2) => {
  return (
    data1.getDate() === data2.getDate() &&
    data1.getMonth() === data2.getMonth() &&
    data1.getYear() === data2.getYear()
  );
};

export const isDataDefault = (dia, mes, ano) => {
  return dia === 1 && mes + 1 === 1 && ano === 2000;
};

export const formatarEtapasParaPatch = (etapas) => {
  return [
    {
      dataInicio: [
        etapas[0].dataInicio[0],
        etapas[0].dataInicio[1],
        etapas[0].dataInicio[2],
      ],
      dataTermino: [
        etapas[0].dataTermino[0],
        etapas[0].dataTermino[1],
        etapas[0].dataTermino[2],
      ],
      tipoEtapa: MSG032,
    },
    {
      dataInicio: [
        etapas[1].dataInicio[0],
        etapas[1].dataInicio[1],
        etapas[1].dataInicio[2],
      ],
      dataTermino: [
        etapas[1].dataTermino[0],
        etapas[1].dataTermino[1],
        etapas[1].dataTermino[2],
      ],
      tipoEtapa: MSG033,
    },
    {
      dataInicio: [
        etapas[2].dataInicio[0],
        etapas[2].dataInicio[1],
        etapas[2].dataInicio[2],
      ],
      dataTermino: [
        etapas[2].dataTermino[0],
        etapas[2].dataTermino[1],
        etapas[2].dataTermino[2],
      ],
      tipoEtapa: MSG034,
    },
    {
      dataInicio: [
        etapas[3].dataInicio[0],
        etapas[3].dataInicio[1],
        etapas[3].dataInicio[2],
      ],
      dataTermino: [
        etapas[3].dataTermino[0],
        etapas[3].dataTermino[1],
        etapas[3].dataTermino[2],
      ],
      tipoEtapa: MSG035,
    },
  ];
};

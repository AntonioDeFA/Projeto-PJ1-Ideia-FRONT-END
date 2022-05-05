import { MSG000, MSG004 } from "../utils/mensagens";

export function validarEmail(email) {
  var re =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  return re.test(email);
}

export function handleDatas(dataInicio, dataTermino) {
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

const adicionarZero = (numero) => {
  return Number(numero) < 10 ? `0${numero}` : numero;
};

export const validarCamposObrigatorios = (
  value,
  functionSetError,
  functionSetMensagem = null
) => {
  if (value.length === 0) {
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

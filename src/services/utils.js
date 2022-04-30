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

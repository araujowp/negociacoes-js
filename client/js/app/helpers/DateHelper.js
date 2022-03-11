class DateHelper {
  constructor() {
    throw new Error("DataHelper não pode ser instanciada");
  }

  static toTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  static toData(texto) {

    if(!/\d{4}-\d{2}-\d{2}/.test(texto))
    throw new Error('Deve estar no formato aaaa-mm-dd');
    
    return new Date(
      ...texto.split("-").map((item, indice) => item - (indice % 2))
    );
  }
}

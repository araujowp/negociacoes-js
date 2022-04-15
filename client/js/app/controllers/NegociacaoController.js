class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    let self = this;

    this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

        get(target, prop, receiver) {

            if(['adiciona', 'limparNegociacoes'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

                return function(){

                  console.log(`método '${prop}' interceptado`);

                Reflect.apply(target[prop], target, arguments);

                  self._negociacoesView.update(target);

                }
        }

        return Reflect.get(target, prop, receiver);
      }
    });

    // this._listaNegociacoes = new ListaNegociacoes(model =>
    //   this._negociacoesView.update(model));

    this._negociacoesView = new NegociacoesView($("#negociacoesView"));

    this._negociacoesView.update(this._listaNegociacoes);
    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($("#mensagemView"));
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._limpaFormulario();

    this._mensagem.texto = "Negociacao adicionada com sucesso";
    this._mensagemView.update(this._mensagem);
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.toData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }

  limparNegociacoes() {
    this._listaNegociacoes.apagar();
  }
}

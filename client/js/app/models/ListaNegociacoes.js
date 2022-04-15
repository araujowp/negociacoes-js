class ListaNegociacoes {

    constructor(atualizador) {
        this._negociacoes = []
        this._atualizador = atualizador;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._atualizador(this);
        // Reflect.apply(this._atualizador, this._contexto,[this]);
    }
    
    get negociacoes() {
    
        return [].concat(this._negociacoes);
    }

    apagar(){
        this._negociacoes = [];
        this._atualizador(this);
        // Reflect.apply(this._atualizador, this._contexto, [this]);
    }
}
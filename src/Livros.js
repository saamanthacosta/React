import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import Erros from './componentes/Erros'
import Input from './componentes/input';

class FormularioLivro extends Component {

    constructor(props) {
        super(props);
        this.state = { titulo: '', preco: '', autorId: '' };
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
        this.livroSubmit = this.livroSubmit.bind(this);
    }

    setTitulo(evento) {
        this.setState({ titulo: evento.target.value });
    }

    setPreco(evento) {
        this.setState({ preco: evento.target.value });
    }

    setAutorId(evento) {
        this.setState({ autorId: evento.target.value });
    }


    livroSubmit(evento) {
        evento.preventDefault();
        var titulo = this.state.titulo.trim();
        var preco = this.state.preco.trim();
        var autorId = this.state.autorId;
    
        $.ajax({
            url: 'http://localhost:8080/api/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify({ titulo: titulo, preco: preco, autorId: autorId }),
            success: novaListagem => {
                PubSub.publish('atualiza-lista-livros', novaListagem);
                this.setState({ titulo: '', preco: '', autorId: '' });
            },
            error: resposta => resposta.status === 400 ? new Erros().publicaErros(resposta.responseJSON) : console.log('another'),
            beforeSend: () => PubSub.publish("limpa-erros", {})
        });

        this.setState({titulo: '', preco: '', autorId: ''});
    }

    render() {
        var autores = this.props.autores.map(function(autor){
            return <option key={autor.id} value={autor.id}>{autor.nome}</option>;
          });
        return (
            <div>
                <form className="form-group" onSubmit={this.livroSubmit}>
                    <Input id="titulo" name="titulo" label="Titulo: " type="text" value={this.state.titulo} placeholder="Titulo do livro" onChange={this.setTitulo} />
                    <Input id="preco" name="preco" label="Preço: " type="decimal" value={this.state.preco} placeholder="Preço do livro" onChange={this.setPreco} />
                    <select className="custom-select" value={this.state.autorId} name="autorId" onChange={this.setAutorId}>
                        <option>Selecione</option>
                        { autores }
                    </select>
                    <button type="submit" className="btn btn-lg btn-dark">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default class LivroBox extends Component {

    constructor(props) {
        super(props);
        this.state = { autores: [] };
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: autores => this.setState = ({autores: autores})
        });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro autores={this.state.autores}/>
                </div>
            </div>
        );
    }
}
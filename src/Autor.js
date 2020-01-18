import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import Input from './componentes/input';
import Erros from './componentes/Erros';

class FormularioAutor extends Component {

    constructor(props) {
        super(props)
        this.state = { lista: [], nome: '', email: '', senha: '' };
    }

    enviaForm = (evento) => {
        evento.preventDefault();
        $.ajax({
            url: "http://localhost:8080/api/autores",
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: novaListagem => {
                PubSub.publish('atualiza-lista-autores', novaListagem);
                this.setState({ nome: '', email: '', senha: '' })
            },
            error: resposta => resposta.status === 400 ? new Erros().publicaErros(resposta.responseJSON) : console.log('another'),
            beforeSend: () => PubSub.publish("limpa-erros", {})
        })
    }

    setDados = (nomeInput, evento) => {
        this.setState({ [nomeInput]: evento.target.value });
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.enviaForm} method="post">
                    <Input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setDados.bind(this, 'nome')} label="Nome" placeholder="Insira o nome"/>
                    <Input id="email" type="email" name="email" value={this.state.email} onChange={this.setDados.bind(this, 'email')} label="Email" placeholder="Insira o e-mail" />
                    <Input id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setDados.bind(this, 'senha')} label="Senha" placeholder="Insira a senha" />
                    <button type="submit" class="btn btn-lg btn-dark">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default class AutorBox extends Component {
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>
                <div className="content" id="content">
                    <FormularioAutor />
                </div>
            </div>
        );
    }
}
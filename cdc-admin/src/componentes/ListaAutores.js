import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class ListaAutores extends Component {

    constructor() {
        super()
        this.state = { lista: [] };
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: resposta => this.setState({ lista: resposta }).bind(this)
        });
        // usamos o PubSub para que ele realize um subscribe na lista ao inserirmos um novo cadastro
        PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => this.setState({ lista: novaLista }))
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Lista de Autores</h1>
                </div>
                <div className="content">
                    <table className="table1">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.lista.map(autor => {
                                    return (
                                        <tr key={autor.id}>
                                            <td>{autor.nome}</td>
                                            <td>{autor.email}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
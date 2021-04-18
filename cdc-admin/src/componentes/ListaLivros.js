import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class ListaLivros extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/livros",
            dataType: 'json',
            success: data => this.setState({ lista: data })
        });

        PubSub.subscribe('atualiza-lista-livros', (topico, lista) => this.setState({lista:lista}))

    }


    render() {
        var livros = this.state.lista.map(livro => {
            <tr key={livro.titulo}>
                <td>{livro.titulo}</td>
                <td>{livro.autor.nome}</td>
                <td>{livro.preco}</td>
            </tr>
        });
        return (
            <div>
                <div className="header">
                    <h1>Lista de Livros</h1>
                </div>
                <div className="content" id="content">
                    <table className="table1">
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Autor</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
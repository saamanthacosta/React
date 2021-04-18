import React, { Component } from 'react';
import PubSub from 'pubsub-js';


export default class Input extends Component {

    constructor() {
        super();
        this.state = { msgErro: '' };
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
               { /* <input className="form-control" 
                    id={this.props.id} 
                    type={this.props.type} 
                    name={this.props.name} 
                    value={this.props.value} 
                    placeholder={this.props.placeholder} 
                    onChange={this.props.onChange} /> */ }
                <input className="form-control" {... this.props} />
                <span className="error">{this.state.msgErro}</span>
            </div>
        );
    }

    componentWillMount() {
        PubSub.subscribe("erro-validacao", (topico, erro) => {
            if (erro.field === this.props.name) {
                this.setState({ msgErro: erro.defaultMessage })
            }
        });
        PubSub.subscribe("limpa-erros", topico => this.setState({ msgErro: '' }));
    }
}
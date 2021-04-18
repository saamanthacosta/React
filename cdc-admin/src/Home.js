import React from 'react';
import { Link } from 'react-router';

// java -jar -Dspring.datasource.password=root -Dspring.datasource.username=root cdcreact-1.0.0-SNAPSHOT.jar

export default function Home(props) {
  return (
    <div id="layout">
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <li className="navbar-brand text-white">Autores e seus Livros</li>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="cadastro/autor">Cadastrar Autor</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="autores">Lista de Autores</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="cadastro/livro">Cadastrar Livro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="livros">Lista de Livros</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        {this.props.children}
      </div>
    </div>
  );
}

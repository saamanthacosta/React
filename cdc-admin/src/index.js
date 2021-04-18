import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './Home';
import HeaderHome from './componentes/HeaderHome';
import AutorBox from './Autor';
import LivroBox from './Livros';
import ListaAutores from './componentes/ListaAutores';
import ListaLivros from './componentes/ListaLivros';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={HeaderHome} />
      <Route path="/cadastro/autor" component={AutorBox}/>
      <Route path="/autores" component={ListaAutores}/>
      <Route path="/cadastro/livro" component={LivroBox}/>
      <Route path="/livros" component={ListaLivros}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Comum from './pages';
import Produtos from './pages/Produtos';
import DetalhesPedidoCliente from './pages/Pedidos/pedidosCliente/detalhes';
import PedidosClientes from './pages/Pedidos/pedidosCliente';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Comum } />
      <Route path="/login" component={ Login } />
      <Route path="/customer/products" component={ Produtos } />
      <Route path="/register" component={ Cadastro } />
      <Route path="/customer/orders" component={ PedidosClientes } />
      <Route path="/customer/orders/:id" component={ DetalhesPedidoCliente } />
    </Switch>
  );
}

export default App;

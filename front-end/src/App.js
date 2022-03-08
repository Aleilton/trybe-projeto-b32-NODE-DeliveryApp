import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Comum from './pages';
import Login from './pages/Login';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Comum } />
      <Route path="/login" component={ Login } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/orders/:id" component={ OrderDetails } />
      <Route path="/admin/manage" component={ Admin } />
      <Route path="/customer/orders" component={ Orders } />
    </Switch>
  );
}

export default App;

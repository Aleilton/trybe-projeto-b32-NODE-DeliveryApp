import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { fetchAllSales } from '../../api';
import Nav from '../../components/Nav';

const dateFormat = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();
  return (
    `${day}/${month}/${year}`
  );
};

const PedidosClientes = () => {
  const [infoUsuario, setInfoUsuario] = useState(
    (localStorage.user) ? JSON.parse(localStorage.user) : null,
  );
  const history = useHistory();
  const [vendas, setVendas] = useState([]);

  const PREFIX = (infoUsuario.role === 'customer')
    ? 'customer_orders' : 'seller_orders';

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAllSales(infoUsuario.token);
      setVendas(data);
    };
    fetchData();
  }, [infoUsuario.token]);

  const verDetalhes = (id) => {
    const redirect = infoUsuario.role === 'customer'
      ? history.push(`/customer/orders/${id}`)
      : history.push(`/seller/orders/${id}`);

    return redirect;
  };

  const classStatus = (status) => {
    switch (status) {
    case 'Pendente':
      return 'pending';
    case 'Preparando':
      return 'preparing';
    case 'Em Trânsito':
      return 'transit';
    default:
      return 'delivered';
    }
  };

  function renderCardContainerCustomer(venda) {
    return (
      <div className="order-card-container">
        <h5
          data-testid={ `${PREFIX}__element-delivery-status-${venda.id}` }
          className={ classStatus(venda.status) }
        >
          {venda.status}
        </h5>
        <div>
          <p
            data-testid={ `${PREFIX}__element-order-date-${venda.id}` }
          >
            { dateFormat(venda.saleDate) }
          </p>
          <p data-testid={ `${PREFIX}__element-card-price-${venda.id}` }>
            { venda.totalPrice.replace('.', ',') }
          </p>
        </div>
      </div>
    );
  }

  function renderCardContainerSeller(venda) {
    return (
      <div className="order-card-body">
        <div className="order-card-container">
          <h5
            data-testid={ `${PREFIX}__element-delivery-status-${venda.id}` }
            className={ classStatus(venda.status) }
          >
            {venda.status}
          </h5>
          <div>
            <p
              data-testid={ `${PREFIX}__element-order-date-${venda.id}` }
            >
              { dateFormat(venda.saleDate) }
            </p>
            <p data-testid={ `${PREFIX}__element-card-price-${venda.id}` }>
              { venda.totalPrice.replace('.', ',') }
            </p>
          </div>
        </div>
        <p
          className="order-card-address"
          data-testid={ `${PREFIX}__element-card-address-${venda.id}` }
        >
          { `${venda.deliveryAddress} ${venda.deliveryNumber}` }
        </p>
      </div>
    );
  }

  function renderMain() {
    return (
      <>
        <Nav
          totalCart={ 10 }
          userLogged={ infoUsuario }
          setInfoUsuario={ setInfoUsuario }
          renderCart={ false }
        />
        <ul className="products-cards checkout">
          {vendas.map((venda) => (
            <li key={ venda.id } className="order-card">
              <button onClick={ () => verDetalhes(venda.id) } type="button">
                <p className="order-card-id">
                  { 'Pedido ' }
                  <span data-testid={ `${PREFIX}__element-order-id-${venda.id}` }>
                    {venda.id}
                  </span>
                </p>
                { infoUsuario.role === 'customer'
                  ? renderCardContainerCustomer(venda)
                  : renderCardContainerSeller(venda) }
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <main className="products-main">
      { vendas
        ? renderMain()
        : <p className="products-cards loading">Carregando...</p>}
    </main>
  );
};

export default PedidosClientes;

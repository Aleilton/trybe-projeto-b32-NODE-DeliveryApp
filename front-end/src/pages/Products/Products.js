import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../api/index';
import { setProducts } from '../../app/slices/shoppingCart';
import Nav from '../../components/Nav';
import '../index.css';
import ProductCard from '../../components/ProductCard';

const Products = () => {
  const dispatch = useDispatch();
  const produsctsState = useSelector((state) => state.shoppingCart.products);
  const history = useHistory();
  const [infoUsuario, setInfoUsuario] = useState(
    (localStorage.user) ? JSON.parse(localStorage.user) : null,
  );
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    setTotalCart(
      produsctsState
        .reduce((acc, currProd) => (currProd.price * currProd.quantity) + acc, 0),
    );
  }, [produsctsState]);

  useEffect(() => {
    if (!infoUsuario) {
      history.push('/login');
    }
  }, [history, infoUsuario]);

  const fetchData = async () => {
    const { data } = await fetchAllProducts(infoUsuario.token);
    const products = data.map((prod) => {
      prod.quantity = 0;
      return prod;
    });
    dispatch(setProducts(products));
  };

  useEffect(() => {
    if (infoUsuario) {
      fetchData();
    }
  }, []);

  function renderMain() {
    return (
      <>
        <Nav
          totalCart={ totalCart }
          userLogged={ infoUsuario }
          setInfoUsuario={ setInfoUsuario }
        />
        <ul className="products-cards">
          {produsctsState.map((product, index) => (
            <ProductCard
              product={ product }
              index={ index }
              key={ index }
            />
          ))}
        </ul>
      </>
    );
  }

  return (
    <main className="products-main">
      {produsctsState.length !== 0
        ? renderMain()
        : <p className="products-cards loading">Carregando...</p>}
    </main>
  );
};

export default Products;
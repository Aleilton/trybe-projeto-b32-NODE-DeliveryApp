import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUsers as getUserApi, deleteUser } from '../../api/index';
import Nav from '../../components/Nav';
import ItemUser from '../../components/ItemUser';

import AdminRegisterUser from '../../components/AdminRegisterUser';

const Admin = () => {
  const history = useHistory();
  const [infoUsuario, setInfoUsuario] = useState(
    (localStorage.user) ? JSON.parse(localStorage.user) : null,
  );
  const [users, setUsers] = useState();
  const [isReflash, setIsReflash] = useState(false);
  const PREFIX = 'admin_manage';

  useEffect(() => {
    if (!infoUsuario) {
      history.push('/login');
    }
  }, [history, infoUsuario]);

  const getUsers = async () => {
    const { data } = await getUserApi(infoUsuario.token);
    setUsers(data);
  };

  useEffect(() => {
    if (isReflash) {
      getUsers();
      setIsReflash(false);
    }
  }, [isReflash]);

  useEffect(() => {
    if (infoUsuario) {
      getUsers();
    }
  }, [infoUsuario]);

  const removeUser = async (id) => {
    const DELETED_STATUS = 200;
    const result = await deleteUser(id, infoUsuario.token);
    const { status } = result;
    if (status === DELETED_STATUS) getUsers();
  };

  function renderUsers() {
    return (
      <>
        <div className="checkout-title-body">
          <h3 className="checkout-title">Lista de usuários</h3>
        </div>
        <div className="checkout-body">
          <li className="checkout-item header">
            <div className="checkout-item-column column-simple text-center">Item</div>
            <div className="checkout-item-column column text-center">Nome</div>
            <div className="checkout-item-column text-center admin-email">
              Email
            </div>
            <div className="checkout-item-column text-center admin-role">
              Tipo
            </div>
            <div className="checkout-item-column column-double text-center">
              Excluir
            </div>
          </li>
          { users.map((user, index) => (<ItemUser
            key={ index }
            user={ user }
            index={ index }
            removeUser={ removeUser }
            prefix={ PREFIX }
          />)) }
        </div>
      </>
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
          <div className="checkout-title-body">
            <h3 className="checkout-title">Cadastrar novo usuário</h3>
          </div>
          <div className="checkout-body">
            <AdminRegisterUser setIsReflash={ setIsReflash } />
          </div>
          { users && renderUsers() }
        </ul>
      </>
    );
  }

  return (
    <main className="products-main">
      { renderMain() }
    </main>
  );
};

export default Admin;

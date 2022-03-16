import React, { useState } from 'react';
import PropTypes from 'prop-types';

import validateEmail from '../utils/validateEmail';
import { adminCreateUser } from '../api';

const AdminRegisterUser = ({ setIsReflash }) => {
  const infoAdmin = (localStorage.user) ? JSON.parse(localStorage.user) : null;
  const [dataUser, setDataUser] = useState(
    { name: '', email: '', password: '', role: 'seller' },
  );
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isUserAlreadyCreated, setIsUserAlreadyCreated] = useState(false);

  const handleChange = ({ target }) => {
    const SIX = 6;
    const TWELVE = 12;
    const targetIsEmail = target.name === 'email';
    const emailIsValid = validateEmail(target.value);
    const targetIsPassword = target.name === 'password';
    const passwordIsValid = target.value.length >= SIX;
    const targetIsName = target.name === 'name';
    const nameIsValid = target.value.length >= TWELVE;

    setDataUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));

    if (targetIsEmail) {
      setIsEmailValid(emailIsValid);
    }

    if (targetIsPassword) {
      setIsPasswordValid(passwordIsValid);
    }

    if (targetIsName) {
      setIsNameValid(nameIsValid);
    }
  };

  const createUser = async () => {
    const CONFLICT_STATUS = 409;
    const CREATED_STATUS = 201;

    const user = await adminCreateUser(dataUser, infoAdmin.token);
    const { data, status } = user;

    if (status === CONFLICT_STATUS) {
      setIsUserAlreadyCreated(true);
    }

    if (status === CREATED_STATUS) {
      console.log('USUÁRIO CRIADO\n', data);
    }
    setIsReflash(true);
  };

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome
          <input
            onChange={ handleChange }
            type="text"
            name="name"
            id="name"
            placeholder="Nome (mín. 12 caracteres)"
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            onChange={ handleChange }
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            onChange={ handleChange }
            type="password"
            name="password"
            id="password"
            placeholder="Senha (mín. 6 caracteres)"
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="role">
          Tipo
          <select
            name="role"
            id="role"
            data-testid="admin_manage__select-role"
            onChange={ handleChange }
          >
            <option value="seller" selected>Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
      </form>
      <div
        className={ `${isUserAlreadyCreated ? 'error-message' : 'hided-error-message'}` }
        data-testid="admin_manage__element-invalid-register"
      >
        <p>Registro inválido. Cheque suas mensagens.</p>
      </div>
      <li className="checkout-item item-row submit">
        <div className="checkout-item-column">
          <button
            type="button"
            onClick={ () => createUser() }
            disabled={ !isNameValid || !isEmailValid || !isPasswordValid }
            data-testid="admin_manage__button-register"
          >
            Cadastrar
          </button>
        </div>
      </li>
    </div>
  );
};

AdminRegisterUser.propTypes = {
  setIsReflash: PropTypes.func.isRequired,
};

export default AdminRegisterUser;

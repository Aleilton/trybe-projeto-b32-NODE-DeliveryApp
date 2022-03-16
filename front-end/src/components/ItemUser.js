import React from 'react';
import PropTypes from 'prop-types';

const ItemUser = ({ user, index, removeUser, prefix }) => (
  <li key={ user.id } className="checkout-item item-row">
    <div className="checkout-item-column column-simple">
      <p
        data-testid={
          `${prefix}__element-user-table-item-number-${index}`
        }
      >
        { index + 1 }
      </p>
    </div>
    <div className="checkout-item-column column">
      <p data-testid={ `${prefix}__element-user-table-name-${index}` }>
        { user.name }
      </p>
    </div>
    <div className="checkout-item-column text-center admin-email">
      <p data-testid={ `${prefix}__element-user-table-email-${index}` }>
        { user.email }
      </p>
    </div>
    <div className="checkout-item-column text-center admin-role">
      <p data-testid={ `${prefix}__element-user-table-role-${index}` }>
        { user.role }
      </p>
    </div>
    <div className="checkout-item-column column-double adm-delete">
      <button
        onClick={ () => removeUser(user.id) }
        type="button"
        className="checkout-item-column-btn-remove"
        data-testid={ `${prefix}__element-user-table-remove-${index}` }
      >
        Exluir
      </button>
    </div>
  </li>
);

ItemUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeUser: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default ItemUser;

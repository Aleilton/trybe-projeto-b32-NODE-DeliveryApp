const UserServices = require('../services/user');

const create = async (req, res, next) => {
  try {
    const { body, loggedUser = null } = req;
    const { name, email, password, role = 'customer' } = body;
    const result = await UserServices.create({ name, email, password, role, loggedUser });
    return res.status(201).json(result);
  } catch (error) {
    console.log(`ERROR: POST createUser => ${error.message}`);
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const result = await UserServices.getAll();
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: GET getAllUsers => ${error.message}`);
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { params, loggedUser } = req;
    const { id } = params;
    const result = await UserServices.getById(id, loggedUser);
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: GET getUserById => ${error.message}`);
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
const { User } = require('../models/index');


exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).send(users);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return res.status(500);
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body, { attributes: { include: ['password'] } });
    return res.status(201).send(user);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return res.status(500);
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { id } = res.body;
    const user = await User.update({ id }, { ...req.body });
    return res.status(201).send(user);
  } catch (error) {
    return console.error(error);
  }
};

exports.updateUserDetailsOld = async (req, res, id, lastSeenPriority, lastUpdate) => {
  try {
    if (!lastSeenPriority) throw Error(`Invalid lastSeenPriority ${lastSeenPriority}. Card: ${id}. Last update: ${lastUpdate}`);
    return await user.updateDetails(id, lastSeenPriority, lastUpdate);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

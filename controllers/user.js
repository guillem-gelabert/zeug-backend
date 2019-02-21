const user = require('../models/user');

exports.getAll = async (req, res) => {
  try {
    const users = await user.getAll();
    res.status(200).send(users);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    res.status = 500;
  }
};

exports.getUserDetails = async (req, res, userId) => {
  try {
    return await user.getOne(userId);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

exports.updateUserDetails = async (req, res, id, lastSeenPriority, lastUpdate) => {
  try {
    if (!lastSeenPriority) throw Error(`Invalid lastSeenPriority ${lastSeenPriority}. Card: ${id}. Last update: ${lastUpdate}`);
    return await user.updateDetails(id, lastSeenPriority, lastUpdate);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

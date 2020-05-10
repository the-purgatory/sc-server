const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, callback));
};

const constructRestResponse = (code, status, data) => {
  if (status === 'SUCCESS') {
    return {
      code,
      status,
      data
    };
  }
  return {
    code,
    status,
    error: data
  };
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect('/auth');
};

const parseUserDataToSend = (user_raw, forSelf = false) => {
  const userData = {
    _id: user_raw._id,
    username: user_raw.username,
    email: user_raw.email,
    phone: user_raw.phone,
    description: user_raw.description,
    profile_pic: user_raw.profile_pic,
    is_active: user_raw.is_active,
    created_at: user_raw.created_at,
    last_seen: user_raw.last_seen,
    meta: user_raw.meta
  };

  if (forSelf) {
    userData.pinned_users = user_raw.pinned_users;
    userData.blocked_users = user_raw.blocked_users;
  } else {
    userData.last_seen = user_raw.last_seen;
  }

  return userData;
};

module.exports = {
  hashPassword,
  constructRestResponse,
  isAuthenticated,
  parseUserDataToSend
};

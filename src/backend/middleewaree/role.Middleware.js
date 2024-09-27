const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const User = require("../model/User");

module.exports = function (roles) {
  return async function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.cookies.access_token;

      if (!token) {
        return res
          .status(403)
          .json({ messege: "Пользователь не авторизирован" });
      }
      const user = jwt.verify(token, secret);
      console.log(user);
      const userFromBD = await User.findOne({ _id: user.id });
      let hasRole = false;
      userFromBD.roles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ messege: "Пользователь не авторизирован" });
    }
  };
};
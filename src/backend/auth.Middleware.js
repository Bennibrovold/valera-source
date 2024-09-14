const jwt = require("jsonwebtoken");
const { secret } = require("../config");
module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(403).json({ messege: "Пользователь не авторизирован" });
    }
    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ messege: "Пользователь не авторизирован" });
  }
};

const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret);
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }

      const { username, Email, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }
      const candidateEmail = await User.findOne({ Email });
      if (candidateEmail) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким Email уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        Email,
        password: hashPassword,
        roles: userRole ? [userRole.value] : ["USER"],
      });
      await user.save();
      const token = generateAccessToken(user._id, user.roles);

      const obj = {
        username: user?.username,
        email: user.Email,
        role: user.roles[0],
      };

      return res.cookie("access_token", token).json(obj);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      console.log(password, user.password);
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.cookie("access_token", token).json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "login error" });
    }
  }

  async logout(req, res) {
    return res.clearCookie("access_token").json({ success: true });
  }

  async getMe(req, res) {
    const r = jwt.verify(req.cookies.access_token, secret);
    const user = await User.findOne({ _id: r.id });

    const obj = {
      username: user?.username,
      email: user.Email,
      role: user.roles[0],
    };

    return res.json(obj);
  }

  async getUsers(req, res) {
    const users = await User.find();
    res.json(users);
  }
}

module.exports = new authController();

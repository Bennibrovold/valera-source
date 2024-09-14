const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddlewere = require("./middleewaree/auth.Middleware");
const roleMiddlewere = require("./middleewaree/role.Middleware");

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым")
      .trim()
      .notEmpty(),
    check("password", "Пароль должен быть больше 8 и меньше 14 символов")
      .trim()
      .notEmpty()
      .isLength({ min: 8, max: 14 }),
    check("Email", "Email не должен быть пустым").trim().isEmail().notEmpty(),
  ],
  controller.registration
);
router.post(
  "/login",
  [
    check("username", "Имя пользователя не может быть пустым")
      .trim()
      .notEmpty(),
    check("password", "Пароль должен быть больше 8 и меньше 14 символов")
      .trim()
      .isLength({ min: 8, max: 14 }),
    check("Email", "Email не должен быть пустым").trim().isEmail().notEmpty(),
  ],
  controller.login
);
router.get("/get_me", authMiddlewere, controller.getMe);
router.get("/logout", authMiddlewere, controller.logout);
router.get("/users", roleMiddlewere(["ADMIN"]), controller.getUsers);

module.exports = router;

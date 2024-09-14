const Router = require("express");
const controller = require("./userController");
const router = new Router();

router.post(
  "/change_role",
  controller.changeRole
);

module.exports = router;

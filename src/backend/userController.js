const User = require("./models/User");
const Role = require("./models/Role");

class userController {
  async changeRole(req, res) {
    try {
      const { username } = req.body

      const user = await User.findOne({ username });
      console.log(user)

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      console.log(req.body)
      console.log('user', user)
    } catch(e) {
        console.log(e)
    }
  }
}

module.exports = new userController();

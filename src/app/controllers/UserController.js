const { User } = require('../models')

class UserController {
  create (req, res) {
    res.render('auth/signup')
  }

  store (req, res) {
    if (req.file) {
      const { filename } = req.file
      User.create({ ...req.body, avatar: filename })

      return res.redirect('/signup')
    }

    User.create({ ...req.body, avatar: 'none' })

    return res.redirect('/')
  }
}

module.exports = new UserController()

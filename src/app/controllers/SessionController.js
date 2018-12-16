const { User } = require('../models')

class SessionController {
  create (req, res) {
    res.render('auth/signin')
  }

  async store (req, res) {
    const { username, password } = req.body

    const user = await User.findOne({ where: { username } })

    if (!user) {
      const error = 'Usuário não encontrado, tente novamente.'
      return res.render('auth/signin', { error })
    }

    if (!(await user.checkPassword(password))) {
      const error = 'Senha incorreta, tente novamente.'
      return res.render('auth/signin', { error })
    }

    req.session.user = user

    if (user.admin) {
      return res.redirect('/app/admin/dashboard')
    }

    return res.redirect('/app/seller/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()

const { Sale } = require('../models')

class SalesController {
  create (req, res) {
    if (req.file) {
      const { filename } = req.file

      Sale.create({
        ...req.body,
        image: filename,
        admin_id: req.session.user.id
      })

      return res.redirect('/app/admin/dashboard')
    }

    Sale.create({
      ...req.body,
      image: 'logo.svg',
      admin_id: req.session.user.id
    })

    return res.redirect('/app/admin/dashboard')
  }
}

module.exports = new SalesController()

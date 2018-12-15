const { Sale } = require('../models')

class SalesController {
  create (req, res) {
    const { filename } = req.file

    Sale.create({ ...req.body, image: filename, admin_id: req.session.user.id })

    res.redirect('/app/admin/dashboard')
  }
}

module.exports = new SalesController()

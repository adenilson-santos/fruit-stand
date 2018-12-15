const { Sale } = require('../models')

class SellerController {
  async index (req, res) {
    const { fruit } = req.params

    const sale = await Sale.findByPk(fruit)

    sale.sold_by = req.session.user.username
    sale.sold = true

    sale.save()

    res.redirect('/app/seller/dashboard')
  }
}

module.exports = new SellerController()

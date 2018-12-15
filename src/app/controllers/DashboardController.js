const { Sale } = require('../models')

class DashboardController {
  async sellerCreate (req, res) {
    const sales = await Sale.findAll()

    res.render('dashboard/seller', { sales })
  }

  adminCreate (req, res) {
    console.log(req.session.user)
    res.render('dashboard/admin')
  }
}

module.exports = new DashboardController()

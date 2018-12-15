const { Sale, Sold } = require('../models')

class DashboardController {
  async sellerCreate (req, res) {
    const sales = await Sale.findAll()

    res.render('dashboard/seller', { sales })
  }

  adminCreate (req, res) {
    console.log(req.session.user)
    res.render('dashboard/admin')
  }

  async sellerReport (req, res) {
    const solds = await Sold.findAll()

    res.render('dashboard/report', { solds })
  }
}

module.exports = new DashboardController()

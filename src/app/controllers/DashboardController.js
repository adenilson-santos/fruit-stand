const { Sale, Sold } = require('../models')
const { Op } = require('sequelize')

class DashboardController {
  async sellerCreate (req, res) {
    // const sales = await Sale.findAll({
    //   order: [['created_at', 'DESC']]
    // })

    const filters = {}

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }
      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.amount_min || req.query.amount_max) {
      filters.amount = {}

      if (req.query.amount_min) {
        filters.amount.$gte = req.query.amount_min
      }
      if (req.query.amount_max) {
        filters.amount.$lte = req.query.amount_max
      }
    }

    if (req.query.fresh) {
      filters.fresh = { [Op.eq]: req.query.fresh }
    }

    if (req.query.classification) {
      filters.classification = { [Op.eq]: req.query.classification }
    }

    if (req.query.title) {
      filters.fruit = { [Op.like]: `%${req.query.title}%` }
    }

    const page = req.query.page

    const options = {
      page: page || 1, // Default 1
      paginate: 10,
      order: [['amount', 'DESC']],
      where: filters
    }

    // where: { price: { [Op.gte]: 3 } }
    // fruit: { [Op.like]: `%Laranja%` }

    const { docs, pages, total } = await Sale.paginate(options)

    res.render('dashboard/seller', { docs, pages, total })
  }

  adminCreate (req, res) {
    console.log(req.session.user)
    res.render('dashboard/admin')
  }

  async sellerReport (req, res) {
    const solds = await Sold.findAll({
      order: [['created_at', 'DESC']]
    })

    res.render('dashboard/report', { solds })
  }
}

module.exports = new DashboardController()

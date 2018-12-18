const { Sale } = require('../models')

class SalesController {
  async create (req, res) {
    let { fruit, classification, fresh, price, amount } = req.body

    if (!fresh) {
      fresh = false
    }

    const sale = await Sale.findOne({
      where: {
        fruit,
        classification,
        fresh,
        price
      }
    })

    if (sale) {
      console.log('entrou', sale.fruit)
      const newAmount = parseInt(amount) + parseInt(sale.amount)
      await Sale.update(
        { amount: newAmount },
        { where: { fruit, classification, fresh, price } }
      )

      return res.redirect('/app/admin/dashboard')
    }

    if (req.file) {
      const { filename } = req.file

      await Sale.create({
        ...req.body,
        image: filename,
        admin_id: req.session.user.id
      })

      return res.redirect('/app/admin/dashboard')
    }

    await Sale.create({
      ...req.body,
      image: 'logo.svg',
      admin_id: req.session.user.id
    })

    return res.redirect('/app/admin/dashboard')
  }
}

module.exports = new SalesController()

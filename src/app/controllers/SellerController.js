const { Sale, Sold } = require('../models')

class SellerController {
  async index (req, res) {
    const { fruitname } = req.params

    const sale = await Sale.findByPk(fruitname)

    const { fruit, image, classification, fresh, price } = sale
    const { amount, discount } = req.body

    if (amount > sale.amount) {
      const alert =
        'Você está inserindo mais que a quantidade disponível da fruta'
      const sales = await Sale.findAll()
      return res.render('dashboard/seller', { alert, sales })
    }

    const discountCalc = discount / 100

    const newPriceAmount = price * amount

    const newPrice = newPriceAmount * discountCalc

    const profit = price - newPrice

    sale.amount = sale.amount - amount

    sale.save()

    Sold.create({
      fruit,
      image,
      classification,
      fresh,
      amount,
      profit,
      sold_by: req.session.user.username
    })

    if (sale.amount <= 0) {
      await Sale.destroy({
        where: {
          id: sale.id
        }
      })
    }

    res.redirect('/app/seller/dashboard')
  }
}

module.exports = new SellerController()

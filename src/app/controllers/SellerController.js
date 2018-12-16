const { Sale, Sold } = require('../models')

class SellerController {
  async index (req, res) {
    const { fruitname } = req.params

    const sale = await Sale.findByPk(fruitname)

    const { fruit, image, classification, fresh, price } = sale
    const { amount, discount } = req.body

    if (amount > sale.amount || amount < 0) {
      return res.redirect('/app/seller/dashboard')
    }

    const discountCalc = discount / 100
    const newPriceAmount = price * amount
    const newPrice = newPriceAmount * discountCalc
    const profit = newPriceAmount - newPrice

    sale.amount = sale.amount - amount

    sale.save()

    Sold.create({
      fruit,
      image,
      classification,
      fresh,
      amount,
      price: price.toFixed(2),
      discount,
      profit: profit.toFixed(2),
      sold_by: req.session.user.username
    })

    if (sale.amount <= 0) {
      await Sale.destroy({
        where: {
          id: sale.id
        }
      })
    }

    return res.redirect('/app/seller/dashboard')
  }
}

module.exports = new SellerController()

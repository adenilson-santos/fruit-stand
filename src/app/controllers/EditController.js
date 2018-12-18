const { Sale } = require('../models')

class EditController {
  async create (req, res) {
    if (!req.params.id) {
      return res.redirect('/app/seller/dashboard')
    }

    const sale = await Sale.findByPk(req.params.id)

    if (!sale) {
      console.log('id de sale não existe')
      return res.redirect('/app/seller/dashboard')
    }

    return res.render('dashboard/edit', { sale })
  }

  async update (req, res) {
    const { fruit, classification, fresh, price, amount } = req.body

    if (req.file) {
      await Sale.update(
        {
          ...req.body,
          image: req.file.filename
        },
        { where: { id: req.params.id } }
      )

      return res.redirect('/app/seller/dashboard')
    }

    await Sale.update(
      { fruit, classification, fresh, price, amount },
      { where: { id: req.params.id } }
    )

    return res.redirect('/app/seller/dashboard')
  }
}

module.exports = new EditController()

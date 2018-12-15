class DashboardController {
  sellerCreate (req, res) {
    console.log(req.session.user)
    res.render('dashboard/seller')
  }

  adminCreate (req, res) {
    console.log(req.session.user)
    res.render('dashboard/admin')
  }
}

module.exports = new DashboardController()

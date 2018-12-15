module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    return next()
  }

  if (req.session.user.admin) {
    return res.redirect('/app/admin/dashboard')
  }

  return res.redirect('/app/seller/dashboard')
}

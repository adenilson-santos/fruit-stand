module.exports = (req, res, next) => {
  if (req.session.user.admin) {
    return next()
  }

  return res.redirect('/app/seller/dashboard')
}

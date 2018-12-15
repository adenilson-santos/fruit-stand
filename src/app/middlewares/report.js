module.exports = (req, res, next) => {
  if (req.session && req.session.user.admin === true) {
    return res.redirect('/app/admin/dashboard')
  }
  return next()
}

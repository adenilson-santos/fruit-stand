module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.redirect('/')
  }

  return next()
}

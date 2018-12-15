const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const UserController = require('./app/controllers/UserController')
const FileController = require('./app/controllers/FileController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const SalesController = require('./app/controllers/SalesController')
const SellerController = require('./app/controllers/SellerController')

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')
const adminMiddleware = require('./app/middlewares/admin')

routes.use('/app', authMiddleware)

routes.get('/images/:avatar', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)
routes.get('/logout', SessionController.destroy)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/seller/dashboard', DashboardController.sellerCreate)
routes.get(
  '/app/admin/dashboard',
  adminMiddleware,
  DashboardController.adminCreate
)

routes.post(
  '/app/admin/dashboard/register',
  upload.single('image'),
  SalesController.create
)

routes.get('/app/seller/dashboard/sold/:fruit', SellerController.index)

module.exports = routes

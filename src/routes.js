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
const EditController = require('./app/controllers/EditController')

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')
const adminMiddleware = require('./app/middlewares/admin')
const reportMiddleware = require('./app/middlewares/report')

routes.use('/app', authMiddleware)

routes.get('/images/:avatar', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)
routes.get('/logout', SessionController.destroy)

// routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get(
  '/app/seller/dashboard/edit/:id',
  adminMiddleware,
  EditController.create
)
routes.post(
  '/app/seller/dashboard/edit/:id',
  upload.single('image'),
  EditController.update
)

routes.get('/app/seller/dashboard', DashboardController.sellerCreate)
routes.get(
  '/app/seller/dashboard/reports',
  reportMiddleware,
  DashboardController.sellerReport
)
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

routes.post('/app/seller/dashboard/sold/:fruitname', SellerController.index)

module.exports = routes

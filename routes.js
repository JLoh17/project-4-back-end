const { Router } = require('express')
const router = Router()

const { getUserByToken } = require('./controllers/_helpers')

router.use(getUserByToken)

// Auth
router.post('/api/auth/signup', require('./controllers/api/auth/signup'))
router.post('/api/auth/login', require('./controllers/api/auth/login'))
router.delete('/api/auth/logout', require('./controllers/api/auth/logout'))

// Public products
router.get('/api/products', require('./controllers/api/products'))
router.get('/api/products/:id', require('./controllers/api/products/show'))

// My orders - for payment
router.get('/api/my/orders', require('./controllers/api/my/orders'))
router.post('/api/my/orders', require('./controllers/api/my/orders/create'))
router.delete('/api/my/orders/:id', require('./controllers/api/my/orders/destroy'))
router.get('/api/my/orders/:id', require('./controllers/api/my/orders/show'))
router.put('/api/my/orders/:id/pay', require('./controllers/api/my/orders/pay'))

// Cart item - adding items to cart
router.get('/api/my/cart', require('./controllers/api/my/cart')) // myCart index
router.post('/api/my/cart', require('./controllers/api/my/cart/create')) // adding to cart
router.put('/api/my/cart/:id', require('./controllers/api/my/cart/update'))
router.delete('/api/my/cart/:id', require('./controllers/api/my/cart/destroy'))

// My Profile's Order History
router.get('/api/my/profile', require('./controllers/api/my/profile/show'))
router.put('/api/my/profile', require('./controllers/api/my/profile/update'))
router.get('/api/my/profile/balance', require('./controllers/api/my/profile/balance'))


// Admin Orders
router.get('/api/admin/orders', require('./controllers/api/admin/orders'))
router.put('/api/admin/orders/:id', require('./controllers/api/admin/orders/update'))
// router.delete('/api/admin/products/:id', require('./controllers/api/admin/products/destroy'))

// Admin Product
router.get('/api/admin/products', require('./controllers/api/admin/products'))
router.post('/api/admin/products', require('./controllers/api/admin/products/create'))
router.delete('/api/admin/products/:id', require('./controllers/api/admin/products/destroy'))

// Error Response
router.use(function (req, res) {
  res.status(404).json({ message: "Sorry! Does not exist!" })
})

module.exports = router
// make sure in main.js the routes file is linked to this file if you pull it out of the routes folder

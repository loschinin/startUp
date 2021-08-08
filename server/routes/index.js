const Router = require('express')
const router = new Router()
const personRouter = require('./personRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/person', personRouter)

module.exports = router